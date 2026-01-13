'use client'

import { ChevronDownIcon } from '@status-im/icons/20'
import { Button } from '~components/button'
import * as Dialog from '~components/dialog'
import { useState } from 'react'
import Sidenav from './sidenav'

interface SidenavItem {
  title: string
  link?: string
  subItems?: SidenavItem[]
}

type Props = {
  items: SidenavItem[]
  title: string
  triggerLabel?: string
  className?: string
}

const DocsNavDrawer = ({
  items,
  title,
  triggerLabel = 'Browse',
  className,
}: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="secondary" className={`gap-2 ${className ?? ''}`}>
          {triggerLabel}
          <ChevronDownIcon
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] bg-dark-100 p-0 outline-none">
        <div className="flex items-center justify-between border-b border-white-12 p-4">
          <Dialog.Title className="font-lora text-20 text-white-95">
            {title}
          </Dialog.Title>
          <Dialog.Close asChild>
            <Button variant="secondary" className="px-3">
              Close
            </Button>
          </Dialog.Close>
        </div>
        <div className="h-[calc(100%-64px)] overflow-y-auto">
          <Sidenav
            items={items}
            className="w-full border-r-0 px-4 pb-6 pt-4"
            onNavigate={() => setOpen(false)}
          />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { DocsNavDrawer }
