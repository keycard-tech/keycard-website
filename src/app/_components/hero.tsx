const Hero = () => {
  return (
    <section className="relative flex w-full rounded-t-[28px] border border-white-6 bg-white-3 px-[72px] py-20">
      {/* Image background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/hero-bg.png)' }}
      />
      {/* Content */}
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
          <button className="flex rounded-12 bg-orange px-6 py-3 text-white-95">
            Buy Keycard
          </button>
          <button className="rounded-12 border border-white-12 px-6 py-3 backdrop-blur-2xl">
            Learn more
          </button>
        </div>
        <p className="pt-6 text-16 font-300 text-white-60">Starts from $25</p>
      </div>
    </section>
  )
}

export { Hero }
