export const ROUTES = {
  Products: [
    { name: 'Keycard', href: 'https://get.keycard.tech/pages/keycard' },
    {
      name: 'Keycard Shell',
      href: 'https://get.keycard.tech/pages/keycard-shell',
    },
  ],
  Info: [
    { name: 'Get started', href: '/start/keycard' },
    { name: 'Blog', href: '/blog' },
    { name: 'Help', href: '/help/overview' },
    { name: 'Developers', href: '/developers/overview' },
    { name: 'Affiliates', href: 'https://affiliates.keycard.tech' },
  ],
  Contacts: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Discord', href: 'https://discord.gg/uJAXk7jFhZ' },
    { name: 'X', href: 'https://x.com/Keycard_' },
    // { name: 'Email', href: 'mailto:support@keycard.tech' },
  ],
  Legal: [
    { name: 'Privacy policy', href: '/legal/privacy-policy' },
    { name: 'Terms of use', href: '/legal/terms-of-use' },
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
