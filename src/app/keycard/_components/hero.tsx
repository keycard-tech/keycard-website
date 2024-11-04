import { ButtonLink } from '~components/button-link'

const Hero = () => {
  return (
    <section className="relative flex h-screen">
      <div
        className="absolute inset-0 left-1/2 z-0 w-screen -translate-x-1/2 bg-contain bg-top bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/keycard/hero-keycard.png)' }}
      />
      <div className="relative z-10 flex flex-1 justify-between px-20 pb-11 align-bottom">
        <div className="flex max-w-[664px] flex-col self-end">
          <p className="pb-2 text-24 font-600 text-orange">keycard</p>
          <h1 className="flex font-lora text-48 font-400 text-white-95">
            Store and trade your crypto with a simple, secure and slim hardware
            wallet.
          </h1>
        </div>

        <div className="flex max-w-[435px] flex-col justify-end self-end">
          <p className="pb-12 text-right text-20 font-300 text-white-80">
            With a best in class security system and the convenience of its card
            format
          </p>
          <div className="flex items-center justify-end gap-7">
            <p className="text-16 font-300 text-white-60">From $25</p>
            <ButtonLink href="/">Buy Keycard</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
