import { SUPPORTED_LOCALES } from '~/i18n/constants'

const DEFAULT_LOCALE = SUPPORTED_LOCALES[0]

const normalizePath = (path: string) => {
  if (!path) return '/'
  return path.startsWith('/') ? path : `/${path}`
}

export const resolveLocale = (
  locale?: string,
  locales: readonly string[] = SUPPORTED_LOCALES,
) => {
  const fallback = locales[0] ?? DEFAULT_LOCALE
  if (!locale) return fallback
  return locales.includes(locale) ? locale : fallback
}

export const buildLocalizedPath = (locale: string, path: string) => {
  const normalized = normalizePath(path)
  if (normalized === '/') return `/${locale}`
  return `/${locale}${normalized}`
}

export const buildLocaleAlternates = (
  locale: string | undefined,
  path: string,
  locales: readonly string[] = SUPPORTED_LOCALES,
) => {
  const defaultLocale = locales[0] ?? DEFAULT_LOCALE
  const activeLocale = resolveLocale(locale, locales)
  const build = (targetLocale: string) => buildLocalizedPath(targetLocale, path)

  return {
    canonical: build(activeLocale),
    languages: locales.reduce<Record<string, string>>(
      (acc, targetLocale) => {
        acc[targetLocale] = build(targetLocale)
        return acc
      },
      { 'x-default': build(defaultLocale) },
    ),
  }
}
