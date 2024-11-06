'use client'

import Image from 'next/image'

type Props = {
  items: Array<{
    title: string
    description: string
    imageMobile: string
    tokens?: string
    tag?: string
  }>
}

const FeaturesSlider = (props: Props) => {
  const { items } = props

  return (
    <div className="relative block pt-14 lg:hidden">
      <div className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none">
        <Image
          src="/assets/keycard/slider/card.png"
          alt="left arrow"
          width={851}
          height={430}
          className="absolute right-0 top-1/2 z-10 max-w-[calc(200vw)] -translate-y-1/2 translate-x-1/3"
        />

        {items.map((feature, index) => (
          <div
            key={index}
            className="z-20 min-w-[calc(100vw-40px)] snap-start px-2"
          >
            <div className="mx-auto flex flex-col rounded-[32px] border border-white-12 bg-white-3 px-6 py-5">
              <div>
                <p className="pb-[6px] text-left font-lora text-24 font-500 text-white-95">
                  {feature.title}
                </p>
                <p className="text-16 font-300 text-white-60">
                  {feature.description}
                </p>
                {feature.tokens && (
                  <div className="flex gap-4 pt-4">
                    <Image
                      alt="Tokens"
                      src={feature.tokens}
                      width={265}
                      height={32}
                    />
                  </div>
                )}
              </div>
              <div className="rounded-28">
                <Image
                  src={feature.imageMobile}
                  alt={feature.title}
                  width={489}
                  height={791}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { FeaturesSlider }
