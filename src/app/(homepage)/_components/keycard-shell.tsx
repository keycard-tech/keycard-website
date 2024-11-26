import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { GetNotifiedDialog } from '~components/get-notified-dialog'
import Image from 'next/image'

const KeycardShell = () => {
  return (
    <section className="relative flex flex-col justify-end overflow-hidden rounded-b-28 border border-t-0 border-white-8 bg-white-3 backdrop-blur-[20px] full-view-port lg:flex-row lg:items-center lg:justify-normal lg:remove-full-view-port">
      <div className="hidden max-h-[510px] flex-1 items-start justify-center overflow-hidden lg:flex">
        <Image
          src="/assets/keycard-shell.png"
          alt="Keycard Shell Hardware Wallet"
          width="758"
          height="758"
          className="relative left-0 top-[-86px] object-cover object-center xl:top-[-128px] xl:object-contain"
          priority
        />
      </div>

      <Image
        src="/assets/keycard-shell-mobile.png"
        alt="Keycard Shell Hardware Wallet"
        width="900"
        height="600"
        className="self-end lg:hidden"
        priority
      />

      <div className="relative z-10 -mt-16 flex max-w-[506px] flex-col px-5 pb-8 pt-0 lg:mt-0 lg:py-20 lg:pl-0 lg:pr-[72px]">
        <p className="pb-2 text-24 font-600 text-white-95">
          keycard <span className="font-200">shell</span>
        </p>
        <p className="flex pb-8 font-lora text-32 font-400 lg:pb-4 lg:text-48">
          One device for all
          <br />
          your Keycards
        </p>
        <p className="pb-8 text-20 font-300 text-white-80">
          A modular and stateless hardware wallet that
          <br /> relies on Keycard as the secure element.
        </p>
        <div className="flex gap-4">
          <GetNotifiedDialog>
            <Button>Get notified</Button>
          </GetNotifiedDialog>
          <ButtonLink href="/keycard-shell" variant="secondary">
            Learn more
          </ButtonLink>
        </div>
        <p className="pt-6 text-16 font-300 text-white-60">Coming 2025</p>
      </div>
    </section>
  )
}

export { KeycardShell }
