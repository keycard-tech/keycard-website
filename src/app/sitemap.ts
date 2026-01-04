import fs from 'fs/promises'
import path from 'path'
import { getAllPostsForSitemap } from '~/app/_lib/ghost'
import { SUPPORTED_LOCALES } from '~/i18n/constants'
import type { MetadataRoute } from 'next'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://keycard.tech'
  const now = new Date()

  const locales = [...SUPPORTED_LOCALES]

  const buildLocalizedUrl = (locale: string, path: string) => {
    const normalized = path.startsWith('/') ? path : `/${path}`
    if (normalized === '/') return `${base}/${locale}`
    return `${base}/${locale}${normalized}`
  }

  // 1) Static routes (localized)
  const baseRoutes = [
    '/',
    '/blog',
    '/start',
    '/about',
    '/contact',
    '/help',
    '/wallets',
    '/developers',
  ]

  const staticRoutes: MetadataRoute.Sitemap = baseRoutes.flatMap(path =>
    locales.map(locale => ({
      url: buildLocalizedUrl(locale, path),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1 : 0.8,
    })),
  )

  const legalRoutes: MetadataRoute.Sitemap = [
    '/en/legal/privacy-policy',
    '/en/legal/terms-of-use',
  ].map(p => ({
    url: base + p,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }))

  // 2) Docs from filesystem
  const urls: MetadataRoute.Sitemap = [...staticRoutes, ...legalRoutes]

  async function walk(dir: string, basePath: string, parts: string[] = []) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      if (e.isDirectory()) {
        await walk(path.join(dir, e.name), basePath, [...parts, e.name])
      } else if (/\.(md|mdx)$/i.test(e.name)) {
        const slug = [...parts, e.name.replace(/\.(md|mdx)$/i, '')].join('/')
        const contentPath = `${basePath}/${slug}`.replace(/\/+/g, '/')
        locales.forEach(locale => {
          urls.push({
            url: buildLocalizedUrl(locale, contentPath),
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
          })
        })
      }
    }
  }
  try {
    await walk(path.join(process.cwd(), 'content', 'developers'), '/developers')
    await walk(path.join(process.cwd(), 'content', 'help'), '/help')
  } catch {}

  // blog posts
  const posts = await getAllPostsForSitemap()
  const blogEntries: MetadataRoute.Sitemap = posts.flatMap(p =>
    locales.map(locale => ({
      url: buildLocalizedUrl(locale, `/blog/${p.slug}`),
      lastModified: p.updated_at || p.published_at || now.toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
  )

  return [...urls, ...blogEntries]
}
