import { ButtonLink } from '~components/button-link'
import Image from 'next/image'

const Keycards = () => {
  return (
    <section className="relative mx-auto mt-[100px] min-h-[840px] max-w-[1352px] overflow-clip rounded-28 border border-white-12">
      <Image
        src="/assets/keycard-pro/bg-keycards.png"
        alt="Keycards scattered around"
        className="absolute left-0 top-0 size-full object-cover"
        layout="fill"
      />

      <div className="relative z-10 pt-20 text-center">
        <h1 className="font-lora text-32 text-white-95">
          One device.
          <br />
          Multiple Keycards.
        </h1>

        <div className="flex items-center justify-center gap-4 pt-8">
          <ButtonLink href="/">Buy Keycard</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Learn more
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

export { Keycards }
