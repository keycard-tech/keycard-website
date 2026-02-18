import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'demo.ghost.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'news.keycard.tech',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unavatar.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh7-rt.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'our.status.im',
        pathname: '/**',
      },
      // Allow Shopify CDN assets used in Storefront cart/product images.
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
    ],
  },
  transpilePackages: ['next-mdx-remote'],
  skipTrailingSlashRedirect: true,

  async redirects() {
    return [
      {
        source: '/images/card-dark.png',
        destination: '/assets/keycard-shell.webp',
        permanent: true,
      },
      {
        source: '/images/card-light.png',
        destination: '/assets/keycard-shell.webp',
        permanent: true,
      },
      {
        source: '/images/integrate-keycard.png',
        destination: '/assets/keycard-shell.webp',
        permanent: true,
      },
      {
        source: '/images/integration-status.png',
        destination: '/assets/keycard-shell.webp',
        permanent: true,
      },
      {
        source: '/images/security-keyvisual.png',
        destination: '/assets/keycard-shell.webp',
        permanent: true,
      },

      {
        source: '/keycard',
        destination: 'https://get.keycard.tech/pages/keycard',
        permanent: true,
      },
      {
        source: '/keycard/',
        destination: 'https://get.keycard.tech/pages/keycard',
        permanent: true,
      },
      {
        source: '/keycard-shell',
        destination: 'https://get.keycard.tech/pages/keycard-shell',
        permanent: true,
      },
      {
        source: '/keycard-shell/',
        destination: 'https://get.keycard.tech/pages/keycard-shell',
        permanent: true,
      },

      {
        source: '/keycard-hell',
        destination: 'https://get.keycard.tech/pages/keycard-shell',
        permanent: true,
      },
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/blog/tag/security1',
        destination: '/en/blog/tag/security',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|de|es|nl)/blog/tag/security1',
        destination: '/:locale/blog/tag/security',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/en/blog/:path*',
        permanent: true,
      },
      {
        source: '/developers',
        destination: '/en/developers/overview',
        permanent: true,
      },
      {
        source: '/developers/:path*.html',
        destination: '/en/developers/:path*',
        permanent: true,
      },
      {
        source: '/developers/:path*',
        destination: '/en/developers/:path*',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/en/developers/overview',
        permanent: true,
      },
      {
        source: '/docs/:path*.html',
        destination: '/en/developers/:path*',
        permanent: true,
      },
      {
        source: '/docs/:path*',
        destination: '/en/developers/:path*',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/en/about',
        permanent: true,
      },
      {
        source: '/en/developers',
        destination: '/en/developers/overview',
        permanent: true,
      },
      {
        source: '/start',
        destination: '/en/start',
        permanent: true,
      },
      {
        source: '/start/:path*',
        destination: '/en/start/:path*',
        permanent: true,
      },
      {
        source: '/help',
        destination: '/en/help/about-keycard-and-keycard-shell',
        permanent: true,
      },
      {
        source: '/help/overview',
        destination: '/en/help/about-keycard-and-keycard-shell',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|de|es|nl)/help/overview',
        destination: '/:locale/help/about-keycard-and-keycard-shell',
        permanent: true,
      },
      {
        source: '/help/connect-keycard-shell-to-a-wallet-app',
        destination: '/en/help/connect-keycard-shell-to-a-software-wallet',
        permanent: true,
      },
      {
        source:
          '/:locale(en|fr|de|es|nl)/help/connect-keycard-shell-to-a-wallet-app',
        destination: '/:locale/help/connect-keycard-shell-to-a-software-wallet',
        permanent: true,
      },
      {
        source: '/help/understand-multisig-with-keycard',
        destination: '/en/help/connect-keycard-shell-to-sparrow-wallet',
        permanent: true,
      },
      {
        source:
          '/:locale(en|fr|de|es|nl)/help/understand-multisig-with-keycard',
        destination: '/:locale/help/connect-keycard-shell-to-sparrow-wallet',
        permanent: true,
      },
      {
        source: '/help/:path*',
        destination: '/en/help/:path*',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/en/help/faq',
        permanent: true,
      },
      {
        source: '/duress_pin',
        destination: '/en/help/about-your-keycard-pin-and-duress-pin',
        permanent: true,
      },
      {
        source: '/slip39',
        destination: '/en/help/understand-the-slip-39-wallet-backup-standard',
        permanent: true,
      },
      // Article renames: remove "your" from URLs
      {
        source: '/:locale/help/replace-your-keycard-shell-battery',
        destination: '/:locale/help/replace-keycard-shell-battery',
        permanent: true,
      },
      {
        source: '/:locale/help/update-your-keycard-shell-online',
        destination: '/:locale/help/update-keycard-shell-online',
        permanent: true,
      },
      {
        source: '/:locale/help/update-your-keycard-shell-in-air-gapped-mode',
        destination: '/:locale/help/update-keycard-shell-in-air-gapped-mode',
        permanent: true,
      },
      {
        source: '/:locale/help/verify-your-keycard-shell-authenticity',
        destination: '/:locale/help/verify-keycard-shell-authenticity',
        permanent: true,
      },
      {
        source: '/:locale/help/charge-shell',
        destination: '/:locale/help/charge-keycard-shell',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(config)
