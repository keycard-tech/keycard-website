import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SUPPORTED_LOCALES } from './i18n/constants'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

// Get non-English locales for redirect matching
const NON_ENGLISH_LOCALES = SUPPORTED_LOCALES.filter(locale => locale !== 'en')
// Escape locales for regex safety (handles future locales like pt-BR, zh-Hant)
const NON_ENGLISH_LOCALES_REGEX =
  NON_ENGLISH_LOCALES.length > 0
    ? NON_ENGLISH_LOCALES.map(locale =>
        locale.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      ).join('|')
    : '(?!x)x' // Never matches if empty

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect legacy .html URLs to canonical routes (permanent, single-hop).
  if (pathname.endsWith('.html')) {
    let destination: string | null = null

    if (pathname === '/index.html') {
      destination = '/en'
    } else if (pathname === '/about-us/index.html') {
      destination = '/en/about'
    } else if (pathname.startsWith('/docs/')) {
      const withoutPrefix = pathname.replace(/^\/docs/, '')
      const withoutHtml = withoutPrefix.replace(/\.html$/, '')
      destination = `/en/developers${withoutHtml}`
    } else if (pathname.startsWith('/developers/')) {
      const withoutHtml = pathname.replace(/\.html$/, '')
      destination = `/en${withoutHtml}`
    }

    if (destination) {
      const targetUrl = request.nextUrl.clone()
      targetUrl.pathname = destination
      return NextResponse.redirect(targetUrl, { status: 308 })
    }
  }

  // Handle legal page redirects for SEO canonicalization
  // Legal pages should only be accessible at /en/legal/* (English-only)
  if (pathname === '/legal' || pathname.startsWith('/legal/')) {
    // Redirect bare /legal or /legal/* to /en/legal/*
    const legalPath = pathname.replace(/^\/legal/, '/en/legal')
    // Normalize trailing slashes - remove ALL trailing slashes for canonical URLs
    const canonicalPath = legalPath.replace(/\/+$/, '')

    // Preserve query params and hash by cloning nextUrl (Next.js idiom)
    const targetUrl = request.nextUrl.clone()
    targetUrl.pathname = canonicalPath

    return NextResponse.redirect(targetUrl, { status: 308 })
  }

  // Redirect non-English legal locales to English canonical URLs
  const legalLocaleMatch = pathname.match(
    new RegExp(`^\/(${NON_ENGLISH_LOCALES_REGEX})\/legal(\/.*)?$`),
  )
  if (legalLocaleMatch) {
    const [, , legalPath = ''] = legalLocaleMatch
    // Normalize trailing slashes - remove ALL trailing slashes for canonical URLs
    const canonicalPath = `/en/legal${legalPath}`.replace(/\/+$/, '')

    // Preserve query params and hash by cloning nextUrl (Next.js idiom)
    const targetUrl = request.nextUrl.clone()
    targetUrl.pathname = canonicalPath

    return NextResponse.redirect(targetUrl, { status: 308 })
  }

  // Get the hash fragment from the original URL
  const hash = request.url.split('#')[1]

  // Run the next-intl middleware
  const response = handleI18nRouting(request)

  // If it's a redirect response and we have a hash, preserve it
  if ((response.status === 307 || response.status === 302) && hash) {
    const location = response.headers.get('location')
    if (location) {
      const newUrl = new URL(location, request.url)
      newUrl.hash = hash
      response.headers.set('location', newUrl.toString())
    }
  }

  return response
}

export const config = {
  // Match all pathnames except for
  // - API routes (/api/*)
  // - _next (Next.js internals)
  // - _static (inside /public)
  // - files with extensions (e.g. favicon.ico), but allow .html for legacy redirects
  matcher: '/((?!api|_next|_static|.*\\.(?!html$)).*)',
}
