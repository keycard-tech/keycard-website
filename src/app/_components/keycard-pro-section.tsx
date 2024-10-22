import Image from 'next/image'

const KeycardProSection = () => {
  return (
    <section className="relative flex items-center overflow-hidden rounded-b-[28px] border border-t-0 border-white-6 bg-white-3 backdrop-blur-[20px]">
      {/* Hardware wallet image */}
      <div className="flex h-full flex-1 items-center justify-center">
        <Image
          src="/assets/keycard-pro-section.png"
          alt="Keycard Pro Hardware Wallet"
          width="1000"
          height="600"
          className="h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex max-w-[434px] flex-col py-20">
        <h1 className="flex pb-4 font-lora text-48 font-400">
          A modular
          <br />
          hardware wallet
        </h1>
        <p className="pb-8 text-20 font-300 text-white-80">
          Something will say here about this product.
          <br />
          Certainly you don&apos;t want to miss it
        </p>
        <div className="flex space-x-4">
          <button className="flex rounded-12 bg-orange px-6 py-3 text-white-95">
            Get notified
          </button>
          <button className="rounded-12 border border-white-12 px-6 py-3 backdrop-blur-2xl">
            Learn more
          </button>
        </div>
        <p className="pt-6 text-16 font-300 text-white-60">Coming 25</p>
      </div>
    </section>
  )
}

export { KeycardProSection }
