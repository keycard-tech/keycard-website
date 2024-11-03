export const ROUTES = {
  Products: [
    { name: 'Keycard', href: '/keycard' },
    { name: 'Keycard Pro', href: '/keycard-pro' },
  ],
  Info: [
    { name: 'Get started', href: '/get-started' },
    { name: 'Documentation', href: '/docs/overview' },
    { name: 'Blog', href: '/blog' },
  ],
  Contacts: [
    { name: 'Get in touch', href: '/contact' },
    { name: 'Discord', href: 'https://discord.com' },
    { name: 'X', href: 'https://x.com' },
  ],
  Legal: [
    { name: 'Privacy policy', href: '/privacy-policy' },
    { name: 'Terms of use', href: '/terms-of-use' },
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

export type Routes = (typeof ROUTES)[keyof typeof ROUTES]
