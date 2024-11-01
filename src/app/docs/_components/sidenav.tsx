'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Link } from '~components/link'
import { useState } from 'react'
import { IconChevronRight } from './icon-chevron-right'

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

  return (
    <nav className="flex w-[220px] flex-col items-start justify-start border-r border-white-12 px-8 py-6">
      <Accordion.Root
        type="single"
        collapsible
        value={label}
        onValueChange={value => setLabel(value)}
        className="flex flex-col items-start justify-start gap-3"
      >
        {items.map(item => {
          if (item.subItems) {
            return <SidenavItem key={item.link} {...item} />
          }

          return (
            <Accordion.Item key={item.title} value={item.title}>
              <Accordion.Trigger onClick={() => setLabel(item.title)}>
                <Link href={item.link}>{item.title}</Link>
              </Accordion.Trigger>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </nav>
  )
}

type SidenavItemProps = {
  title: string
  subItems?: SidenavItem[]
}

const SidenavItem = (props: SidenavItemProps) => {
  const { title, subItems } = props

  return (
    <Accordion.Item value={title}>
      <div>
        <Accordion.Trigger className="group flex w-full items-center gap-0.5">
          <div className="transition-transform group-aria-expanded:rotate-90">
            <IconChevronRight />
          </div>
          {title}
        </Accordion.Trigger>
        <Accordion.Content className="data-[state=closed]:animate-accordion-hide data-[state=open]:animate-accordion-reveal overflow-hidden">
          <div className="overflow-hidden pl-[22px]">
            {subItems &&
              subItems.length > 0 &&
              subItems.map(subItem => {
                return (
                  <div
                    key={subItem.link}
                    className="pt-2 transition-opacity first:pt-5 last:pb-5 hover:opacity-[50%]"
                  >
                    <Link href={subItem.link}>{subItem.title}</Link>
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
