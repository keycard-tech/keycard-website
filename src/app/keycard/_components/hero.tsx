import { ButtonLink } from '~components/button-link'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative ml-[calc(calc((100vw-100%)/2)*-1)] flex h-svh w-screen overflow-y-clip lg:ml-0 lg:h-[986px] lg:w-auto">
      <Image
        src="/assets/keycard/hero-keycard-mobile.png"
        alt="Keycard"
        width={1600}
        height={1600}
        className="absolute z-0 w-[1600px] bg-contain bg-center bg-no-repeat lg:left-1/2 lg:top-1/3 lg:w-full lg:-translate-x-1/2 lg:-translate-y-1/2"
        priority
      />
      <Image
        alt="Keycard Pro"
        src="/assets/keycard/hero-keycard.png"
        width={1600}
        height={1600}
        priority
        className="absolute z-0 hidden w-[1600px] bg-contain bg-center bg-no-repeat lg:left-1/2 lg:top-1/3 lg:block lg:w-full lg:-translate-x-1/2 lg:-translate-y-1/2"
      />
      <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-5 align-bottom lg:px-20 lg:pb-[270px]">
        <p className="pb-2 text-24 font-600 text-orange">keycard</p>
        <div className="flex flex-col items-start justify-between lg:flex-row">
          <div className="flex max-w-[664px] flex-col lg:self-end">
            <h1 className="flex font-lora text-32 font-400 text-white-95 lg:text-48">
              Store and trade your crypto with a simple, secure and slim
              hardware wallet.
            </h1>
          </div>

          <div className="flex max-w-[435px] flex-col pt-3 lg:self-start">
            <p className="pb-12 text-20 font-300 text-white-80 lg:text-right">
              With a best in class security system and the convenience of its
              card format
            </p>
            <div className="flex flex-row-reverse items-center gap-6 self-start lg:flex-row lg:self-end">
              <p className="text-16 font-300 text-white-60">From $25</p>
              <ButtonLink href="/">Buy Keycard</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
