'use client'

import * as Accordion from '@radix-ui/react-accordion'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { downloadUrl } from '~/app/_utils/download-url'
import {
  STATUS_DESKTOP_DOWNLOAD_URL_LINUX,
  STATUS_DESKTOP_DOWNLOAD_URL_MACOS_INTEL,
  STATUS_DESKTOP_DOWNLOAD_URL_MACOS_SILICON,
  STATUS_DESKTOP_DOWNLOAD_URL_WINDOWS,
  STATUS_MOBILE_APP_STORE_URL,
  STATUS_MOBILE_F_DROID_URL,
  STATUS_MOBILE_GOOGLE_PLAY_URL,
} from '~/config/routes'
import { Button } from '~components/button'
import { Link } from '~components/link'
import { Apple, ChevronDown, Customize, Linux, Usb, Windows } from '~icons'
import { cx } from 'cva'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { match } from 'ts-pattern'
import { FeaturesDialog } from './features-dialog'

type Props = {
  items: Array<{
    title: string
    description: React.ReactNode | string
    image: string
    tag?: string
  }>
  imageClassName?: string
  variant: 'desktop' | 'mobile'
}

const LineDivider = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="944" height="2">
    <path
      stroke="currentColor"
      strokeDasharray="3 4"
      strokeLinecap="round"
      d="M1 1h944"
    />
  </svg>
)

const useAutoSwitch = (
  items: Array<{ title: string }>,
  interval: number,
  step: number,
) => {
  const [value, setValue] = useState(items[0].title)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    let counter = 0

    const timer = setInterval(() => {
      if (counter >= interval) {
        counter = 0
        setWidth(0)
        const index = items.findIndex(item => item.title === value)
        setValue(items[(index + 1) % items.length].title)
      } else {
        counter += step
        setWidth((counter * 100) / interval)
      }
    }, step)

    return () => clearInterval(timer)
  }, [items, value, interval, step])

  return { value, setValue, width }
}

const FeaturesAccordion = (props: Props) => {
  const { items, imageClassName, variant } = props
  const { value, setValue, width } = useAutoSwitch(items, 16000, 50)

  const selected = items.find(item => item.title === value)!

  return (
    <div className="hidden items-center justify-between lg:flex">
      <div
        className={cx([
          'flex flex-1 items-start justify-center gap-6 xl:gap-0',
        ])}
      >
        <div className="flex flex-1 flex-col items-start">
          <Accordion.Root
            type="single"
            value={value}
            collapsible
            onValueChange={setValue}
            className="flex w-full max-w-[549px] flex-col gap-0 pt-24 lg:flex-1 lg:pt-0"
          >
            {items.map(item => {
              const isOpen = value === item.title

              return (
                <Accordion.Item key={item.title} value={item.title}>
                  <Accordion.Header>
                    <Accordion.Trigger disabled={isOpen} className="w-full">
                      <div className="group relative flex items-center gap-2 py-5">
                        <p
                          className={cx(
                            'flex items-center text-left font-lora text-32 font-500 transition-opacity',
                            !isOpen && 'group-hover:opacity-[50%]',
                          )}
                        >
                          {item.title}
                        </p>
                        {item.tag && (
                          <span className="mt-2 rounded-[32px] border border-dark-8 bg-white-95 px-2 py-0.5 text-12 font-500 text-dark-100">
                            {item.tag}
                          </span>
                        )}
                      </div>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content
                    className={cx(
                      '-translate-y-5 overflow-hidden text-16 font-300 text-white-80 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
                    )}
                  >
                    <div className="pt-1">
                      <p className="text-16 font-300 text-white-60">
                        {item.description}
                      </p>
                    </div>
                  </Accordion.Content>

                  <div className="relative w-full">
                    <div
                      className="absolute left-0 top-0 z-[2] h-px bg-orange text-white-100 transition-opacity duration-500"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        width: `${width}%`,
                      }}
                    />
                    <div className="absolute left-0 top-0 z-[1] w-full overflow-hidden text-white-20">
                      <LineDivider />
                    </div>
                  </div>
                </Accordion.Item>
              )
            })}
          </Accordion.Root>
          <div className="mt-20 flex items-center justify-center gap-2 rounded-16 border border-dashed border-white-12 bg-white-3 px-4 py-[14px]">
            <div className="flex items-center gap-1">
              <Usb />
              <p className="text-14 font-300 text-white-60">
                Desktop requires an NFC card reader
              </p>
            </div>
            <div className="size-1 rounded-full bg-white-40" />
            <div className="flex items-center gap-1">
              <Customize />
              <p className="text-14 font-300 text-white-60">
                View other{' '}
                <FeaturesDialog>
                  <button className="underline transition-colors hover:text-orange">
                    features
                  </button>
                </FeaturesDialog>{' '}
                availalble
              </p>
            </div>
          </div>
        </div>
        {match(variant)
          .with('desktop', () => (
            <DownloadStatusForDesktop
              image={selected.image}
              title={selected.title}
              className={imageClassName}
            />
          ))
          .with('mobile', () => (
            <DownloadStatusForMobile
              image={selected.image}
              title={selected.title}
              className={imageClassName}
            />
          ))
          .exhaustive()}
      </div>
    </div>
  )
}

