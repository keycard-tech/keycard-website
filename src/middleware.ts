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

const mapLegacyPath = (path: string) => {
  if (path === '/about-us') return '/en/about'
  if (path === '/faq') return '/en/help/faq'
  if (path === '/duress_pin') {
    return '/en/help/about-your-keycard-pin-and-duress-pin'
  }
  if (path === '/slip39') {
    return '/en/help/understand-the-slip-39-wallet-backup-standard'
  }
  if (path === '/help') return '/en/help/about-keycard-and-keycard-shell'
  if (path.startsWith('/help/')) return `/en${path}`
  if (path === '/start') return '/en/start/shell'
  if (path.startsWith('/start/')) return `/en${path}`
  if (path === '/blog') return '/en/blog'
  if (path.startsWith('/blog/')) return `/en${path}`
  if (path === '/docs') return '/en/developers/overview'
  if (path.startsWith('/docs/')) {
    return `/en/developers${path.replace(/^\/docs/, '')}`
  }
  if (path === '/developers') return '/en/developers/overview'
  if (path.startsWith('/developers/')) return `/en${path}`

  return null
}

const buildRedirectUrl = (request: NextRequest, pathname: string) => {
  const url = new URL(request.url)
  url.pathname = pathname
  return url
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split('/')[1]
  const isLocalePath = SUPPORTED_LOCALES.some(locale => locale === firstSegment)

  if (
    isLocalePath &&
    (pathname === `/${firstSegment}/help` ||
      pathname === `/${firstSegment}/help/`)
  ) {
    const destination = `/${firstSegment}/help/about-keycard-and-keycard-shell`
    return NextResponse.redirect(buildRedirectUrl(request, destination), {
      status: 308,
    })
  }

  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const indexStrippedPath =
    normalizedPath === '/index'
      ? '/'
      : normalizedPath.endsWith('/index')
        ? normalizedPath.replace(/\/index$/, '')
        : normalizedPath

  if (indexStrippedPath !== pathname) {
    const destination =
      (!isLocalePath && mapLegacyPath(indexStrippedPath)) ||
      indexStrippedPath ||
      '/'

    return NextResponse.redirect(buildRedirectUrl(request, destination), {
      status: 308,
    })
  }

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
      return NextResponse.redirect(buildRedirectUrl(request, destination), {
        status: 308,
      })
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
    return NextResponse.redirect(buildRedirectUrl(request, canonicalPath), {
      status: 308,
    })
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
    return NextResponse.redirect(buildRedirectUrl(request, canonicalPath), {
      status: 308,
    })
  }

  const shouldBypassI18n =
    pathname === '/' ||
    pathname === '/about-us' ||
    pathname === '/about-us/' ||
    pathname === '/blog' ||
    pathname === '/blog/' ||
    pathname.startsWith('/blog/') ||
    pathname === '/help' ||
    pathname === '/help/' ||
    pathname.startsWith('/help/') ||
    pathname === '/start' ||
    pathname === '/start/' ||
    pathname.startsWith('/start/') ||
    pathname === '/docs' ||
    pathname === '/docs/' ||
    pathname.startsWith('/docs/') ||
    pathname === '/developers' ||
    pathname === '/developers/' ||
    pathname.startsWith('/developers/') ||
    pathname === '/faq' ||
    pathname === '/duress_pin' ||
    pathname === '/slip39'

  if (shouldBypassI18n) {
    return NextResponse.next()
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
