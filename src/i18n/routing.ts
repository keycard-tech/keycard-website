import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'fr', 'de', 'es', 'nl'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Always show locale prefix in URL
  localePrefix: 'always',

  // Enable automatic locale detection
  localeDetection: true,

  // Mirror the active locale into a shared cookie
  localeCookie: {
    name: 'lang',
    path: '/',
    domain: '.keycard.tech',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
})
