import { ButtonLink } from '~components/button-link'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative ml-[calc(calc((100vw-100%)/2)*-1)] flex h-[calc(100svh-80px)] w-screen flex-col justify-end overflow-clip rounded-t-28 border border-white-8 bg-white-3 px-0 pt-0 lg:ml-0 lg:h-auto lg:w-full lg:px-[72px] lg:py-20">
      <Image
        alt="Keycard"
        src="/assets/hero-bg.png"
        width={1600}
        height={1600}
        className="absolute inset-0 z-0 hidden bg-cover bg-center lg:block"
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

      <div className="relative z-10 flex max-w-[434px] flex-col px-4 lg:pt-0">
        <p className="pb-2 text-24 font-600 text-white-95">keycard</p>
        <h1 className="flex pb-4 font-lora text-32 font-400 lg:text-48">
          A card shaped <br /> hardware wallet
        </h1>
        <p className="pb-8 text-20 font-300 text-white-80">
          Store and trade your crypto with a simple, secure and slim hardware
          wallet.
        </p>
        <div className="flex gap-4">
          <ButtonLink href="/">Buy Keycard</ButtonLink>
          <ButtonLink href="/" variant="secondary">
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
