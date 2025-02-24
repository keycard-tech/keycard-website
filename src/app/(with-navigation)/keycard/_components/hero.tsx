import { KEYCARD_PRODUCTS } from '~/app/_constants/shopify/products'
import { formatPrice } from '~/app/_utils/format-price'
import { Background } from '~components/3d/background'
import { Button } from '~components/button'
import { BuyKeycardDialog } from '~components/buy-keycard-dialog'

const Hero = () => {
  return (
    <section className="relative flex h-svh overflow-y-clip full-view-port lg:remove-full-view-port 2xl:h-[839px]">
      <Background variant="homepage" />
      <div className="pointer-events-none relative z-20 flex flex-1 flex-col justify-end px-5 pb-5 align-bottom lg:pb-[43px] xl:px-20">
        <div className="flex flex-col items-start justify-between lg:flex-row">
          <div className="pointer-events-auto flex max-w-[664px] flex-col lg:self-end">
            <p className="pb-2 text-24 font-600 text-white-95">keycard</p>
            <h1 className="flex font-lora text-32 font-400 text-white-95 lg:text-44">
              Lightweight design, <br /> heavyweight security
            </h1>
            <p className="max-w-[435px] pb-8 pt-4 text-20 font-300 text-white-80">
              Trade swiftly and safely back up your assets with Keycard hardware
              wallets.
            </p>
            <div className="flex items-center gap-5">
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
        </div>
      </div>
    </section>
  )
}

export { Hero }
