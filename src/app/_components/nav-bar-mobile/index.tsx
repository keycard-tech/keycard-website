'use client'

import { ROUTES } from '~/config/routes'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useLayoutEffect, useState } from 'react'
import { ButtonLink } from '../button-link'
import { Logo } from '../logo'
import { MenuIcon } from './menu-icon'
import { Section } from './section'

const NAV_BAR_HEIGHT = 80

const NavBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false)

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

  const finalBackgroundColor = isOpen
    ? 'rgba(255, 255, 255, 0.03)'
    : backgroundColor

  const finalBackdropFilter = isOpen ? 'blur(20px)' : backdropFilter

  useLayoutEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY

      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'

      document.documentElement.style.position = 'fixed'
      document.documentElement.style.width = '100%'

      document.body.setAttribute('data-scroll-position', scrollY.toString())
    } else {
      const scrollY = parseInt(
        document.body.getAttribute('data-scroll-position') || '0',
        10,
      )

      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.documentElement.style.position = ''
      document.documentElement.style.width = ''

      window.scrollTo(0, scrollY)
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.documentElement.style.position = ''
      document.documentElement.style.width = ''
    }
  }, [isOpen])

  return (
    <motion.nav
      className="fixed inset-0 z-[60] block w-full transition-all lg:hidden"
      animate={{
        height: isOpen ? '100%' : '80px',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        backgroundColor: finalBackgroundColor,
        WebkitBackdropFilter: finalBackdropFilter,
        backdropFilter: finalBackdropFilter,
      }}
    >
      <div className="flex items-center justify-between p-5">
        <Link href="/" className="text-white-95">
          <Logo className="h-10" />
        </Link>
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ButtonLink href="/" variant="secondary">
                  Buy Keycard
                </ButtonLink>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            className="rounded-12 border border-white-12 bg-white-8 text-white-95 transition-colors hover:bg-white-12"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuIcon isOpen={isOpen} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100% - 80px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-20 z-50 overflow-hidden"
          >
            <motion.div
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
              className="flex h-full flex-col items-center justify-center pt-[200px]"
            >
              <ul className="flex flex-1 flex-col gap-4">
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + 3 * 0.05, duration: 0.3 }}
                  className="pt-2 text-center"
                >
                  <ButtonLink href="/">Buy Keycard</ButtonLink>
                </motion.li>
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + 4 * 0.05, duration: 0.3 }}
                className="divide grid w-full grid-cols-2 divide-x divide-dashed divide-white-12 border-t border-dashed border-white-12"
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
