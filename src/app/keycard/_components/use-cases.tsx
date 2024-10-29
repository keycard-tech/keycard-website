import { ButtonLink } from '~components/button-link'
import { cx } from 'cva'
import Image from 'next/image'

const cardSets = [
  { count: 3, price: 64, recommended: true },
  { count: 2, price: 48 },
  { count: 1, price: 25 },
]

const useCases: Array<CardProps['data']> = [
  {
    name: 'Memecoins',
    description: 'Have peace of mind trading memecoins',
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
    name: 'Vault',
    description: 'Your most precious tokens in a single card',
    cardClassName: '-mt-40',
    captionClassName: 'left-16 top-[92px]',
  },
]

const UseCases = () => {
  return (
    <div className="overflow-hidden pt-[200px] text-white-95">
      <div className="text-center">
        <h2 className="mb-1 font-lora text-32 font-400">
          Many use cases, multiple Keycards
        </h2>
        <p className="mx-auto max-w-[549px] pb-8 font-300 text-white-60">
          Create your own cards with your design. We support with design,
          manufacturing, and fulfilment of your cards.
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
                    <RecommendedIcon />
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

const RecommendedIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none">
      <g clip-path="url(#recommended)">
        <path
          fill="#fff"
          fillOpacity=".95"
          fillRule="evenodd"
          d="M6.39.61 6 .223 5.611.61 3.368 2.854 1.204 1.99.45 1.687V6c0 1.997.236 3.465 1.161 4.39.925.924 2.393 1.16 4.39 1.16 1.995 0 3.463-.236 4.388-1.16.925-.925 1.161-2.393 1.161-4.39V1.688l-.754.302-2.163.865L6.389.611Zm-2.5 3.278L6 1.778l2.111 2.11.257.257.336-.135 1.746-.698V6a13.1 13.1 0 0 1-.102 1.794 3.475 3.475 0 0 0-.254-.224c-.745-.596-2-1.12-4.094-1.12-2.093 0-3.349.524-4.093 1.12-.094.075-.178.15-.254.224-.07-.49-.103-1.08-.103-1.794V3.312l1.746.698.337.135.256-.257ZM2.036 9.127a1.963 1.963 0 0 1 .557-.698c.505-.404 1.5-.88 3.406-.88 1.907 0 2.901.476 3.407.88.255.204.4.401.477.535a1.11 1.11 0 0 1 .08.163c-.101.19-.219.35-.353.484-.575.575-1.607.838-3.61.838-2.005 0-3.037-.263-3.612-.838a1.997 1.997 0 0 1-.352-.484Z"
          clip-rule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="recommended">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
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
