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
  transpilePackages: [
    // why: https://github.com/hashicorp/next-mdx-remote/issues/467#issuecomment-2432166413
    'next-mdx-remote',
  ],
}

export default config
