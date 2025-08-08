import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://keycard.tech/sitemap.xml',
    host: 'https://keycard.tech',
  }
}
