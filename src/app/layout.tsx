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
        <Script
          id="bixgrow-hook"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {

                document.addEventListener('consentTrackingApiLoaded', () => {
                  if (Shopify.customerPrivacy?.marketingAllowed()) {
                    injectBixGrow();
                  }
                  document.addEventListener(
                    'visitorConsentCollected',
                    injectBixGrow,
                    { once: true }
                  );
                });

                function injectBixGrow() {
                  if (window.__bixgrowInjected) return;
                  window.__bixgrowInjected = true;
                  const s = document.createElement('script');
                  s.src = '/bixgrow-headless.js';
                  s.defer = true;
                  document.head.appendChild(s);
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

        {/* Shopify Affiliate */}
        <Script
          id="shopify-cookie-banner"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.Shopify = { shop: 'getmykeycard.myshopify.com' };
          `,
          }}
        />

        <Script
          id="shopify-privacy-bundle"
          strategy="beforeInteractive"
          src="https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js"
        />

        <Script
          id="shopify-privacy-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.privacyBannerConfig = {
              storefrontAccessToken: '${clientEnv.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN}',
              checkoutRootDomain:    'getmykeycard.myshopify.com',
              storefrontRootDomain:  'keycard.tech',
              headlessStorefront:    true
            };

            privacyBanner.loadBanner(window.privacyBannerConfig);
            `,
          }}
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
