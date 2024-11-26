import { Button } from '~components/button'
import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import { cx } from 'cva'
import Image from 'next/image'

const Prefooter = () => {
  return (
    <section className="relative mb-2 mt-28 flex flex-col px-5 pb-20 pt-0 full-view-port lg:my-0 lg:mb-[160px] lg:flex-row lg:pb-0 lg:pt-[100px] lg:remove-full-view-port xl:gap-8 2xl:gap-16">
      <div className="relative z-20 order-2 flex flex-col items-start pt-[365px] text-left lg:order-1 lg:pt-[100px] xl:pl-[290px]">
        <p className="pb-2 text-24 font-600 text-white-95">
          keycard <span className="font-200">shell</span>
        </p>
        <h2 className="flex pb-4 font-lora text-32 font-400 text-white-95 md:text-48">
          One device for all <br /> your Keycards
        </h2>
        <p className="max-w-[435px] pb-10 text-20 font-300 text-white-80">
          A principle-based hardware wallet that relies on Keycard as a modular
          secure element.
        </p>
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <BuyKeycardDialog>
            <Button variant="primary">Buy Keycard</Button>
          </BuyKeycardDialog>
          <p className="text-16 font-300 text-white-60">From $25</p>
        </div>
      </div>
      <div className="order-1 flex lg:right-[-20px] lg:order-2">
        <div className="absolute z-20 block h-[360px] w-full bg-gradient-to-b from-dark-100 to-[transparent] lg:h-[220px]" />
        <Image
          src="/assets/faqs.png"
          alt="Keycard Shell"
          width={791}
          height={521}
          draggable={false}
          className={cx([
            'pointer-events-none absolute left-[80%] top-0 z-0 h-auto max-w-[549px] -translate-x-1/2 select-none md:left-1/2 lg:relative lg:left-1/4 lg:top-12 lg:translate-x-0',
            'aspect-[791/521] object-contain lg:scale-125',
          ])}
        />
      </div>
    </section>
  )
}

export { Prefooter }
