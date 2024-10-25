import { ButtonLink } from '~components/button-link'
import { cx } from 'cva'
import Image from 'next/image'
import React from 'react'

type Props = {
  image: string
  imageClassName: string
  name: string
  secondName?: string
  title: string
  description: string
  buttons: React.ReactNode
  info: string
}

const Section = (props: Props) => {
  const {
    image,
    name,
    title,
    description,
    buttons,
    info,
    imageClassName,
    secondName,
  } = props
  return (
    <div className="relative w-full overflow-clip">
      <div className="absolute inset-0 z-10 h-1/2 w-full bg-gradient-to-b from-dark-100 to-[transparent]" />
      <Image
        src={image}
        alt={name}
        width="900"
        height="600"
        draggable={false}
        className={cx([
          'pointer-events-none absolute left-1/2 top-6 z-20 max-w-[549px] -translate-x-1/2 select-none',
          imageClassName,
        ])}
      />
      <div className="flex size-full flex-col items-center justify-end rounded-28 border border-white-8 bg-white-3 px-[98px] pb-[120px] pt-[300px]">
        <div className="container relative z-10 flex max-w-[434px] flex-col items-center justify-center px-4">
          <p className="pb-2 text-24 font-600 text-white-95">
            {name} <span className="font-200">{secondName}</span>
          </p>
          <h1 className="flex pb-4 text-center font-lora text-48 font-400">
            {title}
          </h1>
          <p className="pb-8 text-center text-20 font-300 text-white-80">
            {description}
          </p>
          <div className="flex space-x-4">{buttons}</div>
          <p className="pt-6 text-16 font-300 text-white-60">{info}</p>
        </div>
      </div>
    </div>
  )
}

const BuyCards = () => {
  return (
    <section className="flex flex-col gap-2 overflow-clip pb-2 pt-[200px] lg:flex-row">
      <Section
        image="/assets/bottom-keycard.png"
        imageClassName="-mb-72 w-full"
        name="keycard"
        title="Best in class secure element"
        description="Something will say here about this product. Certainly, you don't want to miss it."
        buttons={
          <>
            <ButtonLink href="/">Buy Keycard</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Learn more
            </ButtonLink>
          </>
        }
        info="Starts from $25"
      />
      <Section
        image="/assets/bottom-keycard-pro.png"
        imageClassName="-mb-20 w-full"
        name="keycard"
        secondName="pro"
        title="A modular hardware wallet"
        description="Something will say here about this product. Certainly you don't want to miss it"
        buttons={
          <>
            <ButtonLink href="/">Get notified</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Learn more
            </ButtonLink>
          </>
        }
        info="Coming 2025"
      />
    </section>
  )
}

export { BuyCards }
