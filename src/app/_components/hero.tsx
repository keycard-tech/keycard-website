const Hero = () => {
  return (
    <section className="flex w-full bg-dark-100 px-[72px] py-20">
      {/* Image background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/hero-bg.png)' }}
      />
      {/* Content */}
      <div className="container relative z-10 mx-auto flex flex-col gap-2 px-4">
        <p className="text-[24px] font-[600]">Keycard</p>
        <h1 className="mb-4 flex max-w-[436px] text-48 font-500">
          Best in class secure element
        </h1>
        <p className="mb-6 text-16">
          Something will say here about this product. Certainly, you don&apos;t
          want to miss it.
        </p>
        <div className="flex space-x-4">
          <button className="flex rounded-12 bg-orange px-6 py-3 text-white-100">
            Buy Keycard
          </button>
          <button className="rounded-12 border border-white-100 px-6 py-3">
            Learn more
          </button>
        </div>
        <p className="mt-4 text-16 text-white-60">Starts from $25</p>
      </div>
    </section>
  )
}

export { Hero }
