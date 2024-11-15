import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { GetNotifiedDialog } from '~components/get-notified-dialog'
import Image from 'next/image'

const KeycardPro = () => {
  return (
    <section className="relative flex flex-col justify-end overflow-hidden rounded-b-28 border border-t-0 border-white-8 bg-white-3 backdrop-blur-[20px] full-view-port lg:flex-row lg:items-center lg:justify-normal lg:remove-full-view-port">
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

      <div className="relative z-10 -mt-16 flex max-w-[434px] flex-col px-5 pb-8 pt-0 lg:mt-0 lg:py-20">
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
          <GetNotifiedDialog>
            <Button>Get notified</Button>
          </GetNotifiedDialog>
          <ButtonLink href="/keycard-pro" variant="secondary">
            Learn more
          </ButtonLink>
        </div>
        <p className="pt-6 text-16 font-300 text-white-60">Coming 2025</p>
      </div>
    </section>
  )
}

export { KeycardPro }
