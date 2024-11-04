'use client'

import { Arrow } from '~icons'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

const features = [
  {
    name: 'Full visibility of seed phrase',
    description:
      'All the words clearly numbered and visible, ready for you to write them down.',
    image: '/assets/keycard-pro/keycard-pro-feature-card-1.png',
  },
  {
    name: 'Human readable tx data',
    description: 'Get a clear understanding of what you’re actually signing.',
    image: '/assets/keycard-pro/keycard-pro-feature-card-2.png',
  },
  {
    name: 'Secure PIN for each card',
    description:
      'Switch your card, enter your pin, and you’re ready to sign a transaction.',
    image: '/assets/keycard-pro/keycard-pro-feature-card-3.png',
  },
  {
    name: 'Compatible QR wallets',
    description:
      'Its embedded camera allows Keycard Pro to be used fully airgapped.',
    image: '/assets/keycard-pro/keycard-pro-feature-card-4.png',
  },
  {
    name: 'Block USB data transfer',
    description:
      'Add an extra layer of security by preventing unwanted data transfers.',
    image: '/assets/keycard-pro/keycard-pro-feature-card-5.png',
  },
  {
    name: 'Name your cards',
    description: 'Easily identify your cards by giving them a unique name.',
    image: '/assets/keycard-pro/keycard-pro-feature-card-6.png',
  },
]

const FeaturesSlider = () => {
  const options: EmblaOptionsType = {
    align: 'start',
    containScroll: false,
    dragFree: true,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    WheelGesturesPlugin(),
  ])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
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
    <div className="relative w-full pt-[200px]">
      <div className="flex items-center justify-between">
        <h2 className="max-w-[665px] px-20 font-lora text-32 text-white-95">
          Running on open source software{' '}
        </h2>
        <div className="flex items-center gap-3 pr-20">
          <button
            className="rounded-12 border border-white-12 bg-white-8 p-[10px] text-white-95 opacity-[100%] transition-all hover:text-white-100 disabled:opacity-[40%]"
            disabled={!prevBtnEnabled}
            onClick={scrollPrev}
          >
            <Arrow className="-scale-x-100 transform" />
          </button>
          <button
            className="rounded-12 border border-white-12 bg-white-8 p-[10px] text-white-95 opacity-[100%] transition-all hover:text-white-100 disabled:opacity-[40%]"
            disabled={!nextBtnEnabled}
            onClick={scrollNext}
          >
            <Arrow />
          </button>
        </div>
      </div>
      <div className="relative w-full px-20 pt-14" ref={emblaRef}>
        <div className="flex justify-start gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%] select-none sm:flex-[0_0_50%] lg:flex-[0_0_320px]"
            >
              <div className="rounded-28 border border-white-8 bg-white-3 p-10">
                <Image
                  src={feature.image}
                  alt={feature.name}
                  width={500}
                  height={500}
                />
              </div>
              <div className="pt-8">
                <p className="pb-[6px] text-left text-24 font-500 text-white-95">
                  {feature.name}
                </p>
                <p className="text-16 font-300 text-white-60">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { FeaturesSlider }
