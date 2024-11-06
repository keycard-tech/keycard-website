import { ButtonLink } from '~components/button-link'
import Image from 'next/image'

const KeycardPro = () => {
  return (
    <section className="relative ml-[calc(calc((100vw-100%)/2)*-1)] flex w-screen flex-col justify-end overflow-hidden rounded-b-28 border border-t-0 border-white-8 bg-white-3 backdrop-blur-[20px] lg:-ml-0 lg:w-full lg:flex-row lg:items-center lg:justify-normal">
      <div className="hidden max-h-[510px] flex-1 items-start justify-center overflow-hidden lg:flex">
        <Image
          src="/assets/keycard-pro.png"
          alt="Keycard Pro Hardware Wallet"
          width="900"
          height="600"
          className="object-contain"
          priority
        />
      </div>

      <Image
        src="/assets/keycard-pro-mobile.png"
        alt="Keycard Pro Hardware Wallet"
        width="900"
        height="600"
        className="self-end lg:hidden"
        priority
      />

      <div className="relative z-10 -mt-16 flex max-w-[434px] flex-col px-4 pb-8 pt-0 lg:mt-0 lg:py-20">
        <p className="pb-2 text-24 font-600 text-white-95">
          keycard <span className="font-200">pro</span>
        </p>
        <h1 className="flex pb-8 font-lora text-32 font-400 lg:pb-4 lg:text-48">
          One device for all
          <br />
          your Keycards
        </h1>
        <p className="pb-8 text-20 font-300 text-white-80">
          Something will say here about this product.
          <br />
          Certainly you don&apos;t want to miss it
        </p>
        <div className="flex gap-4">
          <ButtonLink href="/">Get notified</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Learn more
          </ButtonLink>
        </div>
        <p className="pt-6 text-16 font-300 text-white-60">Coming 2025</p>
      </div>
    </section>
  )
}

export { KeycardPro }
