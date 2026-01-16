'use client'

import { DownloadStatusForDesktop } from '~components/download-status-for-desktop'
import { FeaturesDisclaimer } from '~components/features-disclaimer'
import { Image } from '~components/image'

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

  return (
    <div className="relative block lg:hidden">
      <div className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none">
        {items.map((feature, index) => {
          return (
            <div
              key={index}
              className="z-20 min-w-[calc(100vw-40px)] snap-start px-2"
            >
              <div className="mx-auto flex h-[80svh] flex-col overflow-clip rounded-[32px] border border-white-12 bg-white-4 px-6 py-5">
                <div>
                  <p className="pb-[6px] text-left font-lora text-24 font-500 text-white-95">
                    {feature.title}
                  </p>
                  <p className="text-16 font-300 text-white-60">
                    {feature.description}
                  </p>
                </div>

                <Image
                  src={feature.imageMobile}
                  alt={feature.title}
                  width={2358}
                  height={1871}
                  priority
                  className="max-w-[calc(70vh*1.26)] translate-x-[-20%]"
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="w-full px-2 pt-8 lg:max-w-[549px] lg:pt-20">
        <FeaturesDisclaimer />
        <DownloadStatusForDesktop className="mt-8" />
      </div>
    </div>
  )
}

export { FeaturesSliderDesktop }
