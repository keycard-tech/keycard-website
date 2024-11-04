import { ButtonLink } from '~components/button-link'
import Image from 'next/image'

const KeycardPro = () => {
  return (
    <section className="relative mx-6 mt-[200px] flex items-center overflow-hidden rounded-28 border border-white-12 backdrop-blur-[20px] md:mx-20">
      <Image
        src="/assets/keycard/bg-keycard-pro.png"
        alt="Keycard Pro Hardware Wallet"
        width={1400}
        height={800}
        className="absolute left-0 top-0 size-full scale-[101%] object-cover"
      />

      <div className="relative z-10 flex flex-col p-8 md:py-[200px] md:pl-[229px]">
        <p className="pb-3 text-24 font-600 text-white-95">
          keycard <span className="font-200">pro</span>
        </p>
        <p className="flex pb-2 font-lora text-32 font-400">
          Multiple Keycards.
          <br />
          One device.
        </p>
        <p className="max-w-[320px] pb-8 text-16 font-300 text-white-80">
          Something here about how you can keep the device safe at home.
        </p>
        <div className="flex space-x-4">
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
