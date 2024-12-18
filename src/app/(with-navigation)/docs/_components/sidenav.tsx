'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronRightIcon } from '@status-im/icons/20'
import { Link } from '~components/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { decodeUriComponent } from '../_utils/decode-uri-component'

interface SidenavItem {
  title: string
  link: string
  subItems?: SidenavItem[]
}

interface SidenavProps {
  items: SidenavItem[]
}

const Sidenav: React.FC<SidenavProps> = ({ items }) => {
  const [label, setLabel] = useState<string>()
  const pathname = usePathname()

  useEffect(() => {
    const match = items.find(
      item =>
        item.link === decodeUriComponent(pathname) ||
        item.subItems?.find(
          link => link.link === decodeUriComponent(pathname),
        ) ||
        decodeUriComponent(pathname).startsWith(item.link), // fallback, leaves root item open
    )

    if (!match) {
      return
    }

    setLabel(match.title)
  }, [pathname, items])

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
            return <SidenavItem key={item.link} {...item} />
          }

          return (
            <Accordion.Item key={item.title} value={item.title}>
              <Link
                href={item.link}
                className="pl-[22px] text-16 font-500 text-white-95 transition-colors hover:text-white-60 aria-[current=true]:text-orange hover:aria-[current=true]:text-orange-dark"
                aria-current={pathname === item.link}
                onClick={() => setLabel(undefined)}
              >
                {item.title}
              </Link>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </nav>
  )
}

type SidenavItemProps = {
  title: string
  link: string
  subItems?: SidenavItem[]
}

const SidenavItem = (props: SidenavItemProps) => {
  const { title, link, subItems } = props
  const pathname = usePathname()

  return (
    <Accordion.Item value={title}>
      <div>
        <div className="flex gap-0.5">
          <Accordion.Trigger
            className="group flex items-center gap-0.5"
            aria-label={`Toggle ${title} section`}
          >
            <div className="transition-transform group-aria-expanded:rotate-90">
              <ChevronRightIcon />
            </div>
          </Accordion.Trigger>
          <Link
            href={link}
            className="flex shrink-0 font-500 text-white-95 transition-colors hover:text-white-60 aria-[current=true]:text-orange hover:aria-[current=true]:text-orange-dark"
            aria-current={pathname === link}
          >
            {title}
          </Link>
        </div>
        <Accordion.Content className="overflow-hidden">
          <div className="overflow-hidden pl-[22px]">
            {subItems &&
              subItems.length > 0 &&
              subItems.map(subItem => {
                return (
                  <div key={subItem.link} className="pt-2 first:pt-5 last:pb-8">
                    <Link
                      href={subItem.link}
                      className="text-14 font-500 text-white-95 transition-colors hover:text-white-60 aria-[current=true]:text-orange hover:aria-[current=true]:text-orange-dark"
                      aria-current={pathname === subItem.link}
                    >
                      {subItem.title}
                    </Link>
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
