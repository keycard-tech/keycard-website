import { CheckIcon, InfoIcon, RemoveIcon } from '@status-im/icons/20'
import { Tag } from '~components/tag'
import { Tooltip } from '~components/tooltip'
import { createElement } from 'react'

const features: Array<Feature> = [
  {
    name: 'ETH chains and BTC',
    tooltip: 'Supports Ethereum, any EVM chains (L2s), BTC, BTC multisigs',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: true,
    },
    tangem: {
      featured: true,
    },
    ledger: {
      featured: true,
    },
  },
  {
    name: 'Many cards, many keys',
    tooltip:
      'Unlimited number of cards can be used with different keys for ease of use and backups',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: true,
    },
    tangem: {
      featured: true,
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: "Card can't export private keys",
    tooltip:
      'Private keys can never get out of the card. The card is a secure enclave that stores private keys, and performs sigatures.',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: true,
    },
    tangem: {
      featured: true,
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'Card cannot be upgraded',
    tooltip:
      'The behaviour of the card will never change since the software element is immutably not upgradable. Your keys will never be able to get out of the secure enclave. ',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: true,
    },
    tangem: {
      featured: false,
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'Full open source design',
    tooltip: 'Software, hardware, casing',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: true,
    },
    tangem: {
      featured: false,
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'Use your card with other wallets',
    tooltip: 'Keycard is integrated in a number of wallets and tools',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: true,
    },
    tangem: {
      featured: false,
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'No vendor specific application needed',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: true,
    },
    tangem: {
      featured: false,
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'Open and expandable ecosystem',
    tooltip:
      'Developers and manufacturers can build on top to grow the ecosystem and benefit from it',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: true,
    },
    tangem: {
      featured: false,
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'Compatible with 10+ wallets',
    tooltip: 'Can be used with any wallet compatible with QR (EVM or BTC)',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: false,
    },
    tangem: {
      featured: false,
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'Clear signing',
    tooltip:
      'Full decoding of EIP-712 messages, ABI decoding of transactions, and dedicated tools for Safe transactions decoding',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: false,
    },
    tangem: {
      featured: false,
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'Airgap capable',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: false,
    },
    tangem: {
      featured: false,
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'Camera to scan QRs',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: false,
    },
    tangem: {
      featured: false,
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'Removable battery',
    tooltip:
      "Your product will never die because of its battery since it's easy to change",
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: false,
    },
    tangem: {
      featured: false,
    },
    ledger: {
      featured: false,
    },
  },
] as const

type FeatureVariant = {
  promo?: {
    current: string
    previous: string
  }
  label?: string
  badge?: {
    text: string
    icon?: React.FC
    gradient?: boolean
  }
  featured?: boolean | 'n/a'
  tooltip?: string
}

type Feature = {
  name: string
  tooltip?: string
  keycardShell: FeatureVariant
  keycard: FeatureVariant
  tangem: FeatureVariant
  ledger: FeatureVariant
}

const FeatureInfo = ({
  variant,
}: {
  variant: FeatureVariant | undefined | string
}) => {
  if (!variant || typeof variant === 'string') return null

  if (variant.featured === true) return <CheckIcon className="text-orange" />
  if (variant.featured === false)
    return <RemoveIcon className="size-4 text-white-60" />
  if (variant.featured === 'n/a') return <p className="text-white-60">n/a</p>
  if (variant.label) return <p className="text-white-95">{variant.label}</p>
  if (variant.promo) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-green">{variant.promo.current}</p>
        <p className="text-white-95 line-through">{variant.promo.previous}</p>
      </div>
    )
  }
  if (variant.badge) {
    return (
      <Tag
        gradient={variant.badge.gradient}
        icon={variant.badge.icon && createElement(variant.badge.icon)}
        size="small"
      >
        {variant.badge.text}
      </Tag>
    )
  }
}

const ComparisonTable = () => {
  const products: Array<keyof Feature> = [
    'keycardShell',
    'keycard',
    'tangem',
    'ledger',
  ]

  return (
    <section className="mx-auto max-w-[1352px] pt-[120px] text-white-95 lg:pt-[200px]">
      <h2 className="px-3 font-lora text-32 text-white-95 min-[1512px]:px-0">
        Going one step further.
      </h2>
      <div className="overflow-x-auto px-3 scrollbar-none min-[1512px]:px-0">
        <div className="w-[684px] pt-14 md:w-full lg:w-full lg:pt-20">
          <div className="grid grid-cols-[1.33fr,1fr,1fr,1fr,1fr] justify-items-center text-center font-lora text-24 font-400 text-white-90 lg:grid-cols-[2fr,1fr,1fr,1fr,1fr] lg:text-24">
            <div className="justify-self-start p-4 pb-5 pl-6">Feature</div>
            <div className="p-4 pb-5">Shell</div>
            <div className="p-4 pb-5">Keycard</div>
            <div className="p-4 pb-5">Tangem</div>
            <div className="p-4 pb-5">Ledger Nano X</div>
          </div>

          <div className="rounded-28 border border-white-8 bg-white-4 px-6">
            {features.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-[1.33fr,1fr,1fr,1fr,1fr] border-b border-dashed border-white-12 font-300 first:pt-2 last:border-b-0 last:pb-2 lg:grid-cols-[2fr,1fr,1fr,1fr,1fr]"
                >
                  <div className="w-full p-5 first:pl-0 lg:flex lg:items-center">
                    <span className="relative inline whitespace-normal">
                      {feature.name.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="inline-flex items-center">
                        {feature.name.split(' ').slice(-1)[0]}
                        {feature.tooltip && (
                          <Tooltip label={feature.tooltip}>
                            <InfoIcon className="ml-2 flex-shrink-0 text-white-40 transition-colors hover:text-white-60" />
                          </Tooltip>
                        )}
                      </span>
                    </span>
                  </div>
                  {products.map(product => (
                    <div
                      key={product}
                      className="relative flex items-center justify-center last:pr-0"
                    >
                      <FeatureInfo variant={feature[product]} />
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export { ComparisonTable }
