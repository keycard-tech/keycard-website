'use client'

import { getShopifyUrl } from '~/config/routes'
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
  base: 'rounded-12 border border-[transparent] px-[14px] py-[7px] transition-colors  hover:bg-white-8',
  variants: {
    isActive: {
      true: 'bg-white-12',
      false: '',
    },
  },
})

export const getNavBarLinks = (locale: string) => [
  { href: getShopifyUrl(locale, '/pages/keycard'), label: 'Keycard' },
  {
    href: getShopifyUrl(locale, '/pages/keycard-shell'),
    label: 'Keycard Shell',
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
      className="fixed left-0 top-12 z-30 hidden w-full items-center justify-between px-8 py-6 text-white-95 lg:flex"
      style={{
        backgroundColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
      }}
    >
      <Link href="/" aria-label="Homepage">
        <Logo />
      </Link>

      <div className="flex items-center gap-1">
        {NAV_BAR_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={internalLinkStyles({ isActive: pathname === href })}
            target="_self"
          >
            {label}
          </Link>
        ))}

        <LanguageSelector />
        <CartBadge />
      </div>
    </motion.nav>
  )
}

export { NavBar }
