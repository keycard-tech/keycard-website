import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const mergeMessages = (
  base: Record<string, unknown>,
  overrides: Record<string, unknown>,
): Record<string, unknown> => {
  const output: Record<string, unknown> = { ...base }

  for (const [key, value] of Object.entries(overrides)) {
    if (isRecord(value) && isRecord(base[key])) {
      output[key] = mergeMessages(base[key] as Record<string, unknown>, value)
    } else {
      output[key] = value
    }
  }

  return output
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale =
    requested && hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale

  const fallbackMessages = (
    await import(`../../messages/${routing.defaultLocale}.json`)
  ).default
  const localeMessages = (await import(`../../messages/${locale}.json`)).default

  return {
    locale,
    messages:
      locale === routing.defaultLocale
        ? localeMessages
        : mergeMessages(fallbackMessages, localeMessages),
  }
})
