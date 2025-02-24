import { Button } from '~components/button'
import { GetNotifiedDialog } from '~components/get-notified-dialog'
import { Image } from '~components/image'

const Hero = () => {
  return (
    <section className="relative flex h-svh overflow-y-clip full-view-port lg:remove-full-view-port 2xl:h-[839px]">
      <Image
        alt="Keycard Shell"
        src="/assets/keycard-shell/bg-hero-keycard-shell.png"
        width={986}
        height={986}
        priority
        className="absolute left-10 top-[43%] z-0 h-auto w-fit -translate-y-1/2 scale-[120%] bg-contain bg-top bg-no-repeat md:scale-100 lg:left-[56%] lg:-translate-x-1/2"
      />
      <div className="pointer-events-none relative z-20 flex flex-1 flex-col justify-end px-5 pb-5 align-bottom lg:pb-[43px] xl:px-20">
        <div className="flex flex-col items-start justify-between lg:flex-row">
          <div className="pointer-events-auto flex max-w-[664px] flex-col lg:self-end">
            <p className="pb-2 text-24 font-600 text-white-95">
              keycard <span className="font-200">shell</span>
            </p>
            <h1 className="flex font-lora text-32 font-400 text-white-95 lg:text-44">
              One device for all
              <br /> your Keycards
            </h1>
            <p className="max-w-[435px] pb-8 pt-4 text-20 font-300 text-white-80">
              Unrivalled security with an infinite number of removable Keycards,
              each with their own key.
            </p>
            <div className="flex items-center gap-5">
              <GetNotifiedDialog>
                <Button variant="primary">Get notified</Button>
              </GetNotifiedDialog>
              <p className="flex items-center gap-2 text-16 font-300 text-white-60">
                Coming 2025 <span className="size-1 rounded-full bg-white-40" />{' '}
                Bundled with Keycard
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-0 left-0 z-10 h-1/3 w-full bg-gradient-to-b from-[transparent] to-dark-100 lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2" />
      <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-5 align-bottom lg:pb-[43px] xl:px-20">
        <p className="pb-2 text-24 font-600">
          keycard <span className="font-200">shell</span>
        </p>
        <div className="flex flex-col items-start justify-between lg:flex-row">
          <div className="flex max-w-[664px] flex-col lg:self-end">
            <h1 className="flex font-lora text-32 font-400 text-white-95 lg:text-48">
              One device for all your Keycards
            </h1>
          </div>

          <div className="flex max-w-[435px] flex-col pt-3 lg:self-start">
            <p className="pb-12 text-20 font-300 text-white-80 lg:text-right">
              A modular and stateless hardware wallet that relies on Keycard as
              the secure element.
            </p>
            <div className="flex flex-row-reverse items-center gap-5 self-start lg:flex-row lg:self-end">
              <p className="flex items-center gap-2 text-16 font-300 text-white-60">
                Coming 2025 <span className="size-1 rounded-full bg-white-40" />{' '}
                Bundled with Keycard
              </p>
              <GetNotifiedDialog>
                <Button>Get notified</Button>
              </GetNotifiedDialog>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  )
}

export { Hero }
