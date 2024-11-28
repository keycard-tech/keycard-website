'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { cx } from 'cva'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { match } from 'ts-pattern'
import { DownloadStatusForDesktop } from './download-status-for-desktop'
import { DownloadStatusForMobile } from './download-status-for-mobile'
import { FeaturesDisclaimer } from './features-disclaimer'

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
                      className="absolute left-0 top-[0.5px] z-[2] h-px rounded-[2px] bg-orange text-white-100 transition-opacity duration-500"
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
          <FeaturesDisclaimer />
        </div>
        {match(variant)
          .with('desktop', () => (
            <div className="relative flex flex-1 flex-col items-end self-end">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                >
                  <Image
                    src={selected.image}
                    width={1124}
                    height={716}
                    alt={selected.title}
                    className={imageClassName}
                    quality={75}
                  />
                </motion.div>
              </AnimatePresence>

              <DownloadStatusForDesktop className="mt-20" />
            </div>
          ))
          .with('mobile', () => (
            <div className="relative flex flex-1 flex-col items-end self-end">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                >
                  <Image
                    src={selected.image}
                    width={1124}
                    height={716}
                    alt={selected.title}
                    className={imageClassName}
                    quality={75}
                  />
                </motion.div>
              </AnimatePresence>

              <DownloadStatusForMobile className="mt-20" />
            </div>
          ))
          .exhaustive()}
      </div>
    </div>
  )
}

export { FeaturesAccordion }
export type { Props as FeaturesAccordionProps }
