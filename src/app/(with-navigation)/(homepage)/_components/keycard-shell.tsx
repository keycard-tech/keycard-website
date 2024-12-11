import { Button } from '~components/button'
import { GetNotifiedDialog } from '~components/get-notified-dialog'
import { Image } from '~components/image'

const KeycardShell = () => {
  return (
    <section className="relative mx-0 mt-[160px] flex flex-col items-center overflow-hidden rounded-28 border border-white-12 lg:mx-6 lg:mt-[200px] lg:flex-row lg:justify-end xl:mx-20">
      <Image
        src="/assets/bg-keycard-v1.png"
        alt="Keycard Shell Hardware Wallet"
        width={1400}
        height={800}
        className="absolute left-0 top-0 hidden size-full object-cover lg:block"
      />

      <Image
        src="/assets/bg-keycard-mobile-v1.png"
        alt="Keycard Shell Hardware Wallet"
        width={414}
        height={614}
        className="relative left-0 top-0 block aspect-[414/614] w-full lg:hidden"
      />

      <div className="absolute right-0 top-0 hidden h-full w-[270px] bg-gradient-to-r from-[transparent] to-dark-100 lg:block" />

      <div className="relative z-10 mt-[-53%] flex w-full flex-col p-6 pt-0 lg:mt-0 lg:w-auto lg:py-[256px] lg:pr-[229px]">
        <p className="flex min-w-[320px] pb-4 font-lora text-32 font-400">
          Get ready for the
          <br />
          future of modular
          <br />
          hardware security
        </p>
        <p className="min-w-[320px] pb-8 text-16 font-300 text-white-60">
          Revealing soon. Coming 2025
        </p>
        <GetNotifiedDialog>
          <Button>Get notified</Button>
        </GetNotifiedDialog>
      </div>
    </section>
  )
}

export { KeycardShell }
