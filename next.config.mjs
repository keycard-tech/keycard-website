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
    ],
  },
  transpilePackages: ['next-mdx-remote'],

  async redirects() {
    return [
      {
        source: '/images/card-dark.png',
        destination: '/assets/keycard-shell.png',
        permanent: true,
      },
      {
        source: '/images/card-light.png',
        destination: '/assets/keycard-shell.png',
        permanent: true,
      },
      {
        source: '/images/integrate-keycard.png',
        destination: '/assets/keycard-shell.png',
        permanent: true,
      },
      {
        source: '/images/integration-status.png',
        destination: '/assets/keycard-shell.png',
        permanent: true,
      },
      {
        source: '/images/security-keyvisual.png',
        destination: '/assets/keycard-shell.png',
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
        source: '/start',
        destination: '/start/shell',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/developers/overview',
        permanent: true,
      },
      {
        source: '/docs/:path*',
        destination: '/developers/:path*',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/help/faq',
        permanent: true,
      },
      {
        source: '/duress_pin',
        destination: '/help/about-your-keycard-pin-and-duress-pin',
        permanent: true,
      },
      {
        source: '/slip39',
        destination: '/help/understand-the-slip-39-wallet-backup-standard',
        permanent: true,
      },
    ]
  },
}

export default config
