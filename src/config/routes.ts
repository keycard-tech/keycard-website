import { SUPPORTED_LOCALES, type SupportedLocale } from '~/i18n/constants'
import { useTranslations } from 'next-intl'

const SHOPIFY_BASE_URL = 'https://get.keycard.tech'

const normalizeLocale = (locale: string): SupportedLocale =>
  SUPPORTED_LOCALES.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : 'en'

export const getShopifyUrl = (locale: string, path: string) => {
  const normalizedLocale = normalizeLocale(locale)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SHOPIFY_BASE_URL}/${normalizedLocale}${normalizedPath}`
}

export const getRoutes = (
  t: ReturnType<typeof useTranslations>,
  locale: string,
) =>
  ({
    Products: [
      {
        name: t('footer.products.keycard.translation'),
        href: getShopifyUrl(locale, '/pages/keycard'),
      },
      {
        name: t('footer.products.keycard_shell.translation'),
        href: getShopifyUrl(locale, '/pages/keycard-shell'),
      },
    ],
    Info: [
      { name: t('footer.info.get_started.translation'), href: '/start' },
      { name: t('footer.info.blog.translation'), href: '/blog' },
      { name: t('footer.info.help.translation'), href: '/help/overview' },
      {
        name: t('footer.info.developers.translation'),
        href: '/developers/overview',
      },
      {
        name: t('footer.info.affiliates.translation'),
        href: 'https://affiliates.keycard.tech',
      },
    ],
    Contacts: [
      { name: t('footer.contacts.about.translation'), href: '/about' },
      { name: t('footer.contacts.contact.translation'), href: '/contact' },
      {
        name: t('footer.contacts.discord.translation'),
        href: 'https://discord.gg/uJAXk7jFhZ',
      },
      {
        name: t('footer.contacts.x.translation'),
        href: 'https://x.com/Keycard_',
      },
      // { name: 'Email', href: 'mailto:support@keycard.tech' },
    ],
    Legal: [
      {
        name: t('footer.legal.privacy_policy.translation'),
        href: '/legal/privacy-policy',
      },
      {
        name: t('footer.legal.terms_of_use.translation'),
        href: '/legal/terms-of-use',
      },
    ],
    // 'Works with': [
    //   {
    //     name: 'Status',
    //     href: 'https://status.app',
    //   },
    //   {
    //     name: 'WallETH',
    //     href: 'https://walleth.org',
    //   },
    //   {
    //     name: 'Enno Wallet',
    //     href: 'https://ennowallet.com/',
    //   },
    // ],
  }) as const

// Keep the original ROUTES for backward compatibility
const defaultLocale = 'en'
export const ROUTES = {
  Keycard: [
    {
      name: 'About Keycard',
      href: '/keycard',
    },
    {
      name: 'Buy Keycard',
      href: getShopifyUrl(defaultLocale, '/pages/keycard'),
    },
    {
      name: 'Get Started',
      href: '/start/keycard',
    },
  ],
  Shell: [
    {
      name: 'About Shell',
      href: getShopifyUrl(defaultLocale, '/pages/keycard-shell'),
    },
    {
      name: 'Buy Shell',
      href: getShopifyUrl(defaultLocale, '/pages/keycard-shell'),
    },
    {
      name: "Owner's hub",
      href: 'https://shell.keycard.tech/',
    },
    {
      name: 'Quick Start Guide',
      href: '/start/shell',
    },
    {
      name: 'Update Shell',
      href: 'https://shell.keycard.tech/update/',
    },
    {
      name: 'Verify Shell',
      href: 'https://shell.keycard.tech/verify/',
    },
  ],
  Info: [
    {
      name: 'About',
      href: '/about',
    },
    {
      name: 'Blog',
      href: '/blog',
    },
    {
      name: 'Help',
      href: '/help/about-keycard-and-keycard-shell',
    },
    {
      name: 'Developers',
      href: '/developers/overview',
    },
    {
      name: 'Affiliates',
      href: 'https://affiliates.keycard.tech',
      external: true,
    },
  ],
  Contacts: [
    {
      name: 'Contact us',
      href: '/contact',
    },
    {
      name: 'Discord',
      href: 'https://discord.com/invite/uJAXk7jFhZ',
      external: true,
    },
    {
      name: 'X',
      href: 'https://x.com/Keycard_',
      external: true,
    },
  ],
  Legal: [
    { name: 'Privacy policy', href: '/legal/privacy-policy' },
    { name: 'Terms of use', href: '/legal/terms-of-use' },
  ],
} as const

export const STATUS_MOBILE_APP_STORE_URL =
  'https://apps.apple.com/us/app/status-private-communication/id1178893006'
export const STATUS_MOBILE_GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=im.status.ethereum&pcampaignid=web_share'
export const STATUS_MOBILE_F_DROID_URL =
  'https://f-droid.org/packages/im.status.ethereum'

export const STATUS_DESKTOP_DOWNLOAD_URL_MACOS_SILICON =
  'https://status.app/api/download/macos-silicon'
export const STATUS_DESKTOP_DOWNLOAD_URL_MACOS_INTEL =
  'https://status.app/api/download/macos-intel'
export const STATUS_DESKTOP_DOWNLOAD_URL_WINDOWS =
  'https://status.app/api/download/windows'
export const STATUS_DESKTOP_DOWNLOAD_URL_LINUX =
  'https://status.app/api/download/linux'

export const STATUS_APPS_DESKTOP_URL = 'https://status.app/apps#desktop'

export type Routes = ReadonlyArray<{
  readonly name: string
  readonly href: string
}>
