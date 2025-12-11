import { defineRouting } from 'next-intl/routing'
import { I18N_COOKIE, SUPPORTED_LOCALES } from './constants'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [...SUPPORTED_LOCALES],

  // Used when no locale matches
  defaultLocale: 'en',

  // Always show locale prefix in URL
  localePrefix: 'always',

  // Enable automatic locale detection
  localeDetection: true,

  // Mirror the active locale into a shared cookie
  localeCookie: {
    name: I18N_COOKIE.name,
    path: I18N_COOKIE.path,
    domain: I18N_COOKIE.domain,
    sameSite: I18N_COOKIE.sameSite,
    maxAge: I18N_COOKIE.maxAge,
  },
})
