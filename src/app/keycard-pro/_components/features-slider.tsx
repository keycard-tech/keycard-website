'use client'

import { Arrow } from '~icons'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

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

const CARD_WIDTH = 320 + 24

const FeaturesSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [visibleItemsCount, setVisibleItemsCount] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateVisibleItemsCount = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const itemsInView = Math.floor(containerWidth / CARD_WIDTH)
      setVisibleItemsCount(itemsInView)
    }
  }, [])

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return
    const scrollPosition = index * CARD_WIDTH
    containerRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    })
    setSelectedIndex(index)
  }

  const handlePrev = () => {
    if (selectedIndex > 0) {
      scrollToIndex(selectedIndex - 1)
    }
  }

  const handleNext = () => {
    if (selectedIndex < features.length - visibleItemsCount) {
      scrollToIndex(selectedIndex + 1)
    }
  }

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    const scrollLeft = containerRef.current.scrollLeft
    const newIndex = Math.round(scrollLeft / CARD_WIDTH)
    if (newIndex !== selectedIndex) {
      setSelectedIndex(newIndex)
    }
  }, [selectedIndex])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, {
        passive: true,
      })
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, selectedIndex])

  useEffect(() => {
    updateVisibleItemsCount()
    window.addEventListener('resize', updateVisibleItemsCount, {
      passive: true,
    })
    return () => window.removeEventListener('resize', updateVisibleItemsCount)
  }, [updateVisibleItemsCount])

  return (
    <section className="relative pt-[200px]">
      <div className="flex items-center justify-between">
        <h2 className="mb-6 max-w-[665px] px-20 font-lora text-32 text-white-95">
          Powered by KeycardOS
        </h2>
        <div className="flex items-center gap-3 pr-20">
          <button
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            className="rounded-12 border border-white-12 bg-white-8 p-[10px] text-white-95 opacity-[100%] transition-all hover:text-white-100 disabled:opacity-[40%]"
          >
            <Arrow className="-scale-x-100 transform" />
          </button>
          <button
            onClick={handleNext}
            disabled={selectedIndex >= features.length - visibleItemsCount}
            className="rounded-12 border border-white-12 bg-white-8 p-[10px] text-white-95 opacity-[100%] transition-all hover:text-white-100 disabled:opacity-[40%]"
          >
            <Arrow />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory snap-center gap-6 overflow-x-auto px-20 pt-14 scrollbar-none"
        style={{ scrollBehavior: 'smooth' }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-[320px] flex-shrink-0 snap-center flex-col transition-opacity duration-300"
          >
            <div className="rounded-28 border border-white-8 bg-white-3 p-10">
              <Image
                src={feature.image}
                alt={feature.name}
                width={500}
                height={500}
              />
            </div>

            <div className="pb-5 pt-8 lg:pb-8">
              <p className="pb-6 text-left text-24 font-500 text-white-95">
                {feature.name}
              </p>
              <p className="text-16 font-300 text-white-60">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export { FeaturesSlider }
