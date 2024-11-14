'use client'

import { cva } from 'cva'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BuyKeycard } from './buy-keycard'
import { Logo } from './logo'

const NAV_BAR_HEIGHT = 92

const internalLinkStyles = cva({
  base: 'rounded-12 border border-[transparent] px-[14px] pb-[10px] pt-2 transition-colors hover:border-white-8 hover:bg-white-8',
  variants: {
    isActive: {
      true: 'bg-white-12',
      false: '',
    },
  },
})

const links = [
  { href: '/keycard', label: 'Keycard' },
  {
    href: '/keycard-pro',
    label: 'Keycard Pro',
  },
]

const NavBar = () => {
  const pathname = usePathname()
  const [variant, setVariant] = useState<'primary' | 'secondary'>('secondary')

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
      className="fixed left-0 top-0 z-30 hidden w-full items-center justify-between p-6 px-8 pt-8 text-white-95 lg:flex"
      style={{
        backgroundColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
      }}
    >
      <Link href="/">
        <Logo />
      </Link>

      <div className="flex items-center space-x-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={internalLinkStyles({ isActive: pathname === href })}
          >
            {label}
          </Link>
        ))}
        <BuyKeycard variant={variant} />
      </div>
    </motion.nav>
  )
}

export { NavBar }
