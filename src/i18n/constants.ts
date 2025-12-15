export const I18N_COOKIE = {
  name: 'lang',
  domain: '.keycard.tech',
  path: '/',
  maxAge: 60 * 60 * 24 * 365, // 1 year
  sameSite: 'lax' as const,
}

export const SUPPORTED_LOCALES = ['en', 'fr', 'de', 'es', 'nl'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]
