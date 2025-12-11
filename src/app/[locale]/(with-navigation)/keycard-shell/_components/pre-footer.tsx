import { Button } from '~components/button'
import { BuyShellDialog } from '~components/buy-shell-dialog'
import { Image } from '~components/image'
import { cx } from 'cva'

const Prefooter = () => {
  return (
    <section className="relative mb-2 mt-28 flex flex-col px-5 pb-20 pt-0 full-view-port lg:my-0 lg:mb-[160px] lg:flex-row lg:pb-0 lg:pt-[100px] lg:remove-full-view-port xl:gap-8 2xl:gap-16">
      <div className="relative z-20 order-2 flex flex-col items-start pt-[365px] text-left lg:order-1 lg:pt-[100px] xl:pl-[290px]">
        <p className="pb-2 text-24 font-600 text-white-95">
          keycard <span className="font-200">shell</span>
        </p>
        <h2 className="pb-4 font-lora text-32 font-400 text-white-95 md:text-48">
          One device for all
          <br /> your Keycards
        </h2>
        <p className="max-w-[435px] pb-10 text-20 font-300 text-white-80">
          Unrivalled security with an infinite number of removable Keycards,
          each with their own key.
        </p>
        <div className="flex flex-col items-start gap-5 sm:min-w-[410px] sm:flex-row sm:items-center">
          <BuyShellDialog>
            <Button
              data-umami-event="preorder-shell"
              data-umami-event-page="shell"
              data-umami-event-section="footer"
              data-umami-event-element="button"
            >
              Pre-order
            </Button>
          </BuyShellDialog>
          <p className="flex items-center gap-2 text-16 font-300 text-white-60 md:gap-2">
            Coming 2025 <span className="size-1 rounded-full bg-white-40" />{' '}
            Bundled with Keycard
          </p>
        </div>
      </div>
      <div className="order-1 flex lg:right-[-20px] lg:order-2">
        <div className="absolute z-20 block h-[360px] w-full bg-gradient-to-b from-dark-100 to-[transparent] lg:h-[220px]" />
        <Image
          src="/assets/faqs.png"
          alt="Keycard Shell"
          width={480}
          height={320}
          draggable={false}
          className={cx([
            'pointer-events-none absolute left-[80%] top-0 z-0 h-auto w-[380px] max-w-[380px] -translate-x-1/2 select-none md:left-1/2 lg:relative lg:left-1/4 lg:top-4 lg:w-[420px] lg:max-w-[420px] lg:translate-x-0',
            'aspect-[791/521] object-contain',
          ])}
          sizes="(max-width:1023px) 380px, 420px"
        />
      </div>
    </section>
  )
}

export { Prefooter }
