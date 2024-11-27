'use client'

import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { DownloadStatusForDesktop } from './download-status-for-desktop'
import { FeaturesDisclaimer } from './features-disclaimer'

type Props = {
  items: Array<{
    title: string
    description: React.ReactNode | string
    imageMobile: string
    tag?: string
  }>
}

const FeaturesSliderDesktop = (props: Props) => {
  const { items } = props

  const options: EmblaOptionsType = {
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    WheelGesturesPlugin(),
  ])
  const [selected, setSelected] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()

    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative block lg:hidden">
      <div className="relative z-20 w-full overflow-clip" ref={emblaRef}>
        <div className="flex justify-start gap-0">
          {items.map((feature, index) => {
            const isSelected = selected === index

            const translateX = isSelected ? 0 : 250

            return (
              <div key={index} className="z-20 min-w-[calc(100vw-40px)] px-2">
                <div className="mx-auto flex h-[80svh] flex-col overflow-clip rounded-[32px] border border-white-12 bg-white-3 px-6 py-5">
                  <div>
                    <p className="pb-[6px] text-left font-lora text-24 font-500 text-white-95">
                      {feature.title}
                    </p>
                    <p className="text-16 font-300 text-white-60">
                      {feature.description}
                    </p>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isSelected ? 1 : 0,
                      x: translateX,
                      y: -40,
                      scale: isSelected ? 1 : 0.8,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.32, 0.72, 0, 1],
                      opacity: { duration: 0.4 },
                    }}
                  >
                    <Image
                      src={feature.imageMobile}
                      alt={feature.title}
                      width={2358}
                      height={1871}
                      priority
                      className="max-w-[calc(70vh*1.26)] translate-x-[-20%]"
                    />
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="px-2">
        <FeaturesDisclaimer />
        <DownloadStatusForDesktop className="mt-8 max-w-full" />
      </div>
    </div>
  )
}

export { FeaturesSliderDesktop }
