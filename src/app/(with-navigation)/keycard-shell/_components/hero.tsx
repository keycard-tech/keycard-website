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
      <div className="pointer-events-none relative z-20 flex flex-1 flex-col justify-end px-5 pb-5 align-bottom lg:pb-20 xl:px-20">
        <div className="flex flex-col items-start justify-between lg:flex-row">
          <div className="pointer-events-auto flex max-w-[664px] flex-col lg:self-end">
            <p className="pb-2 text-24 font-600 text-white-95">
              keycard <span className="font-200">shell</span>
            </p>
            <h1 className="flex font-lora text-32 font-400 text-white-95 lg:text-44">
              One secure device,
              <br />
              infinite backups
            </h1>
            <p className="max-w-[435px] pb-8 pt-4 text-20 font-300 text-white-80">
              Unrivalled security with an infinite number of removable Keycards,
              each with their own key.
            </p>
            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
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
    </section>
  )
}

export { Hero }
