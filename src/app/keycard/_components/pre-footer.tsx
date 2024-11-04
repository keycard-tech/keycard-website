import { ButtonLink } from '~components/button-link'

const Prefooter = () => {
  return (
    <section className="relative px-6 py-[200px] md:px-[195px]">
      <div className="container relative z-10 flex flex-col px-4">
        <p className="pb-2 text-24 font-600 text-white-95">keycard</p>
        <h2 className="flex pb-4 font-lora text-48 font-400 text-white-95">
          Get the card shaped <br /> hardware wallet
        </h2>
        <p className="max-w-[435px] pb-10 text-20 font-300 text-white-80">
          Store and trade your crypto in a simple, secure and slim hardware
          wallet.
        </p>
        <div className="flex items-center gap-5">
          <ButtonLink href="/">Buy Keycard</ButtonLink>
          <p className="text-16 font-300 text-white-60">From $25</p>
        </div>
      </div>
    </section>
  )
}

export { Prefooter }
