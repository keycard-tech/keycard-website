import { ButtonLink } from '~components/button-link'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative flex h-screen overflow-y-clip">
      <Image
        alt="Keycard Pro"
        src="/assets/keycard-pro.png"
        width={986}
        height={986}
        className="absolute bottom-0 left-1/3 top-1/3 z-0 -translate-x-1/2 -translate-y-1/4 bg-contain bg-top bg-no-repeat 2xl:h-auto 2xl:w-full"
      />
      <div className="absolute bottom-0 left-0 z-10 h-1/3 w-full bg-gradient-to-b from-[transparent] to-dark-100" />
      <div className="relative z-20 flex flex-1 justify-between px-20 pb-11 align-bottom">
        <div className="flex max-w-[664px] flex-col self-end">
          <p className="pb-2 text-24 font-600">
            keycard <span className="font-200">pro</span>
          </p>
          <h1 className="flex font-lora text-48 font-400 text-white-95">
            Something amazing about great things then something more over here.
          </h1>
        </div>

        <div className="flex max-w-[435px] flex-col justify-end self-end">
          <p className="pb-12 text-right text-20 font-300 text-white-80">
            A principle-based hardware wallet that relies on Keycard as a
            modular secure element
          </p>
          <div className="flex items-center justify-end space-x-4">
            <p className="text-16 font-300 text-white-60">Coming 2025</p>
            <ButtonLink href="/">Get notified</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
