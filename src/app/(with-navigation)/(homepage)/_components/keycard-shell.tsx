import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { BuyShellDialog } from '~components/buy-shell-dialog'
import { Image } from '~components/image'

const KeycardShell = () => {
  return (
    <section className="relative flex h-[calc(100svh-80px-70px)] flex-col justify-between overflow-hidden rounded-t-28 border border-white-8 bg-white-4 backdrop-blur-[20px] full-view-port sm:h-[calc(100svh-80px-48px)] lg:h-auto lg:flex-row-reverse lg:items-center lg:justify-normal lg:remove-full-view-port">
      <div className="hidden max-h-[510px] flex-1 items-start justify-center overflow-hidden lg:flex">
        <Image
          src="/assets/keycard-shell.png"
          alt="Keycard Shell Hardware Wallet"
          width="758"
          height="758"
          className="relative right-0 top-[-86px] object-cover object-center xl:top-[-128px] xl:object-contain"
          priority
        />
      </div>

      <Image
        src="/assets/keycard-shell-mobile.png"
        alt="Keycard Shell Hardware Wallet"
        width="466"
        height="466"
        className="absolute top-0 w-full lg:hidden"
        priority
      />

      <div className="relative z-10 flex max-w-[434px] flex-1 flex-col place-content-end px-5 pb-5 lg:ml-[72px] lg:p-0">
        <p className="pb-2 text-24 font-600 text-white-95">
          keycard <span className="font-200">shell</span>
        </p>
        <p className="flex pb-8 font-lora text-32 font-400 lg:pb-4 lg:text-48">
          One secure device,
          <br />
          infinite backups
        </p>
        <p className="pb-8 text-20 font-300 text-white-80">
          Unrivalled security with an infinite number of removable Keycards,
          each with their own key.
        </p>
        <div className="flex gap-4">
          <BuyShellDialog>
            <Button>Pre-order</Button>
          </BuyShellDialog>
          <ButtonLink href="/keycard-shell" variant="secondary">
            Learn more
          </ButtonLink>
        </div>
        <p className="flex items-center gap-2 pt-6 text-16 font-300 text-white-60">
          Coming 2025 <span className="size-1 rounded-full bg-white-40" />{' '}
          Bundled with Keycard
        </p>
      </div>
    </section>
  )
}

export { KeycardShell }
