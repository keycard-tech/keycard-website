import fs from 'fs/promises'
import path from 'path'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://keycard.tech'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/keycard-shell',
    '/keycard',
    '/blog',
    '/start',
    '/legal/privacy-policy',
    '/legal/terms-of-use',
  ].map(p => ({
    url: base + p,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '/' ? 1 : 0.8,
  }))

  const urls: MetadataRoute.Sitemap = [...staticRoutes]

  async function walk(dir: string, parts: string[] = []) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      if (e.isDirectory()) {
        await walk(path.join(dir, e.name), [...parts, e.name])
      } else if (/\.(md|mdx)$/i.test(e.name)) {
        const slug = [...parts, e.name.replace(/\.(md|mdx)$/i, '')].join('/')
        urls.push({
          url: `${base}/docs/${slug}`,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        })
      }
    }
  }

  try {
    await walk(path.join(process.cwd(), 'content', 'docs'))
  } catch {}

  return urls
}
