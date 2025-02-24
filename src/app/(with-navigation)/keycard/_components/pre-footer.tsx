import { KEYCARD_PRODUCTS } from '~/app/_constants/shopify/products'
import { formatPrice } from '~/app/_utils/format-price'
import { Button } from '~components/button'
import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import { Image } from '~components/image'
import { cx } from 'cva'

const Prefooter = () => {
  return (
    <section className="relative flex flex-col px-6 full-view-port lg:flex-row lg:px-14 lg:remove-full-view-port xl:pl-[309px]">
      <div className="relative z-20 flex flex-1 flex-col items-start pb-[120px] pt-[320px] text-left lg:py-[200px]">
        <p className="pb-2 text-24 font-600 text-white-95">keycard</p>
        <h2 className="flex pb-4 font-lora text-32 font-400 text-white-95 md:text-48">
          Get the card shaped <br /> hardware wallet
        </h2>
        <p className="max-w-[435px] pb-10 text-20 font-300 text-white-80">
          Store and trade your crypto in a simple, secure and slim hardware
          wallet.
        </p>
        <div className="flex flex-row items-center gap-5">
          <BuyKeycardDialog>
            <Button variant="primary">Buy Keycard</Button>
          </BuyKeycardDialog>
          <p className="text-16 font-300 text-white-60">
            From{' '}
            {formatPrice({
              amount: KEYCARD_PRODUCTS.ONE_CARD_SET.price,
            })}
          </p>
        </div>
      </div>
      <div className="order-1 flex lg:relative lg:right-[-20px] lg:order-2">
        <div className="absolute bottom-0 z-10 block h-1/2 w-full -translate-y-1 bg-gradient-to-t from-dark-100 to-[transparent] lg:h-40" />
        <Image
          src="/assets/keycard/pre-footer.png"
          alt="Keycard"
          width={744}
          height={712}
          draggable={false}
          className={cx([
            'pointer-events-none absolute left-1/2 top-12 z-0 h-auto max-w-[549px] -translate-x-1/2 select-none lg:relative lg:left-auto lg:top-auto lg:translate-x-0',
            'aspect-[744/712] object-contain',
          ])}
        />
      </div>
    </section>
  )
}

export { Prefooter }
