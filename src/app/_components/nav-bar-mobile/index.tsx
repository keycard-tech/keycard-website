'use client'

import { ROUTES } from '~/config/routes'
import { Button } from '~components/button'
import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import { cx } from 'cva'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Logo } from '../logo'
import { MenuIcon } from './menu-icon'
import { Section } from './section'

const NAV_BAR_HEIGHT = 80

const NavBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const scrollPositionRef = useRef(0)

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

  const finalBackgroundColor = isOpen
    ? 'rgba(255, 255, 255, 0.03)'
    : backgroundColor

  const finalBackdropFilter = isOpen ? 'blur(20px)' : backdropFilter

  useLayoutEffect(() => {
    if (isOpen) {
      scrollPositionRef.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPositionRef.current}px`
      document.body.style.width = '100%'
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollPositionRef.current)
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false)
      scrollPositionRef.current = 0
      window.scrollTo(0, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <motion.nav
      key="nav-bar-mobile"
      className={cx([
        'fixed inset-0 top-[70px] z-40 block w-full transition-all sm:top-12 lg:hidden',
      ])}
      animate={{
        height: isOpen ? '100%' : '80px',
      }}
      initial={{
        height: '80px',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        backgroundColor: finalBackgroundColor,
        WebkitBackdropFilter: finalBackdropFilter,
        backdropFilter: finalBackdropFilter,
      }}
    >
      <div className="flex items-center justify-between p-5">
        <Link href="/" className="text-white-95" aria-label="Homepage">
          <Logo className="h-10" />
        </Link>
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                key="button-keycard"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <BuyKeycardDialog>
                  <Button
                    variant="secondary"
                    data-umami-event="buy-keycard-button-mobile-navbar"
                  >
                    Buy Keycard
                  </Button>
                </BuyKeycardDialog>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            key={isOpen ? 'menu-open' : 'menu-closed'}
            className="rounded-12 border border-white-12 bg-white-8 text-white-95 transition-colors hover:bg-white-12"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <MenuIcon isOpen={isOpen} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100% - 150px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-20 z-30 overflow-hidden"
          >
            <motion.div
              key="menu-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.3,
                  delay: 0,
                },
              }}
              className="flex h-full flex-col items-center justify-center"
            >
              <ul className="flex flex-1 flex-col items-center justify-center gap-4">
                {ROUTES.Products.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                    className="text-center font-lora text-32 font-400 text-white-95"
                  >
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  key="button-keycard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + 3 * 0.05, duration: 0.3 }}
                  className="pt-2 text-center"
                >
                  <BuyKeycardDialog>
                    <Button
                      variant="primary"
                      backdropFilter
                      data-umami-event="buy-keycard-button-mobile-menu"
                    >
                      Buy Keycard
                    </Button>
                  </BuyKeycardDialog>
                </motion.li>
              </ul>
              <motion.div
                key="menu-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + 4 * 0.05, duration: 0.3 }}
                className="grid w-full grid-cols-2 divide-x divide-dashed divide-white-12 border-t border-dashed border-white-12"
              >
                <Section title="INFO" routes={ROUTES.Info} />
                <Section title="CONTACTS" routes={ROUTES.Contacts} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export { NavBarMobile }
