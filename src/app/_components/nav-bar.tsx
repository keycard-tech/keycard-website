'use client'

import { getShopifyUrl, KEYCARD_TECH_URL } from '~/config/routes'
import { CartBadge } from '~components/cart/cart-badge'
import { cva } from 'cva'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LanguageSelector } from './language-selector'
import { Link } from './link'
import { Logo } from './logo'

const NAV_BAR_HEIGHT = 92

const internalLinkStyles = cva({
  base: 'rounded-12 border border-[transparent] px-[14px] py-[7px] transition-colors hover:bg-white-8',
  variants: {
    isActive: {
      true: 'bg-white-12',
      false: '',
    },
  },
})

type NavBarSubItem = {
  href: string
  label: string
}

type NavBarLink = {
  href: string
  label: string
  subItems?: NavBarSubItem[]
}

export const getNavBarLinks = (locale: string): NavBarLink[] => [
  {
    href: getShopifyUrl(locale, '/pages/keycard'),
    label: 'Keycard',
    subItems: [
      { href: '/start/keycard', label: 'Start guide' },
      { href: '/help/about-keycard-and-keycard-shell', label: 'Help' },
      { href: '/help/faq', label: 'FAQ' },
    ],
  },
  {
    href: getShopifyUrl(locale, '/pages/keycard-shell'),
    label: 'Keycard Shell',
    subItems: [
      { href: '/start/shell', label: 'Start guide' },
      { href: '/help/about-keycard-and-keycard-shell', label: 'Help' },
      { href: '/help/faq', label: 'FAQ' },
      {
        href: 'https://shell.keycard.tech/verify/',
        label: 'Verify device',
      },
      { href: 'https://shell.keycard.tech/update/', label: 'Update' },
    ],
  },
]

const NavBar = () => {
  const pathname = usePathname()
  const [, setVariant] = useState<'primary' | 'secondary'>('secondary')
  const locale = useLocale()
  const NAV_BAR_LINKS = getNavBarLinks(locale)

  const { scrollY } = useScroll()

  const backgroundColor = useTransform(
    scrollY,
    [0, NAV_BAR_HEIGHT],
    ['transparent', 'rgba(255, 255, 255, 0.03)'],
  )
  const backdropFilter = useTransform(
    scrollY,
    [0, NAV_BAR_HEIGHT],
    ['blur(0px)', 'blur(20px)'],
  )

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > NAV_BAR_HEIGHT) {
      return setVariant('primary')
    }
    return setVariant('secondary')
  })

  return (
    <motion.nav
      className="fixed left-0 top-0 z-30 hidden w-full items-center justify-between px-8 py-6 text-white-95 lg:flex"
      aria-label="Primary"
      style={{
        backgroundColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
      }}
    >
      <Link href={KEYCARD_TECH_URL} target="_self" aria-label="Homepage">
        <Logo />
      </Link>

      <div className="flex items-center gap-1">
        {NAV_BAR_LINKS.map(({ href, label, subItems }) => (
          <div key={href} className="group relative">
            <Link
              href={href}
              className={internalLinkStyles({ isActive: pathname === href })}
              target="_self"
              aria-haspopup={subItems?.length ? 'true' : undefined}
            >
              {label}
            </Link>
            {subItems && subItems.length > 0 && (
              <div className="opacity-0 group-hover:opacity-100 invisible absolute left-0 top-full z-30 mt-3 min-w-[200px] translate-y-1 transition-all duration-200 group-hover:visible group-hover:translate-y-0">
                <div className="flex flex-col gap-2 rounded-20 border border-white-12 bg-grey-100 p-3 shadow-lg">
                  {subItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      target="_self"
                      className="rounded-16 border border-white-12 bg-white-8 px-4 py-2 text-14 font-500 text-white-95 transition-colors hover:bg-white-12"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <LanguageSelector />
        <CartBadge />
      </div>
    </motion.nav>
  )
}

export { NavBar }
