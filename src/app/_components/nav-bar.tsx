'use client'

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './button'
import { BuyKeycardDialog } from './buy-keycard-dialog'
import { Logo } from './logo'

const NAV_BAR_HEIGHT = 92

const NavBar = () => {
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
      className="fixed left-0 top-0 z-30 hidden w-full items-center justify-between px-8 py-6 text-white-95 lg:flex"
      style={{
        backgroundColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
      }}
    >
      <Link href="/" aria-label="Homepage">
        <Logo />
      </Link>

      <BuyKeycardDialog>
        <Button variant={variant}>Buy Keycard</Button>
      </BuyKeycardDialog>
    </motion.nav>
  )
}

export { NavBar }
