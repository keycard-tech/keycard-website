'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronRightIcon } from '@status-im/icons/20'
import { SUPPORTED_LOCALES } from '~/i18n/constants'
import { Link } from '~components/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { decodeUriComponent } from './_utils/decode-uri-component'

interface SidenavItem {
  title: string
  link?: string
  subItems?: SidenavItem[]
}

interface SidenavProps {
  items: SidenavItem[]
}

const Sidenav: React.FC<SidenavProps> = ({ items }) => {
  const [label, setLabel] = useState<string>()
  const pathname = usePathname()
  const normalizedPathname = useMemo(() => {
    const decoded = decodeUriComponent(pathname)
    const segments = decoded.split('/')
    const maybeLocale = segments[1]
    if (
      SUPPORTED_LOCALES.includes(
        maybeLocale as (typeof SUPPORTED_LOCALES)[number],
      )
    ) {
      const rest = segments.slice(2).join('/')
      return rest ? `/${rest}` : '/'
    }
    return decoded
  }, [pathname])

  useEffect(() => {
    const match = items.find(
      item =>
        (item.link && item.link === normalizedPathname) ||
        item.subItems?.find(link => link.link === normalizedPathname) ||
        (item.link && normalizedPathname.startsWith(item.link)), // fallback, leaves root item open
    )

    if (!match) {
      return
    }

    setLabel(match.title)
  }, [normalizedPathname, items])

  return (
    <nav className="flex w-[255px] flex-col items-start justify-start border-r border-white-12 p-6">
      <Accordion.Root
        type="single"
        collapsible
        value={label}
        onValueChange={value => setLabel(value)}
        className="flex flex-col items-start justify-start gap-2"
      >
        {items.map(item => {
          if (item.subItems) {
            return <SidenavItem key={item.link || item.title} {...item} />
          }

          return (
            <Accordion.Item key={item.title} value={item.title}>
              {item.link ? (
                <Link
                  href={item.link}
                  className="block pl-[22px] text-16 font-500 text-white-95 transition-colors hover:text-white-60 aria-[current=true]:text-orange hover:aria-[current=true]:text-orange-dark"
                  aria-current={normalizedPathname === item.link}
                  onClick={() => setLabel(undefined)}
                >
                  {item.title}
                </Link>
              ) : (
                <span className="block pl-[22px] text-16 font-500 text-white-95">
                  {item.title}
                </span>
              )}
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </nav>
  )
}

type SidenavItemProps = {
  title: string
  link?: string
  subItems?: SidenavItem[]
}

const SidenavItem = (props: SidenavItemProps) => {
  const { title, link, subItems } = props
  const pathname = usePathname()
  const normalizedPathname = useMemo(() => {
    const decoded = decodeUriComponent(pathname)
    const segments = decoded.split('/')
    const maybeLocale = segments[1]
    if (
      SUPPORTED_LOCALES.includes(
        maybeLocale as (typeof SUPPORTED_LOCALES)[number],
      )
    ) {
      const rest = segments.slice(2).join('/')
      return rest ? `/${rest}` : '/'
    }
    return decoded
  }, [pathname])

  return (
    <Accordion.Item value={title}>
      <div>
        <Accordion.Header className="flex">
          <Accordion.Trigger asChild aria-label={`Toggle ${title} section`}>
            {link ? (
              <Link
                href={link}
                className="group flex items-center gap-0.5 font-500 text-white-95 transition-colors hover:text-white-60 aria-[current=true]:text-orange hover:aria-[current=true]:text-orange-dark"
                aria-current={normalizedPathname === link}
              >
                <div className="transition-transform group-aria-expanded:rotate-90">
                  <ChevronRightIcon />
                </div>
                <span className="shrink-0">{title}</span>
              </Link>
            ) : (
              <button
                type="button"
                className="group flex items-center gap-0.5 font-500 text-white-95 transition-colors hover:text-white-60"
              >
                <div className="transition-transform group-aria-expanded:rotate-90">
                  <ChevronRightIcon />
                </div>
                <span className="shrink-0">{title}</span>
              </button>
            )}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden">
          <div className="overflow-hidden pl-[22px]">
            {subItems &&
              subItems.length > 0 &&
              subItems.map(subItem => {
                return (
                  <div key={subItem.link} className="pt-2 first:pt-5 last:pb-8">
                    {subItem.link ? (
                      <Link
                        href={subItem.link}
                        className="block text-14 font-500 text-white-95 transition-colors hover:text-white-60 aria-[current=true]:text-orange hover:aria-[current=true]:text-orange-dark"
                        aria-current={normalizedPathname === subItem.link}
                      >
                        {subItem.title}
                      </Link>
                    ) : (
                      <span className="block text-14 font-500 text-white-60">
                        {subItem.title}
                      </span>
                    )}
                  </div>
                )
              })}
          </div>
        </Accordion.Content>
      </div>
    </Accordion.Item>
  )
}

export default Sidenav
