'use client'

import { useMobileOperatingSystem } from '~/app/_hooks/use-mobile-operating-system'
import {
  STATUS_MOBILE_APP_STORE_URL,
  STATUS_MOBILE_F_DROID_URL,
  STATUS_MOBILE_GOOGLE_PLAY_URL,
} from '~/config/routes'
import { FeaturesDisclaimer } from '~components/features-disclaimer'
import { Image } from '~components/image'
import { Link } from '~components/link'
import { match } from 'ts-pattern'

type Props = {
  items: Array<{
    title: string
    description: React.ReactNode | string
    imageMobile: string
    tag?: string
  }>
}

const FeaturesSliderMobile = (props: Props) => {
  const { items } = props

  const mobileOS = useMobileOperatingSystem()

  return (
    <div className="relative -mr-2 block lg:hidden">
      <div className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none">
        <Image
          src="/assets/keycard/slider/card.png"
          alt="Card"
          width={851}
          height={430}
          className="absolute left-1/2 top-1/3 max-w-[200vw] -translate-y-1/4 translate-x-[-43%]"
        />

        {items.map((feature, index) => (
          <div key={index} className="min-w-[calc(100vw-40px)] snap-start px-2">
            <div className="mx-auto flex h-full flex-col rounded-[32px] border border-white-12 bg-white-4 px-6 py-5">
              <div>
                <p className="pb-[6px] text-left font-lora text-24 font-500 text-white-95">
                  {feature.title}
                </p>
                <p className="text-16 font-300 text-white-60">
                  {feature.description}
                </p>
              </div>
              <div className="z-10 rounded-28 pt-10">
                <Image
                  src={feature.imageMobile}
                  alt={feature.title}
                  width={1125}
                  height={200}
                  priority
                  className="mx-auto w-full max-w-[350px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden w-full px-2 pt-8 lg:block lg:max-w-[549px] lg:pt-20">
        <FeaturesDisclaimer />
      </div>
      {mobileOS && (
        <div className="mt-14 flex w-full max-w-[549px] flex-col gap-6 rounded-28 border border-white-8 bg-white-4 p-6 pt-5">
          <div className="flex flex-col gap-[6px]">
            <p className="font-lora text-24 font-400 text-white-95">
              Download Status for mobile
            </p>
            <p className="font-300 text-white-80">
              Available for iOS or Android
            </p>
          </div>

          <div className="flex gap-3">
            {match(mobileOS)
              .with('ios', () => (
                <Link href={STATUS_MOBILE_APP_STORE_URL}>
                  <Image
                    src="/assets/keycard/appstore.png"
                    width={140}
                    height={40}
                    alt="Download on App Store"
                    className="h-10 w-auto"
                  />
                </Link>
              ))
              .with('android', () => (
                <>
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
                </>
              ))
              .exhaustive()}
          </div>
        </div>
      )}
    </div>
  )
}

export { FeaturesSliderMobile }
