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
  base: 'top-0 z-30 flex items-center justify-between p-6 text-white-95',
  variants: {
    isFixed: {
      true: 'fixed w-full',
      false: 'sticky',
    },
  },
})

const Navbar = () => {
  const pathname = usePathname()
  const active = pathname!.includes('/buy-keycard')
  const [variant, setVariant] = useState<'primary' | 'secondary'>('secondary')

  const isFixed = pathname!.includes('/keycard')

  console.log('isFixed', isFixed)

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
        <Link
          href="/keycard"
          className="rounded-12 border border-[transparent] px-[14px] pb-[10px] pt-2 transition-colors hover:border-white-6 hover:bg-white-6"
        >
          Keycard
        </Link>
        <Link
          href="/keycard-pro"
          className="rounded-12 border border-[transparent] px-[14px] pb-[10px] pt-2 transition-colors hover:border-white-6 hover:bg-white-6"
        >
          Keycard Pro
        </Link>
        <ButtonLink href="/buy-keycard" variant={variant} active={active}>
          Buy Keycard
        </ButtonLink>
      </div>
    </motion.nav>
  )
}

export { Navbar }
