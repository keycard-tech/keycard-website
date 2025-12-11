import { Button } from '~components/button'
import { BuyShellDialog } from '~components/buy-shell-dialog'
import { Image } from '~components/image'

const Hero = () => {
  return (
    <section className="relative flex h-svh overflow-y-clip full-view-port lg:remove-full-view-port 2xl:h-[839px]">
      <div className="absolute left-0 top-0 z-0 size-[385px] rounded-full bg-orange opacity-[6%] blur-2xl lg:size-[676px] lg:translate-x-1/4" />
      <div className="absolute bottom-0 left-1/2 z-0 size-[385px] rounded-full bg-orange opacity-[6%] blur-2xl lg:size-[676px]" />
      <Image
        alt="Keycard Shell"
        src="/assets/keycard-shell/bg-hero-keycard-shell.png"
        width={986}
        height={986}
        priority
        className="absolute left-10 top-[43%] z-0 h-auto w-fit -translate-y-1/2 scale-[120%] bg-contain bg-top bg-no-repeat md:scale-100 lg:left-[56%] lg:-translate-x-1/2"
      />

      <div className="pointer-events-none relative z-20 flex flex-1 flex-col justify-end px-5 pb-5 align-bottom lg:pb-20 xl:px-20">
        <div className="flex flex-col items-start justify-between lg:flex-row">
          <div className="pointer-events-auto flex max-w-[664px] flex-col lg:self-end">
            <p className="pb-2 text-24 font-600 text-white-95">
              keycard <span className="font-200">shell</span>
            </p>
            <h1 className="font-lora text-32 font-400 text-white-95 lg:text-44">
              One secure device,
              <br />
              infinite backups
            </h1>
            <p className="max-w-[435px] pb-8 pt-4 text-20 font-300 text-white-80">
              Unrivalled security with an infinite number of removable Keycards,
              each with their own key.
            </p>
            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
              <BuyShellDialog>
                <Button
                  data-umami-event="preorder-shell"
                  data-umami-event-page="shell"
                  data-umami-event-section="hero"
                  data-umami-event-element="button"
                >
                  Pre-order
                </Button>
              </BuyShellDialog>
              <p className="flex items-center gap-2 text-16 font-300 text-white-60">
                Coming 2025 <span className="size-1 rounded-full bg-white-40" />{' '}
                Bundled with Keycard
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-[#010101] to-[transparent] lg:h-1/3" />
    </section>
  )
}

export { Hero }
