import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: [
      'https://docs.keycard.tech/sitemap.xml',
      'https://get.keycard.tech/sitemap.xml',
    ],
    // host: 'https://docs.keycard.tech', // optional
  }
}
