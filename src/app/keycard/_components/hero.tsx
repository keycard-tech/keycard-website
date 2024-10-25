import { ButtonLink } from '~components/button-link'

const Hero = () => {
  return (
    <section className="relative flex h-screen">
      <div
        className="absolute inset-0 left-1/2 z-0 w-screen -translate-x-1/2 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/keycard/hero-keycard.png)' }}
      />
      <div className="relative z-10 flex flex-1 justify-between px-20 pb-11 align-bottom">
        <div className="flex max-w-[664px] flex-col self-end">
          <p className="pb-2 text-24 font-600 text-orange">keycard</p>
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
            <p className="text-16 font-300 text-white-60">Starts from $25</p>
            <ButtonLink href="/">Buy Keycard</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
