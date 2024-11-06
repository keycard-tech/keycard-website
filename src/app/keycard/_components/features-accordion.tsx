'use client'

import * as Accordion from '@radix-ui/react-accordion'
import {
  STATUS_MOBILE_APP_STORE_URL,
  STATUS_MOBILE_F_DROID_URL,
  STATUS_MOBILE_GOOGLE_PLAY_URL,
} from '~/config/routes'
import { Link } from '~components/link'
import { cx } from 'cva'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  items: Array<{
    title: string
    description: string
    image: string
    tokens?: string
    tag?: string
  }>
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

// Interval in milliseconds
const TIME_INTERVAL = 16000
const TIME_INTERVAL_STEP = 50

const FeaturesAccordion = (props: Props) => {
  const { items } = props
  const [value, setValue] = useState(items[0].title)
  const [width, setWidth] = useState(0)

  const selected = items.find(item => item.title === value)!

  // Make the accordion change the selected item with a time interval of TIME_INTERVAL value
  useEffect(() => {
    let counter = 0

    const interval = setInterval(() => {
      if (counter >= TIME_INTERVAL) {
        const index = items.findIndex(item => item.title === value)
        if (index === items.length - 1) {
          setValue(items[0].title)
        } else {
          setValue(items[index + 1].title)
        }
        counter = 0
        setWidth(0)
      } else {
        counter += TIME_INTERVAL_STEP
        // Calculate the width base on the counter.
        const newWidth = (counter * 100) / TIME_INTERVAL
        setWidth(newWidth)
      }
    }, TIME_INTERVAL_STEP)

    return () => clearInterval(interval)
  }, [items, value])

  return (
    <div className="flex flex-1 items-center justify-between pt-[60px]">
      <div
        className={cx([
          'flex flex-1 flex-col items-start justify-center xl:flex-row',
        ])}
      >
        <Accordion.Root
          type="single"
          value={value}
          collapsible
          onValueChange={val => {
            setValue(val)
          }}
          className="flex max-w-[549px] flex-col gap-0 pt-24 xl:flex-1 xl:pt-0"
        >
          {items.map(item => {
            const isOpen = value === item.title

            return (
              <Accordion.Item key={item.title} value={item.title}>
                <Accordion.Header className="flex">
                  <Accordion.Trigger disabled={isOpen}>
                    <div className="relative mt-5 flex items-center justify-center gap-2">
                      <p
                        className={cx(
                          'open:bg-white-40',
                          'flex items-center text-left font-lora text-32 font-500',
                          !isOpen && 'hover:opacity-[50%]',
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
                    'overflow-hidden text-16 font-300 text-white-80 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
                  )}
                >
                  <div className="pt-1">
                    <p className="text-16 font-300 text-white-60">
                      {item.description}
                    </p>
                    {item.tokens && (
                      <div className="flex gap-4 pt-4">
                        <Image
                          alt="Tokens"
                          src={item.tokens}
                          width={265}
                          height={32}
                        />
                      </div>
                    )}
                  </div>
                </Accordion.Content>

                <div className="relative mt-6 w-full">
                  <div
                    className="absolute left-0 top-0 z-[2] h-px bg-orange text-white-100"
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
        <div className="relative mt-[-35%] flex flex-1 flex-col items-end">
          <Image
            src={selected.image}
            width={664}
            height={746}
            alt={selected.title}
            className="w-full max-w-[664px] pb-20"
          />
          {/* TODO: Add desktop download version when design is ready */}
          <div className="flex w-full max-w-[549px] flex-col gap-6 rounded-28 border border-white-8 bg-white-3 p-6 pt-5">
            <div className="flex flex-col gap-[6px]">
              <p className="font-lora text-24 font-400 text-white-95">
                Download Status for Mobile
              </p>
              <p className="font-300 text-white-80">
                Available for iOS or Android
              </p>
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
      </div>
    </div>
  )
}

export { FeaturesAccordion }
export type { Props as FeaturesAccordionProps }
