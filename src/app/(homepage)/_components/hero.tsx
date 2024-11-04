import { ButtonLink } from '~components/button-link'

const Hero = () => {
  return (
    <section className="relative flex w-full overflow-clip rounded-t-28 border border-white-8 bg-white-3 px-[72px] py-20">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/hero-bg.png)' }}
      />
      <div className="container relative z-10 flex max-w-[434px] flex-col px-4">
        <p className="pb-2 text-24 font-600 text-white-95">keycard</p>
        <h1 className="flex pb-4 font-lora text-48 font-400">
          Best in class <br /> secure element
        </h1>
        <p className="pb-8 text-20 font-300 text-white-80">
          Something will say here about this product. Certainly, you don&apos;t
          want to miss it.
        </p>
        <div className="flex space-x-4">
          <ButtonLink href="/">Buy Keycard</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Learn more
          </ButtonLink>
        </div>
        <p className="pt-6 text-16 font-300 text-white-60">Starts from $25</p>
      </div>
    </section>
  )
}

export { Hero }
