import { ButtonLink } from '~components/button-link'

const Prefooter = () => {
  return (
    <section className="relative px-6 py-[200px] md:px-[195px]">
      <div className="container relative z-10 flex flex-col px-4">
        <p className="pb-2 text-24 font-600 text-white-95">keycard</p>
        <h1 className="flex pb-4 font-lora text-48 font-400">
          Something exciting <br /> must be here to finish
        </h1>
        <p className="max-w-[435px] pb-8 text-20 font-300 text-white-80">
          A principle-based hardware wallet that relieson Keycard as a modular
          secure element.
        </p>
        <div className="flex space-x-4">
          <ButtonLink href="/">Buy Keycard</ButtonLink>
          <p className="pt-6 text-16 font-300 text-white-60">Starts at $25</p>
        </div>
      </div>
    </section>
  )
}

export { Prefooter }
