'use client'

import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon } from '@status-im/icons/20'
import { I18N_COOKIE, SUPPORTED_LOCALES } from '~/i18n/constants'
import { cx } from 'cva'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { routing } from '../../i18n/routing'

const languages = [
  {
    value: 'en',
    label: 'English (EN)',
    nativeLabel: 'English',
  },
  {
    value: 'fr',
    label: 'French (FR)',
    nativeLabel: 'Français',
  },
  {
    value: 'de',
    label: 'German (DE)',
    nativeLabel: 'Deutsch',
  },
  {
    value: 'es',
    label: 'Spanish (ES)',
    nativeLabel: 'Español',
  },
  {
    value: 'nl',
    label: 'Dutch (NL)',
    nativeLabel: 'Nederlands',
  },
]

export const LanguageSelector = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const currentLocale = (params['locale'] as string) || routing.defaultLocale

  const selectedLanguage =
    languages.find(lang => lang.value === currentLocale) || languages[0]

  const handleValueChange = (newLocale: string) => {
    const normalizedLocale = SUPPORTED_LOCALES.includes(
      newLocale as (typeof SUPPORTED_LOCALES)[number],
    )
      ? newLocale
      : routing.defaultLocale

    const isKeycardDomain = window.location.hostname.endsWith('keycard.tech')
    const domain = isKeycardDomain ? `; Domain=${I18N_COOKIE.domain}` : ''
    const maxAge = I18N_COOKIE.maxAge

    document.cookie = `${I18N_COOKIE.name}=${normalizedLocale}; Path=${I18N_COOKIE.path}; Max-Age=${maxAge}; SameSite=${I18N_COOKIE.sameSite}${domain}`

    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/'
    const normalizedPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale
    const search = window.location.search || ''
    const hash = window.location.hash || ''

    // Navigate to the new locale (always prefixed)
    router.push(`/${normalizedLocale}${normalizedPath}${search}${hash}`)

    // Force a refresh to ensure all components get updated translations
    router.refresh()
  }

  return (
    <Select.Root
      value={selectedLanguage.value}
      onValueChange={handleValueChange}
    >
      <Select.Trigger
        className={cx([
          'bg-white-4',
          'flex',
          'items-center',
          'gap-1',
          'px-2',
          'py-[5px]',
          'rounded-12',
          'text-14',
          'font-400',
          'text-white-95',
          'hover:bg-white-8',
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-orange/50',
          'focus:ring-offset-2',
          'focus:ring-offset-dark-100',
          'transition-colors',
          'w-[85px]',
          'h-full',
          'border-white-8',
          'border',
        ])}
      >
        {/* Globe icon */}
        <div className="rounded-4 flex size-5 items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white-60"
          >
            <path
              d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.5 8H14.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 1.5C9.5 3.5 10.5 5.5 10.5 8C10.5 10.5 9.5 12.5 8 14.5C6.5 12.5 5.5 10.5 5.5 8C5.5 5.5 6.5 3.5 8 1.5Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <Select.Value placeholder={selectedLanguage.value.toUpperCase()}>
          <span className="flex text-14 font-400 text-white-95">
            {selectedLanguage.value.toUpperCase()}
          </span>
        </Select.Value>

        <Select.Icon asChild>
          <ChevronDownIcon className="size-5 text-white-95" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={cx([
            'bg-dark-100',
            'rounded-16',
            'p-4',
            'shadow-lg',
            'min-w-[246px]',
            'z-[200]',
            'border',
            'border-white-8',
          ])}
          position="popper"
          sideOffset={8}
        >
          <Select.Viewport>
            {languages.map(language => (
              <Select.Item
                key={language.value}
                value={language.value}
                className={cx([
                  'flex',
                  'items-center',
                  'justify-between',
                  'p-2',
                  'rounded-8',
                  'cursor-pointer',
                  'hover:bg-white-8',
                  'focus:bg-white-8',
                  'focus:outline-none',
                  'data-[state=checked]:bg-white-8',
                  'transition-colors',
                ])}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="text-13 font-400 text-white-95">
                    {language.label}
                  </div>
                  <div className="text-white-70 text-13 font-400">
                    {language.nativeLabel}
                  </div>
                </div>

                <Select.ItemIndicator>
                  <CheckIcon className="size-5 text-orange" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
