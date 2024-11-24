import { Button } from '~components/button'
import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import Image from 'next/image'

const Prefooter = () => {
  return (
    <section className="relative mb-2 mt-28 flex flex-col px-5 pb-20 pt-0 full-view-port lg:my-0 lg:mb-[160px] lg:flex-row lg:gap-16 lg:pb-0 lg:pt-[100px] lg:remove-full-view-port">
      <div className="relative z-20 order-2 flex flex-col items-center pt-[365px] text-center lg:order-1 lg:items-start lg:pt-[100px] lg:text-left xl:pl-[230px]">
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
      <div className="order-1 flex lg:relative lg:right-[-20px] lg:order-2">
        <div className="absolute z-20 block h-[220px] w-full bg-gradient-to-b from-dark-100 to-[transparent]" />
        <Image
          src="/assets/faqs.png"
          alt="Keycard Shell"
          width={671}
          height={442}
          draggable={false}
          className="pointer-events-none z-10 aspect-[671/442] select-none"
        />
      </div>
    </section>
  )
}

export { Prefooter }
