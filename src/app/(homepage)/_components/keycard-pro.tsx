import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { GetNotifiedDialog } from '~components/get-notified-dialog'
import Image from 'next/image'

const KeycardPro = () => {
  return (
    <section className="relative flex items-center overflow-hidden rounded-b-28 border border-t-0 border-white-8 bg-white-3 backdrop-blur-[20px]">
      <div className="flex max-h-[510px] flex-1 items-start justify-center overflow-hidden">
        <Image
          src="/assets/keycard-pro.png"
          alt="Keycard Pro Hardware Wallet"
          width="900"
          height="600"
          className="object-contain"
          priority
        />
      </div>

      <div className="container relative z-10 flex max-w-[434px] flex-col py-20">
        <p className="pb-2 text-24 font-600 text-white-95">
          keycard <span className="font-200">pro</span>
        </p>
        <h1 className="flex pb-4 font-lora text-48 font-400">
          A modular
          <br />
          hardware wallet
        </h1>
        <p className="pb-8 text-20 font-300 text-white-80">
          Something will say here about this product.
          <br />
          Certainly you don&apos;t want to miss it
        </p>
        <div className="flex space-x-4">
          <GetNotifiedDialog>
            <Button>Get notified</Button>
          </GetNotifiedDialog>
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
