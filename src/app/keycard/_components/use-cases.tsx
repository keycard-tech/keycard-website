import { ButtonLink } from '~components/button-link'
import { Recommended } from '~icons'
import { cx } from 'cva'
import Image from 'next/image'

const cardSets = [
  { count: 3, price: 64, recommended: true },
  { count: 2, price: 48 },
  { count: 1, price: 25 },
]

const useCases: Array<CardProps['data']> = [
  {
    name: 'Vault',
    description: 'Your most precious tokens in a single card',

    cardClassName: 'z-20',
    captionClassName: 'left-16 top-[92px]',
  },
  {
    name: 'Backup',
    description: 'Never worry about losing your Keycards',
    cardClassName: 'z-10 -mt-36',
    captionClassName: 'right-16 top-10',
    inverted: true,
  },
  {
    name: 'Memecoins',
    description: 'Have peace of mind trading memecoins',
    cardClassName: '-mt-40',
    captionClassName: 'left-16 top-[92px]',
  },
]

const UseCases = () => {
  return (
    <div className="pt-[200px] text-white-95">
      <div className="text-center">
        <h2 className="mb-1 font-lora text-32 font-400">
          Many use cases, multiple Keycards
        </h2>
        <p className="mx-auto max-w-[549px] pb-8 text-20 font-300 text-white-60">
          By having different Keycards you can store your most valuable card at
          home while taking your hot wallet with you.
        </p>
        <ButtonLink href="/">Buy Keycard</ButtonLink>

        <div className="flex justify-center gap-3 pb-20 pt-14">
          {cardSets.map((set, index) => (
            <div
              key={index}
              className="flex w-40 flex-col items-start rounded-[20px] border border-white-12 bg-white-3 px-4 py-3"
            >
              <span className="font-300 text-white-60">
                {set.count} card set
              </span>
              <div className="flex w-full items-center justify-between font-lora text-24 font-400">
                ${set.price}
                {set.recommended && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-orange">
                    <Recommended />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <Card data={useCases[0]} />
          <Card data={useCases[1]} />
          <Card data={useCases[2]} />
        </div>
      </div>
    </div>
  )
}

export { UseCases }

const LineGradient = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="484"
      height="2"
      viewBox="0 0 484 2"
    >
      <path stroke="url(#a)" strokeOpacity=".95" d="M484 1H0" />
      <defs>
        <linearGradient
          id="a"
          x1="-10"
          x2="484"
          y1="1.5"
          y2="1.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
      </defs>
    </svg>
  )
}

type CardProps = {
  data: {
    name: string
    description: string
    cardClassName: string
    captionClassName: string
    inverted?: boolean
  }
}

const Card = (props: CardProps) => {
  const { data } = props

  return (
    <div
      className={cx([
        'group relative flex w-full transform justify-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.65)]',
        data.cardClassName,
      ])}
      style={{
        // https://github.com/mdn/browser-compat-data/issues/17726 fixes drop-shadow bug on Safari
        transform: 'translateZ(0)',
      }}
    >
      <Image
        src="/assets/keycard/card.png"
        alt={`Keycard for ${data.name}`}
        width={450}
        height={277}
        className={cx([
          `peer rotate-3 transform transition-all duration-300 hover:rotate-0 hover:scale-110`,
        ])}
      />
      <div
        className={cx([
          'absolute transform transition-transform peer-hover:scale-105',
          data.captionClassName,
        ])}
      >
        <div
          className={cx([
            'flex transform flex-col items-start',
            data.inverted ? 'pl-14 pr-28' : 'pl-28 pr-14',
          ])}
        >
          <h3 className="font-lora text-24 font-500">{data.name}</h3>
          <p className="text-16 text-white-60">{data.description}</p>
        </div>
        <div
          className={cx([
            'flex items-center',
            data.inverted && 'flex-row-reverse',
          ])}
        >
          <div className={data.inverted ? '-scale-x-100 transform' : ''}>
            <LineGradient />
          </div>
          <div className="size-6 rounded-full border border-white-95" />
        </div>
      </div>
    </div>
  )
}
