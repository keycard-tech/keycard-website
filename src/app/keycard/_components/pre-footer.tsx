import { Button } from '~components/button'
import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import { cx } from 'cva'
import Image from 'next/image'

const Prefooter = () => {
  return (
    <section className="relative mb-[88px] mt-10 flex flex-col rounded-28 border border-white-8 bg-white-3 px-6 pb-20 pt-0 full-view-port lg:my-0 lg:flex-row lg:border-0 lg:px-14 lg:pb-0 lg:pt-[200px] lg:remove-full-view-port xl:px-[195px]">
      <div className="relative z-20 flex flex-1 flex-col items-center pt-[260px] text-center lg:items-start lg:pt-0 lg:text-left">
        <p className="pb-2 text-24 font-600 text-white-95">keycard</p>
        <h2 className="flex pb-4 font-lora text-32 font-400 text-white-95 md:text-48">
          A card shaped <br /> hardware wallet
        </h2>
        <p className="max-w-[435px] pb-10 text-20 font-300 text-white-80">
          Store and trade your crypto in a simple, secure and slim hardware
          wallet.
        </p>
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <BuyKeycardDialog>
            <Button variant="primary">Buy Keycard</Button>
          </BuyKeycardDialog>
          <p className="text-16 font-300 text-white-60">From $25</p>
        </div>
      </div>
      <div className="absolute inset-0 z-10 block h-1/2 w-full -translate-y-1 bg-gradient-to-b from-dark-100 to-[transparent] lg:hidden" />
      <Image
        src="/assets/bottom-keycard.png"
        alt="Keycard"
        width={900}
        height={600}
        draggable={false}
        className={cx([
          'pointer-events-none absolute left-1/2 top-6 z-10 max-w-[549px] -translate-x-1/2 select-none lg:relative lg:left-auto lg:top-auto lg:translate-x-0',
          'lg:w-full',
        ])}
      />
    </section>
  )
}

export { Prefooter }
