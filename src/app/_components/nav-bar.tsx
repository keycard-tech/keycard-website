'use client'

import { animated, useScroll } from '@react-spring/web'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ButtonLink } from './button-link'
import { Logo } from './logo'

const Navbar = () => {
  const pathname = usePathname()
  const active = pathname!.includes('/buy-keycard')

  const { scrollYProgress } = useScroll()

  return (
    <animated.nav
      className="sticky top-0 z-20 flex items-center justify-between p-6 text-white-95"
      style={{
        // backgroundColor: scrollYProgress.to(
        //   [0, 1],
        //   ['transparent', 'rgba(255, 255, 255, 0.03)'],
        // ),
        backdropFilter: scrollYProgress.to([0, 1], ['blur(0px)', 'blur(20px)']),
      }}
    >
      <Link href="/">
        <Logo />
      </Link>

      <div className="flex items-center space-x-6">
        <Link
          href="/keycard"
          className="rounded-12 border border-[transparent] px-[14px] pb-[10px] pt-2 backdrop-blur-[20px] transition-colors hover:border-white-6 hover:bg-white-6"
        >
          Keycard
        </Link>
        <Link
          href="/keycard-pro"
          className="rounded-12 border border-[transparent] px-[14px] pb-[10px] pt-2 backdrop-blur-[20px] transition-colors hover:border-white-6 hover:bg-white-6"
        >
          Keycard Pro
        </Link>
        <ButtonLink href="/buy-keycard" variant="secondary" active={active}>
          Buy Keycard
        </ButtonLink>
      </div>
    </animated.nav>
  )
}

export { Navbar }
