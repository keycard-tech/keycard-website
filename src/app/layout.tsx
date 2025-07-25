import { Analytics } from '@vercel/analytics/next'
import { clientEnv } from '~/config/env.client.mjs'
import { cx } from 'cva'
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
  metadataBase: new URL('https://keycard.tech/'),

  title: {
    default: 'Keycard',
    template: '%s — Keycard',
  },
  description:
    'Lightweight design, heavyweight security. Open-source, durable, and integrated with Status apps for secure asset management and dApp interactions. From €25.',

  alternates: {
    canonical: './',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@keycard_',
  },
})

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
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
                const injectBixGrow = () => {
                  if (window.__bixgrowInjected) return;
                  window.__bixgrowInjected = true;
                  const s = document.createElement('script');
                  s.src = '/bixgrow-headless.js';
                  s.defer = true;
                  document.head.appendChild(s);
                };

                // Create a promise that resolves when the Shopify event fires
                const eventPromise = new Promise(resolve => {
                  document.addEventListener('consentTrackingApiLoaded', resolve, { once: true });
                });

                // Create a promise that resolves after the timeout
                const timeoutPromise = new Promise(resolve => setTimeout(resolve, 6000));

                // Promise.race will proceed as soon as the FIRST promise resolves
                Promise.race([eventPromise, timeoutPromise]).then(() => {
                  const cp = window.Shopify.customerPrivacy;
                  if (!cp) return;

                  if (cp.shouldShowBanner()) {
                    document.addEventListener('visitorConsentCollected', injectBixGrow, { once: true });
                  } else if (cp.marketingAllowed() || cp.analyticsProcessingAllowed()) {
                    injectBixGrow();
                  }
                });

                const config = {
                  storefrontAccessToken: '${clientEnv.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN}',
                  checkoutRootDomain: 'getmykeycard.myshopify.com',
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

        {/* Vercel Analytics */}
        <Analytics />

        {/* Umami Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://umami.bi.status.im/script.js"
          data-website-id="a335ad8b-deef-4960-b565-3d4e21b7a8e5"
          data-domains="keycard.tech"
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
