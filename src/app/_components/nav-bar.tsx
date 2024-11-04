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
import { ButtonLink } from './button-link'
import { Logo } from './logo'

const NAV_BAR_HEIGHT = 92

const navStyles = cva({
  base: 'top-0 left-0 z-30 flex items-center justify-between p-6 text-white-95',
  variants: {
    isFixed: {
      true: 'fixed w-full pt-8 px-8',
      false: 'sticky',
    },
  },
})

const internalLinkStyles = cva({
  base: 'rounded-12 border border-[transparent] px-[14px] pb-[10px] pt-2 transition-colors hover:border-white-8 hover:bg-white-8',
  variants: {
    active: {
      true: 'bg-white-12',
      false: '',
    },
  },
})

const links = [
  { href: '/keycard', label: 'Keycard', component: Link, customStyles: true },
  {
    href: '/keycard-pro',
    label: 'Keycard Pro',
    component: Link,
    customStyles: true,
  },
  { href: '/buy-keycard', label: 'Buy Keycard', component: ButtonLink },
]

const Navbar = () => {
  const pathname = usePathname()
  const [variant, setVariant] = useState<'primary' | 'secondary'>('secondary')

  const isFixed = pathname!.includes('/keycard')

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
      className={navStyles({ isFixed })}
      style={{
        backgroundColor,
        backdropFilter,
      }}
    >
      <Link href="/">
        <Logo />
      </Link>

      <div className="flex items-center space-x-6">
        {links.map(({ href, label, component: Component, customStyles }) => (
          <Component
            key={href}
            href={href}
            variant={variant}
            active={pathname === href}
            {...(customStyles
              ? { className: internalLinkStyles({ active: pathname === href }) }
              : {})}
          >
            {label}
          </Component>
        ))}
      </div>
    </motion.nav>
  )
}

export { Navbar }
