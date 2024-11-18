import { Button } from '~components/button'
import { GetNotifiedDialog } from '~components/get-notified-dialog'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative flex h-svh overflow-y-clip full-view-port lg:remove-full-view-port xl:h-[986px]">
      <Image
        alt="Keycard Shell"
        src="/assets/keycard-shell/bg-hero-keycard-shell.png"
        width={986}
        height={986}
        priority
        className="absolute left-10 top-1/3 z-0 h-auto w-fit -translate-y-1/2 scale-[120%] bg-contain bg-top bg-no-repeat md:scale-125 lg:left-1/3 lg:-translate-x-1/2"
      />
      <div className="absolute bottom-0 left-0 z-10 h-1/3 w-full bg-gradient-to-b from-[transparent] to-dark-100 lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2" />
      <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-7 align-bottom xl:px-20">
        <p className="pb-2 text-24 font-600">
          keycard <span className="font-200">shell</span>
        </p>
        <div className="flex flex-col items-start justify-between lg:flex-row">
          <div className="flex max-w-[664px] flex-col lg:self-end">
            <h1 className="flex font-lora text-32 font-400 text-white-95 lg:text-48">
              A modular hardware wallet that relies on Keycard as the secure
              element.
            </h1>
          </div>

          <div className="flex h-full max-w-[435px] flex-1 flex-col self-start pt-3 lg:place-content-between">
            <p className="pb-12 text-20 font-300 text-white-80 lg:pb-0 lg:text-right">
              A principle-based hardware wallet that relies on Keycard as a
              modular secure element
            </p>
            <div className="flex flex-row-reverse items-center gap-6 self-start lg:flex-row lg:gap-7 lg:self-end">
              <p className="text-16 font-300 text-white-60">Coming 2025</p>
              <GetNotifiedDialog>
                <Button>Get notified</Button>
              </GetNotifiedDialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
