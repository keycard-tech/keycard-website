import Image from 'next/image'

const Comparision = () => {
  return (
    <section className="mt-[200px] grid gap-0 overflow-clip rounded-28 border border-white-12 md:grid-cols-2">
      <div className="relative flex min-h-[840px] flex-col items-center justify-center">
        <Image
          alt="Keycard Pro"
          className="absolute left-0 top-0 z-0 size-full object-cover"
          src="/assets/keycard-pro/comparision-left.png"
          layout="fill"
        />

        <h2 className="absolute left-1/2 top-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2 text-center font-lora text-32">
          Keep your device at home
        </h2>
        <p className="absolute bottom-14 mx-auto max-w-[434px] px-2 text-center font-300 text-white-80">
          Stored away on a drawer, or hiding in plain sight, Keycard Pro is
          stateless without a Keycard.
        </p>
      </div>

      <div className="relative flex min-h-[840px] flex-col items-center justify-center border-t border-white-12 md:border-l md:border-t-0">
        <Image
          alt="Keycard"
          className="absolute left-0 top-0 size-full object-cover"
          src="/assets/keycard-pro/comparision-right.png"
          layout="fill"
        />

        <h2 className="absolute left-1/2 top-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2 text-center font-lora text-32">
          Take your keys with you
        </h2>
        <p className="absolute bottom-14 mx-auto max-w-[434px] px-2 text-center font-300 text-white-80">
          Discreet and light, your Keycard fits perfectly in your wallet ready
          to go, everywhere!
        </p>
      </div>
    </section>
  )
}

export { Comparision }
