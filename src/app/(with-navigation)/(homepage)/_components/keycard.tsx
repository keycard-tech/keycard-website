import { KEYCARD_PRODUCTS } from '~/app/_constants/shopify/products'
import { formatPrice } from '~/app/_utils/format-price'
import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import { Image } from '~components/image'
import { JsonLd } from '~components/json-ld'

const Keycard = () => {
  return (
    <section className="relative flex h-[calc(100svh-80px-70px)] flex-col justify-between overflow-clip rounded-b-28 border border-t-0 border-white-8 bg-white-4 px-0 pt-0 full-view-port sm:h-[calc(100svh-80px-48px)] lg:h-auto lg:flex-row lg:px-[72px] lg:py-20 lg:remove-full-view-port">
      <div className="hidden max-h-[350px] flex-1 items-start justify-center lg:flex">
        <Image
          alt="Keycard"
          src="/assets/hero-bg.png"
          width={1354}
          height={695}
          className="absolute right-1/2 top-0 w-auto object-cover"
          priority
        />
      </div>

      <Image
        alt="Keycard"
        src="/assets/hero-bg-mobile.png"
        width="900"
        height="600"
        className="absolute left-0 w-full lg:hidden"
        priority
      />

      <div className="relative z-10 flex max-w-[434px] flex-1 flex-col place-content-end px-5 lg:max-w-[500px] lg:pt-0">
        <p className="pb-2 text-24 font-600 text-white-95">keycard</p>
        <h1 className="flex pb-8 font-lora text-32 font-400 lg:pb-4 lg:text-48">
          Lightweight design
          <br />
          heavyweight security
        </h1>
        <p className="pb-8 text-20 font-300 text-white-80">
          Trade swiftly and safely back up your assets with Keycard hardware
          wallets.
        </p>
        <div className="flex space-x-4">
          <BuyKeycardDialog>
            <Button
              variant="primary"
              data-umami-event="buy-keycard"
              data-umami-event-page="homepage"
              data-umami-event-section="hero"
              data-umami-event-element="button"
            >
              Buy Keycard
            </Button>
          </BuyKeycardDialog>
          <ButtonLink
            href="https://get.keycard.tech/pages/keycard"
            variant="secondary"
          >
            Learn more
          </ButtonLink>
        </div>
        <p className="pb-8 pt-6 text-16 font-300 text-white-60 lg:pb-0">
          From{' '}
          {formatPrice({
            amount: KEYCARD_PRODUCTS.ONE_CARD_SET.price,
          })}
        </p>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Keycard',
          brand: { '@type': 'Brand', name: 'Keycard' },
          description:
            'A smart card with secure element for storing keys and transacting via NFC.',
          image: ['https://keycard.tech/assets/keycard/card.png'],
          sku: 'SKCR02',
          offers: {
            '@type': 'Offer',
            url: 'https://get.keycard.tech/pages/keycard',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'EUR',
            price: '25',
          },
        }}
      />
    </section>
  )
}

export { Keycard }
