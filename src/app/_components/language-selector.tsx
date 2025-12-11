'use client'

import {
  I18N_COOKIE,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from '~/i18n/constants'
import { cx } from 'cva'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useId, type ChangeEvent } from 'react'
import { routing } from '../../i18n/routing'

const LANGUAGE_LABELS: Record<SupportedLocale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  nl: 'Nederlands',
}

const languages = SUPPORTED_LOCALES.map(locale => ({
  value: locale,
  label: LANGUAGE_LABELS[locale] || locale.toUpperCase(),
}))

type LanguageSelectorProps = {
  showLabel?: boolean
  fullWidth?: boolean
  className?: string
}

export const LanguageSelector = ({
  showLabel = false,
  fullWidth = false,
  className,
}: LanguageSelectorProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const selectId = useId()
  const currentLocale = (params['locale'] as string) || routing.defaultLocale

  const selectedLanguage =
    languages.find(lang => lang.value === currentLocale) || languages[0]

  const handleValueChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value
    const normalizedLocale = SUPPORTED_LOCALES.includes(
      newLocale as SupportedLocale,
    )
      ? newLocale
      : routing.defaultLocale

    const isKeycardDomain = window.location.hostname.endsWith('keycard.tech')
    const domain = isKeycardDomain ? `; Domain=${I18N_COOKIE.domain}` : ''
    const maxAge = I18N_COOKIE.maxAge

    document.cookie = `${I18N_COOKIE.name}=${normalizedLocale}; Path=${I18N_COOKIE.path}; Max-Age=${maxAge}; SameSite=${I18N_COOKIE.sameSite}${domain}`

    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/'
    const normalizedPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale
    const search = window.location.search || ''
    const hash = window.location.hash || ''

    router.push(`/${normalizedLocale}${normalizedPath}${search}${hash}`)
    router.refresh()
  }

  return (
    <div
      className={cx(
        'flex items-center text-white-95',
        showLabel ? 'gap-2' : 'gap-0',
        fullWidth ? 'w-full' : 'min-w-[130px]',
        className,
      )}
    >
      <label
        htmlFor={selectId}
        className={cx(showLabel ? 'text-14 font-400 text-white-95' : 'sr-only')}
      >
        Language
      </label>

      <div className={cx('relative w-full', fullWidth ? '' : 'max-w-[180px]')}>
        <select
          id={selectId}
          name="language"
          value={selectedLanguage.value}
          onChange={handleValueChange}
          aria-label="Language"
          className={cx([
            'appearance-none',
            'bg-white-8',
            'border',
            'border-white-20',
            'rounded-12',
            'text-14',
            'font-400',
            'text-white-95',
            'px-3',
            'pr-8',
            'py-2',
            'min-h-[38px]',
            'cursor-pointer',
            'w-full',
            'transition-colors',
            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-white-80',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-offset-dark-100',
            'hover:border-white-40',
          ])}
        >
          {languages.map(language => (
            <option
              key={language.value}
              value={language.value}
              lang={language.value}
            >
              {language.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center text-white-95">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 5.5L7 9.5L3 5.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}
