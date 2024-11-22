export const ROUTES = {
  Products: [
    { name: 'Keycard', href: '/keycard' },
    { name: 'Keycard Shell', href: '/keycard-shell' },
  ],
  Info: [
    { name: 'Get started', href: '/get-started' },
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
  Network: [
    { name: 'status.app', href: 'https://status.app' },
    {
      name: 'Logos',
      href: 'https://logos.co',
    },
    { name: 'Codex', href: 'https://codex.storage/' },
  ],
} as const

export const STATUS_MOBILE_APP_STORE_URL =
  'https://apps.apple.com/us/app/status-private-communication/id1178893006'
export const STATUS_MOBILE_GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=im.status.ethereum&pcampaignid=web_share'
export const STATUS_MOBILE_F_DROID_URL =
  'https://f-droid.org/packages/im.status.ethereum'

export const STATUS_DESKTOP_DOWNLOAD_URL_MACOS_SILICON =
  '/api/download/macos-silicon'
export const STATUS_DESKTOP_DOWNLOAD_URL_MACOS_INTEL =
  '/api/download/macos-intel'
export const STATUS_DESKTOP_DOWNLOAD_URL_WINDOWS = '/api/download/windows'
export const STATUS_DESKTOP_DOWNLOAD_URL_LINUX = '/api/download/linux'

export type Routes = (typeof ROUTES)[keyof typeof ROUTES]
