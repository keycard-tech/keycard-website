'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { cx } from 'cva'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  items: Array<{
    title: string
    description: string
    image: string
    icons?: Array<string>
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
const TIME_INTERVAL = 3000
const TIME_INTERVAL_STEP = 50

const FeaturesAccordion = (props: Props) => {
  const { items } = props
  const [value, setValue] = useState(items[0].title)
  const [width, setWidth] = useState(0)

  const selected = items.find(item => item.title === value)!

  // Make the accordion change the selected item with a time interval of 5 seconds
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

  console.log('Width: ', width)

  return (
    <div className="flex w-full flex-1 items-center justify-between px-[84px]">
      <div
        className={cx([
          'flex flex-col items-center justify-center gap-12 xl:flex-row',
        ])}
      >
        <Accordion.Root
          type="single"
          value={value}
          onValueChange={val => {
            setValue(val)
          }}
          className="flex flex-col gap-5 pt-24 xl:flex-1 xl:gap-5 xl:pt-0"
        >
          {items.map(item => {
            const isOpen = value === item.title

            return (
              <Accordion.Item key={item.title} value={item.title}>
                <Accordion.Trigger disabled={isOpen}>
                  <div className="relative flex items-center justify-center">
                    <p
                      className={cx(
                        'open:bg-white-40',
                        'pb-6 text-left font-lora text-32 font-500',
                        !isOpen && 'hover:opacity-[50%]',
                      )}
                    >
                      {item.title}
                    </p>
                  </div>
                </Accordion.Trigger>
                <Accordion.Content>
                  <div className="pb-5 pt-1 lg:pb-8">
                    <p className="text-20 font-300 text-white-60">
                      {item.description}
                    </p>
                    {item.icons && (
                      <div className="flex gap-4 pt-4">
                        {item.icons.map((icon, index) => (
                          <Image
                            key={index}
                            src={icon}
                            width={24}
                            height={24}
                            alt="icon"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Accordion.Content>

                <div className="relative w-full">
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
        <div className="w-full flex-1 p-6 2xl:py-12">
          <Image
            src={selected.image}
            width={664}
            height={746}
            alt={selected.title}
            className="w-full max-w-[664px]"
          />
        </div>
      </div>
    </div>
  )
}

export { FeaturesAccordion }
export type { Props as FeaturesAccordionProps }
