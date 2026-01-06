import buildSitemap, { revalidate } from '~/app/_lib/sitemap-data'
import type { MetadataRoute } from 'next'
import { NextResponse } from 'next/server'

export { revalidate }

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const formatLastModified = (
  value: MetadataRoute.Sitemap[number]['lastModified'],
) => {
  if (!value) return null
  return value instanceof Date ? value.toISOString() : value
}

const renderAlternates = (
  alternates?: MetadataRoute.Sitemap[number]['alternates'],
) => {
  const languages = alternates?.languages
  if (!languages) return ''

  return Object.entries(languages)
    .filter(([, href]) => typeof href === 'string' && href.length > 0)
    .map(
      ([locale, href]) =>
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(
          locale,
        )}" href="${escapeXml(href)}" />`,
    )
    .join('\n')
}

const renderUrl = (entry: MetadataRoute.Sitemap[number]) => {
  const lastmod = formatLastModified(entry.lastModified)
  const alternates = renderAlternates(entry.alternates)
  const lines = [
    '  <url>',
    `    <loc>${escapeXml(entry.url)}</loc>`,
    alternates || null,
    lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : null,
    entry.changeFrequency
      ? `    <changefreq>${entry.changeFrequency}</changefreq>`
      : null,
    entry.priority != null
      ? `    <priority>${entry.priority}</priority>`
      : null,
    '  </url>',
  ]

  return lines.filter(Boolean).join('\n')
}

const buildSitemapXml = (entries: MetadataRoute.Sitemap) => {
  const body = entries.map(renderUrl).join('\n')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    body,
    '</urlset>',
    '',
  ].join('\n')
}

export async function GET() {
  const entries = await buildSitemap()
  const xml = buildSitemapXml(entries)

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
