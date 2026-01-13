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
  const defaultLocale = locales[0]

  const buildLocalizedUrl = (locale: string, routePath: string) => {
    const normalized = routePath.startsWith('/') ? routePath : `/${routePath}`
    if (normalized === '/') return `${base}/${locale}`
    return `${base}/${locale}${normalized}`
  }

  const buildAlternates = (routePath: string, localesForPath: string[]) => ({
    languages: localesForPath.reduce<Record<string, string>>(
      (acc, locale) => {
        acc[locale] = buildLocalizedUrl(locale, routePath)
        return acc
      },
      { 'x-default': buildLocalizedUrl(defaultLocale, routePath) },
    ),
  })

  const orderedLocales = (available: Set<string>) =>
    locales.filter(locale => available.has(locale))

  const isSupportedLocale = (
    value: string,
  ): value is (typeof SUPPORTED_LOCALES)[number] =>
    (SUPPORTED_LOCALES as readonly string[]).includes(value)

  const isDir = async (dir: string) => {
    try {
      const stat = await fs.stat(dir)
      return stat.isDirectory()
    } catch {
      return false
    }
  }

  const getFileMtime = async (filePath: string) => {
    try {
      const stat = await fs.stat(filePath)
      return stat.mtime
    } catch {
      return now
    }
  }

  const getContentLocales = async (rootDir: string) => {
    const available = new Set<string>([defaultLocale])
    try {
      const entries = await fs.readdir(rootDir, { withFileTypes: true })
      entries
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name)
        .filter(isSupportedLocale)
        .forEach(name => available.add(name))
    } catch {}
    return available
  }

  const contentRoot = {
    developers: path.join(process.cwd(), 'content', 'developers'),
    help: path.join(process.cwd(), 'content', 'help'),
    legal: path.join(process.cwd(), 'content', 'legal'),
  }

  const helpLocales = await getContentLocales(contentRoot.help)
  const developerLocales = await getContentLocales(contentRoot.developers)
  const helpLocaleList = orderedLocales(helpLocales)
  const developerLocaleList = orderedLocales(developerLocales)

  const addLocalizedRoutes = (
    paths: string[],
    localesForPath: string[],
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
    lastModified: Date,
  ) =>
    paths.flatMap(routePath =>
      localesForPath.map(locale => ({
        url: buildLocalizedUrl(locale, routePath),
        lastModified,
        changeFrequency,
        priority,
        alternates: buildAlternates(routePath, localesForPath),
      })),
    )

  // 1) Static routes (localized)
  const staticRoutes: MetadataRoute.Sitemap = [
    ...addLocalizedRoutes(['/'], locales, 'weekly' as const, 1, now),
    ...addLocalizedRoutes(
      ['/blog', '/start', '/about', '/contact', '/wallets'],
      locales,
      'weekly' as const,
      0.8,
      now,
    ),
  ]

  const legalRoutes: MetadataRoute.Sitemap = await Promise.all(
    [
      {
        path: '/legal/privacy-policy',
        file: path.join(contentRoot.legal, 'privacy-policy.md'),
      },
      {
        path: '/legal/terms-of-use',
        file: path.join(contentRoot.legal, 'terms-of-use.md'),
      },
    ].map(async entry => ({
      url: buildLocalizedUrl(defaultLocale, entry.path),
      lastModified: await getFileMtime(entry.file),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
      alternates: buildAlternates(entry.path, [defaultLocale]),
    })),
  )

  // 2) Docs from filesystem
  const urls: MetadataRoute.Sitemap = [...staticRoutes, ...legalRoutes]

  const isRedirectOnlyUrl = (url: string) => {
    try {
      const pathname = new URL(url).pathname
      return /^\/[^/]+\/help\/?$/.test(pathname)
    } catch {
      return false
    }
  }

  async function walk(
    dir: string,
    basePath: string,
    locale: string,
    localesForPath: string[],
    parts: string[] = [],
  ) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        await walk(
          path.join(dir, entry.name),
          basePath,
          locale,
          localesForPath,
          [...parts, entry.name],
        )
      } else if (/\.(md|mdx)$/i.test(entry.name)) {
        const slug = [...parts, entry.name.replace(/\.(md|mdx)$/i, '')].join(
          '/',
        )
        const contentPath = `${basePath}/${slug}`.replace(/\/+/g, '/')
        const filePath = path.join(dir, entry.name)
        const lastModified = await getFileMtime(filePath)
        urls.push({
          url: buildLocalizedUrl(locale, contentPath),
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
          alternates: buildAlternates(contentPath, localesForPath),
        })
      }
    }
  }

  const addContentRoutes = async (
    rootDir: string,
    basePath: string,
    localesForPath: string[],
  ) => {
    for (const locale of localesForPath) {
      const localizedDir =
        locale === defaultLocale ? rootDir : path.join(rootDir, locale)
      if (locale !== defaultLocale && !(await isDir(localizedDir))) continue
      await walk(localizedDir, basePath, locale, localesForPath)
    }
  }

  try {
    await addContentRoutes(
      contentRoot.developers,
      '/developers',
      developerLocaleList,
    )
    await addContentRoutes(contentRoot.help, '/help', helpLocaleList)
  } catch {}

  // blog posts
  const posts = await getAllPostsForSitemap()
  const blogEntries: MetadataRoute.Sitemap = posts.flatMap(post =>
    locales.map(locale => ({
      url: buildLocalizedUrl(locale, `/blog/${post.slug}`),
      lastModified: post.updated_at || post.published_at || now.toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: buildAlternates(`/blog/${post.slug}`, locales),
    })),
  )

  const filteredUrls = urls.filter(entry => !isRedirectOnlyUrl(entry.url))

  return [...filteredUrls, ...blogEntries]
}
