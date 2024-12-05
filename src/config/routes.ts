export const ROUTES = {
  // Products: [
  //   { name: 'Keycard', href: '/keycard' },
  //   { name: 'Keycard Shell', href: '/keycard-shell' },
  // ],
  Info: [
    { name: 'Get started', href: '/start' },
    { name: 'Documentation', href: '/docs/overview' },
    { name: 'Blog', href: '/blog' },
  ],
  Contacts: [
    { name: 'Get in touch', href: 'mailto:support@keycard.tech' },
    { name: 'Discord', href: 'https://discord.com' },
    { name: 'X', href: 'https://x.com/Keycard_' },
  ],
  Legal: [
    { name: 'Privacy policy', href: '/legal/privacy-policy' },
    { name: 'Terms of use', href: '/legal/terms-of-use' },
  ],
  'Works with': [
    {
      name: 'Status',
      href: 'https://status.app',
    },
    {
      name: 'WallETH',
      href: 'https://walleth.org',
    },
    {
      name: 'Enno Wallet',
      href: 'https://ennowallet.com/',
    },
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

export type Routes = (typeof ROUTES)[keyof typeof ROUTES]
