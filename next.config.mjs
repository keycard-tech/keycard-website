/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'demo.ghost.io',
        pathname: '/**',
      },
    ],
  },
}

export default config
