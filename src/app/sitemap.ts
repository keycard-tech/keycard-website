import fs from 'fs/promises'
import path from 'path'
import { getAllPostsForSitemap } from '~/app/_lib/ghost'
import type { MetadataRoute } from 'next'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://keycard.tech'
  const now = new Date()

  // 1) Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/docs',
    '/blog',
    '/start',
    '/about',
    '/contact',
    '/legal/privacy-policy',
    '/legal/terms-of-use',
    '/help',
  ].map(p => ({
    url: base + p,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '/' ? 1 : 0.8,
  }))

  // 2) Docs from filesystem
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

  // blog posts
  const posts = await getAllPostsForSitemap()
  const blogEntries: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updated_at || p.published_at || now.toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...urls, ...blogEntries]
}
