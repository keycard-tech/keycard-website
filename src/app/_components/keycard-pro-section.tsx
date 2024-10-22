import Image from 'next/image'

const KeycardProSection = () => {
  return (
    <section className="relative flex items-center overflow-hidden bg-white-3 px-6 backdrop-blur-[20px]">
      {/* Hardware wallet image */}
      <Image
        src="/assets/keycard-pro-section.png"
        alt="Keycard Pro Hardware Wallet"
        width={400}
        height={600}
        className="size-full object-contain"
      />

      {/* Content */}
      <div className="relative z-10 py-20 pr-[72px]">
        <h2 className="mb-4 text-48 font-500 text-white-100">keycard pro</h2>
        <h1 className="mb-4 text-48 font-500">
          A modular
          <br />
          hardware wallet
        </h1>
        <p className="mb-8 text-16 text-white-60">
          Something will say here about thi product
          <br />
          certainly you don&apos;t want to miss it
        </p>
        <div className="mb-6 flex space-x-4">
          <button className="rounded-12 bg-orange px-6 py-3 text-16 font-500 text-white-100 transition-colors hover:bg-dark-60">
            Get notified
          </button>
          <button className="rounded-12 bg-[#FFFFFF14] px-6 py-3 text-16 font-500 text-white-100 transition-colors hover:bg-orange">
            Learn more
          </button>
        </div>
        <p className="text-[#FFFFFF99]">Coming 2025</p>
      </div>
    </section>
  )
}

export { KeycardProSection }