export { FeaturesAccordion }
export type { Props as FeaturesAccordionProps }

type DownloadStatusForMobileProps = {
  image: string
  className?: string
  title: string
}

const DownloadStatusForMobile = (props: DownloadStatusForMobileProps) => {
  const { image, className, title } = props
  return (
    <div className="relative flex flex-1 flex-col items-end self-end">
      <Image
        src={image}
        width={1565}
        height={2148}
        alt={title}
        className={className}
      />
      <div className="mt-20 flex w-full max-w-[549px] flex-col gap-6 rounded-28 border border-white-8 bg-white-3 p-6 pt-5">
        <div className="flex flex-col gap-[6px]">
          <p className="font-lora text-24 font-400 text-white-95">
            Download Status for Mobile
          </p>
          <p className="font-300 text-white-80">Available for iOS or Android</p>
        </div>

        <div className="flex gap-3">
          <Link href={STATUS_MOBILE_APP_STORE_URL}>
            <Image
              src="/assets/keycard/appstore.png"
              width={140}
              height={40}
              alt="Download on App Store"
              className="h-10 w-auto"
            />
          </Link>
          <Link href={STATUS_MOBILE_GOOGLE_PLAY_URL}>
            <Image
              src="/assets/keycard/googleplay.png"
              width={142}
              height={40}
              className="h-10 w-auto"
              alt="Get it on Google Play"
            />
          </Link>
          <Link href={STATUS_MOBILE_F_DROID_URL}>
            <Image
              src="/assets/keycard/fdroid.png"
              width={120}
              height={40}
              className="h-10 w-auto"
              alt="Get it on F-Droid"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

type DownloadStatusForDesktopProps = {
  image: string
  className?: string
  title: string
}

const DownloadStatusForDesktop = (props: DownloadStatusForDesktopProps) => {
  const { image, className, title } = props

  return (
    <div className="relative flex flex-1 flex-col items-end self-end">
      <Image
        src={image}
        width={1124}
        height={716}
        alt={title}
        className={className}
      />
      <div className="mt-20 flex w-full max-w-[549px] flex-col gap-6 rounded-28 border border-white-8 bg-white-3 p-6 pt-5">
        <div className="flex flex-col gap-[6px]">
          <p className="font-lora text-24 font-400 text-white-95">
            Download Status for Desktop
          </p>
          <p className="font-300 text-white-80">
            Available for Mac, Windows and Linux
          </p>
        </div>
        <div className="flex h-10 gap-3">
          <MacOsPicker />
          <Button
            variant="secondary"
            className="!p-[10px]"
            onClick={() => downloadUrl(STATUS_DESKTOP_DOWNLOAD_URL_WINDOWS)}
          >
            <Windows />
          </Button>
          <Button
            variant="secondary"
            className="!p-[10px]"
            onClick={() => downloadUrl(STATUS_DESKTOP_DOWNLOAD_URL_LINUX)}
          >
            <Linux />
          </Button>
        </div>
      </div>
    </div>
  )
}

const MacOsPicker = () => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild className="">
        <Button
          variant="secondary"
          icon={
            <div className="ml-1 flex size-[14px] items-center justify-center rounded-full bg-white-12">
              <ChevronDown />
            </div>
          }
        >
          <Apple /> Download for macOS
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={4}
          align="start"
          className="flex w-[225px] flex-col gap-1 rounded-12 border border-white-12 bg-dark-60 p-1"
        >
          <DropdownMenu.Item
            className="cursor-pointer rounded-[8px] bg-white-3 px-3 py-1 transition-colors hover:bg-white-8"
            onSelect={() =>
              downloadUrl(STATUS_DESKTOP_DOWNLOAD_URL_MACOS_SILICON)
            }
          >
            Apple Silicon
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="cursor-pointer rounded-[8px] bg-white-3 px-3 py-1 transition-colors hover:bg-white-8"
            onSelect={() =>
              downloadUrl(STATUS_DESKTOP_DOWNLOAD_URL_MACOS_INTEL)
            }
          >
            Intel
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
