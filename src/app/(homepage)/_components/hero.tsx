import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative flex h-[calc(100svh-80px)] flex-col justify-end overflow-clip rounded-t-28 border border-white-8 bg-white-3 px-0 pt-0 full-view-port lg:h-auto lg:px-[72px] lg:py-20 lg:remove-full-view-port">
      <Image
        alt="Keycard"
        src="/assets/hero-bg.png"
        width={1600}
        height={1600}
        className="absolute bottom-0 right-0 z-0 hidden w-auto bg-cover bg-center lg:block"
        priority
      />
      <Image
        alt="Keycard"
        src="/assets/hero-bg-mobile.png"
        width={1600}
        height={1600}
        className="absolute right-0 top-0 block w-full bg-cover bg-center lg:hidden"
        priority
      />

      <div className="relative z-10 flex max-w-[434px] flex-col px-5 lg:pt-0">
        <p className="pb-2 text-24 font-600 text-white-95">keycard</p>
        <h1 className="flex pb-8 font-lora text-32 font-400 lg:pb-4 lg:text-48">
          A card shaped <br /> hardware wallet
        </h1>
        <p className="pb-8 text-20 font-300 text-white-80">
          Store and trade your crypto with a simple, secure and slim hardware
          wallet.
        </p>
        <div className="flex space-x-4">
          <BuyKeycardDialog>
            <Button variant="primary">Buy Keycard</Button>
          </BuyKeycardDialog>
          <ButtonLink href="/keycard" variant="secondary">
            Learn more
          </ButtonLink>
        </div>
        <p className="pb-8 pt-6 text-16 font-300 text-white-60 lg:pb-0">
          From $25
        </p>
      </div>
    </section>
  )
}

export { Hero }
