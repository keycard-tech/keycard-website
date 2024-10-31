import { ButtonLink } from '~components/button-link'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative flex h-[986px] overflow-y-clip">
      <Image
        alt="Keycard Pro"
        src="/assets/keycard/hero-keycard.png"
        width={1600}
        height={1600}
        priority
        className="absolute left-1/2 top-1/3 z-0 w-full -translate-x-1/2 -translate-y-1/2 bg-contain bg-center bg-no-repeat"
      />
      <div className="relative z-10 flex flex-1 flex-col justify-end px-20 pb-11 align-bottom lg:pb-[270px]">
        <p className="pb-2 text-24 font-600 text-orange">keycard</p>
        <div className="flex items-start justify-between">
          <div className="flex max-w-[664px] flex-col self-end">
            <h1 className="flex font-lora text-48 font-400 text-white-95">
              Something amazing about great things then something more over
              here.
            </h1>
          </div>

          <div className="flex max-w-[435px] flex-col self-start pt-3">
            <p className="pb-12 text-right text-20 font-300 text-white-80">
              A principle-based hardware wallet that relies on Keycard as a
              modular secure element
            </p>
            <div className="flex items-center justify-end space-x-4">
              <p className="text-16 font-300 text-white-60">Starts from $25</p>
              <ButtonLink href="/">Buy Keycard</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
