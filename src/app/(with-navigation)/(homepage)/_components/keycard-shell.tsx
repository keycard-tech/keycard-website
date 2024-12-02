import { Button } from '~components/button'
import { GetNotifiedDialog } from '~components/get-notified-dialog'
import { Image } from '~components/image'

const KeycardShell = () => {
  return (
    <section className="relative mx-0 mt-[160px] flex items-center overflow-hidden rounded-28 border border-white-12 lg:mx-6 lg:mt-[200px] lg:justify-end xl:mx-20">
      <Image
        src="/assets/bg-keycard-v1.png"
        alt="Keycard Shell Hardware Wallet"
        width={1400}
        height={800}
        className="absolute left-0 top-0 hidden size-full object-cover md:block"
      />

      <Image
        src="/assets/bg-keycard-v1.png"
        alt="Keycard Shell Hardware Wallet"
        width={828}
        height={1452}
        className="absolute left-0 top-0 block size-full scale-[101%] object-cover md:hidden"
      />

      <div className="relative z-10 flex flex-col p-6 pt-[400px] lg:py-[200px] lg:pr-[229px]">
        <p className="pb-3 text-24 font-600 text-white-95">
          keycard <span className="font-200">shell</span>
        </p>
        <p className="flex pb-2 font-lora text-32 font-400">
          Multiple Keycards.
          <br />
          One device.
        </p>
        <p className="max-w-[320px] pb-6 text-16 font-300 text-white-60">
          Use the same device for all your Keycards. It’s airgaped, stateless
          and modular.
        </p>

        <GetNotifiedDialog>
          <Button>Get notified</Button>
        </GetNotifiedDialog>

        <p className="pt-6 text-16 font-300 text-white-60">
          Revealing soon. Coming 2025
        </p>
      </div>
    </section>
  )
}

export { KeycardShell }
