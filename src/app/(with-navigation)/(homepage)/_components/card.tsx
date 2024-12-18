import { Image } from '~components/image'
import { cx } from 'cva'
import { LineGradient } from './linear-gradients'

type Props = {
  data: {
    name: string
    description: string
    cardClassName: string
    captionClassName: string
    inverted?: boolean
  }
}

const Card = (props: Props) => {
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

export { Card }
export type { Props as CardProps }
