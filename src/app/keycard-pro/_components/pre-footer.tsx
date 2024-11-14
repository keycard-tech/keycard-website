import { ButtonLink } from '~components/button-link'
import { cx } from 'cva'
import Image from 'next/image'

const Prefooter = () => {
  return (
    <section className="relative mb-2 mt-28 flex flex-col rounded-28 border border-white-8 bg-white-3 px-5 pb-20 pt-0 full-view-port lg:my-0 lg:flex-row lg:border-0 lg:px-14 lg:pb-0 lg:pt-[200px] lg:remove-full-view-port xl:px-[195px]">
      <div className="relative z-20 flex flex-1 flex-col items-center pt-[265px] text-center lg:items-start lg:pt-0 lg:text-left">
        <p className="pb-2 text-24 font-600 text-white-95">
          keycard <span className="font-200">pro</span>
        </p>
        <h2 className="flex pb-4 font-lora text-32 font-400 text-white-95 md:text-48">
          One device for all <br /> your Keycards
        </h2>
        <p className="max-w-[435px] pb-10 text-20 font-300 text-white-80">
          A principle-based hardware wallet that relies on Keycard as a modular
          secure element.
        </p>
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <ButtonLink href="/">Buy Keycard</ButtonLink>
          <p className="text-16 font-300 text-white-60">From $25</p>
        </div>
      </div>
      <div className="absolute inset-0 z-10 block h-1/2 w-full -translate-y-1 bg-gradient-to-b from-dark-100 to-[transparent] lg:hidden" />
      <Image
        src="/assets/bottom-keycard-pro.png"
        alt="Keycard Pro"
        width={900}
        height={600}
        draggable={false}
        className={cx([
          'pointer-events-none absolute left-1/2 top-0 z-10 max-w-[549px] -translate-x-1/2 select-none lg:relative lg:left-auto lg:top-auto lg:translate-x-0',
          'lg:w-full',
        ])}
      />
    </section>
  )
}

export { Prefooter }
