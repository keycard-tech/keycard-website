import { ButtonLink } from '~components/button-link'
import Image from 'next/image'

const Customisation = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center bg-gradient-to-b from-[transparent] to-white-8 px-5 pt-[120px] text-center full-view-port lg:px-6 lg:pt-[200px]">
        <h2 className="pb-2 font-lora text-32 text-white-95">
          Your brand, same Keycard
        </h2>
        <p className="max-w-[549px] pb-8 text-center text-20 font-300 text-white-60">
          Create your own cards with your design. We support with design,
          manufacturing, and fulfilment of your cards.
        </p>
        <ButtonLink href="/">Order custom Keycard</ButtonLink>
        <Image
          src="/assets/keycard/customisation.png"
          alt="Custom Keycard"
          width={792}
          height={400}
          className="pt-20"
        />
      </section>
    </>
  )
}

export { Customisation }
