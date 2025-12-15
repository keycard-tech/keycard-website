'use client'

import { getShopifyUrl } from '~/config/routes'
import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import { Image } from '~components/image'
import { useLocale } from 'next-intl'

const Keycards = () => {
  const locale = useLocale()
  const keycardUrl = getShopifyUrl(locale, '/pages/keycard')
  return (
    <section className="relative mx-auto mt-[120px] min-h-[490px] max-w-[1352px] overflow-clip rounded-28 border border-white-12 lg:mt-0 lg:min-h-[840px]">
      <Image
        src="/assets/keycard-shell/bg-keycards.png"
        alt="Keycards scattered around"
        className="absolute left-0 top-0 size-full object-cover"
        width={2704}
        height={1680}
      />

      <div className="relative z-10 pt-12 text-center lg:pt-20">
        <p className="font-lora text-32 text-white-95">
          Many use cases,
          <br />
          multiple Keycards.
        </p>

        <div className="flex items-center justify-center gap-4 pt-8">
          <BuyKeycardDialog>
            <Button
              variant="primary"
              data-umami-event="buy-keycard"
              data-umami-event-page="shell"
              data-umami-event-section="keycards"
              data-umami-event-element="button"
            >
              Buy Keycard
            </Button>
          </BuyKeycardDialog>
          <ButtonLink href={keycardUrl} variant="secondary">
            Learn more
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

export { Keycards }
