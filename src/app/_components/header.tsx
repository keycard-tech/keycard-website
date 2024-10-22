'use client'

import { cx } from 'cva'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'

const Header = () => {
  const pathname = usePathname()
  const active = pathname!.includes('/buy-keycard')

  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between p-6 text-white-95">
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
          Keycard pro
        </Link>
        <Link
          href="/buy-keycard"
          className={cx([
            'flex cursor-pointer select-none items-center rounded-12 border border-white-6 bg-white-6 px-[14px] pb-[10px] pt-2 backdrop-blur-[20px] transition-colors hover:bg-white-12',
            active && 'bg-dark-60',
          ])}
        >
          <p className="text-16 font-500 text-white-95">Buy Keycard</p>
        </Link>
      </div>
    </nav>
  )
}

export { Header }
