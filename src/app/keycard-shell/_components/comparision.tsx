import Image from 'next/image'

const Comparision = () => {
  return (
    <section className="mt-[120px] grid gap-0 overflow-clip rounded-28 border border-white-12 lg:mt-[200px] lg:grid-cols-2">
      <div className="relative flex min-h-[480px] flex-col items-center justify-center lg:min-h-[840px]">
        <Image
          alt="Keycard Shell"
          className="absolute left-0 top-0 z-0 size-full object-cover"
          src="/assets/keycard-shell/comparision-left.png"
          width={1480}
          height={1680}
        />

        <h2 className="absolute left-1/2 top-1/2 z-20 mx-auto w-full max-w-[328px] -translate-x-1/2 -translate-y-20 text-center font-lora text-32 lg:max-w-full">
          Keep your device at home
        </h2>
        <p className="absolute bottom-8 mx-auto max-w-[423px] px-2 text-center text-16 font-300 text-white-80 lg:bottom-14">
          Stored away on a drawer, or hiding in plain sight, Keycard Shell is
          stateless without a Keycard.
        </p>
      </div>

      <div className="relative flex min-h-[480px] flex-col items-center justify-center border-t border-white-12 md:border-l md:border-t-0 lg:min-h-[840px]">
        <Image
          alt="Keycard"
          className="absolute left-0 top-0 size-full object-cover"
          src="/assets/keycard-shell/comparision-right.png"
          width={1480}
          height={1680}
        />

        <h2 className="absolute left-1/2 top-1/2 z-20 mx-auto w-full max-w-[328px] -translate-x-1/2 -translate-y-20 text-center font-lora text-32 lg:max-w-full">
          Take your keys with you
        </h2>
        <p className="absolute bottom-8 mx-auto max-w-[434px] px-2 text-center text-16 font-300 text-white-80 lg:bottom-14">
          Discreet and light, your Keycard fits perfectly in your wallet ready
          to go, everywhere!
        </p>
      </div>
    </section>
  )
}

export { Comparision }
