import { Analytics } from '@vercel/analytics/next'
import { clientEnv } from '~/config/env.client.mjs'
import { cx } from 'cva'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Inter, Lora } from 'next/font/google'
import Script from 'next/script'
import { Metadata } from './_metadata'
import { Providers } from './_providers'
import './globals.css'

const lora = Lora({
  variable: '--font-lora',
  weight: '400',
  subsets: ['latin'],
  preload: true,
})

const inter = Inter({
  variable: '--font-inter',
  weight: ['200', '300', '400', '500'],
  subsets: ['latin'],
  preload: true,
})

export const metadata = Metadata({
  metadataBase: new URL('https://docs.keycard.tech/'),

  title: {
    default: 'Keycard',
    template: '%s — Keycard',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@keycard_',
  },
})

type Props = {
  children: React.ReactNode
}

const GOOGLE_TAG_ID = 'G-YLHJYKZLH6'

// ISO 3166-1 codes of the EU member states, the other EEA countries
// (Iceland, Liechtenstein, Norway), the United Kingdom and Switzerland.
// prettier-ignore
const CONSENT_DENIED_REGIONS = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH',
]

const GOOGLE_TAG_INIT_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  // Outside the EEA, UK and Switzerland, visitors are measured from the start.
  gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted'
  });
  // Inside those regions everything stays denied until the visitor accepts the
  // Shopify banner. Until then the tag only sends cookieless pings.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    region: ${JSON.stringify(CONSENT_DENIED_REGIONS)},
    wait_for_update: 500
  });
  gtag('js', new Date());
  gtag('config', '${GOOGLE_TAG_ID}');

  (function () {
    var update = function (analytics, marketing) {
      gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: marketing ? 'granted' : 'denied',
        ad_user_data: marketing ? 'granted' : 'denied',
        ad_personalization: marketing ? 'granted' : 'denied'
      });
    };

    // Returning visitors: read the stored choice once the Shopify API is ready.
    var fromStoredChoice = function () {
      var cp = window.Shopify && window.Shopify.customerPrivacy;
      if (!cp || typeof cp.analyticsProcessingAllowed !== 'function') return;
      update(cp.analyticsProcessingAllowed(), cp.marketingAllowed());
    };

    document.addEventListener('consentTrackingApiLoaded', fromStoredChoice);

    // The visitor just used the banner.
    document.addEventListener('visitorConsentCollected', function (event) {
      var d = (event && event.detail) || {};
      update(!!d.analyticsAllowed, !!d.marketingAllowed);
    });

    fromStoredChoice();
  })();
`

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        {/*
          Google tag with Consent Mode v2. Granted by default, denied in the
          EEA, UK and Switzerland until the visitor decides in the Shopify
          privacy banner. That banner does not talk to Google itself, so the
          bridge below listens to its events and forwards the choice with
          gtag('consent', 'update', ...).
          This must stay above the Shopify banner scripts so no event is missed.
        */}
        <script dangerouslySetInnerHTML={{ __html: GOOGLE_TAG_INIT_SCRIPT }} />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        />

        {/* Shopify cookie banner script */}
        <Script
          id="shopify-privacy-bundle"
          strategy="beforeInteractive"
          src="https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js"
        />

        {/* Consent Manager with Fail-Safe */}
        <Script
          id="keycard-consent-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const injectTrackingScripts = () => {
                  
                  if (!window.__bixgrowInjected) {
                    window.__bixgrowInjected = true;
                    const s = document.createElement('script');
                    s.src = '/bixgrow-headless.js';
                    s.defer = true;
                    document.head.appendChild(s);
                  }

                  if (!window.twq) {
                    !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                    twq('config', 'op297');
                  }
                };

                const eventPromise = new Promise(resolve => {
                  document.addEventListener('consentTrackingApiLoaded', resolve, { once: true });
                });

                const timeoutPromise = new Promise(resolve => setTimeout(resolve, 6000));

                Promise.race([eventPromise, timeoutPromise]).then(() => {
                  const cp = window.Shopify.customerPrivacy;
                  if (!cp) return;

                  if (cp.shouldShowBanner()) {
                    document.addEventListener('visitorConsentCollected', injectTrackingScripts, { once: true });
                  } else if (cp.marketingAllowed() || cp.analyticsProcessingAllowed()) {
                    injectTrackingScripts();
                  }
                });

                const config = {
                  storefrontAccessToken: '${clientEnv.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN}',
                  checkoutRootDomain: 'keycard.tech',
                  storefrontRootDomain:  'keycard.tech',
                  headlessStorefront: true,
                };

                if (window.privacyBanner) {
                  window.privacyBanner.loadBanner(config);
                }
              })();
            `,
          }}
        />
      </head>

      <body
        className={cx(
          lora.variable,
          inter.variable,
          'bg-dark-100 font-inter text-white-100 antialiased',
          'selection:bg-orange/[0.8] selection:text-white-100',
        )}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <div className="flex min-h-screen w-full justify-center overflow-clip">
              <div className="flex min-h-screen w-full flex-col p-2 pt-0">
                {children}
              </div>
            </div>
            <script
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: `(${platformScript.toString()})()`,
              }}
            />
          </Providers>
        </NextIntlClientProvider>

        {/* Vercel Analytics */}
        <Analytics />

        {/* Umami Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://umami.bi.status.im/script.js"
          data-website-id="a335ad8b-deef-4960-b565-3d4e21b7a8e5"
          data-domains="keycard.tech,docs.keycard.tech"
        />
      </body>
    </html>
  )
}

// inspired by the implementation of next-themes
// https://github.com/pacocoursey/next-themes/blob/main/next-themes/src/index.tsx
const platformScript = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(userAgent)) {
    document.body.setAttribute('data-platform', 'ios')
  } else if (userAgent.includes('mac')) {
    document.body.setAttribute('data-platform', 'macos')
  } else if (userAgent.includes('win')) {
    document.body.setAttribute('data-platform', 'windows')
  } else if (userAgent.includes('android')) {
    document.body.setAttribute('data-platform', 'android')
  } else if (userAgent.includes('linux')) {
    document.body.setAttribute('data-platform', 'linux')
  } else {
    document.body.setAttribute('data-platform', 'unknown')
  }
}
