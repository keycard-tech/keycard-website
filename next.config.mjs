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

      // New redirects based on the provided table
      {
        source: '/start',
        destination: '/start/shell',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/help', // TODO: Update to the specific article once available
        permanent: true,
      },
      {
        source: '/duress_pin',
        destination: '/help', // TODO: Update to the specific article once available
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/developers',
        permanent: true,
      },
      {
        source: '/slip39',
        destination: '/help', // TODO: Update to the specific article once available
        permanent: true,
      },
    ]
  },
}

export default config
