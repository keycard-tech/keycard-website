import {
  CheckIcon,
  FirmwareIcon,
  InfoIcon,
  RemoveIcon,
} from '@status-im/icons/20'
import { Tag } from '~components/tag'
import { Tooltip } from '~components/tooltip'
import { createElement } from 'react'

const features: Array<Feature> = [
  {
    name: 'Competitive pricing',
    tooltip: 'Pricing information',
    keycard: {
      label: '$25',
    },
    tangem: {
      label: '$55',
    },
    ledger: {
      label: '$80',
    },
  },
  {
    name: 'Compatible with: EVM, Ethereum and Bitcoin',
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
    name: 'Hardware level protection',
    tooltip: 'Security certification level',
    keycard: { badge: { text: 'EAL 6+', gradient: true, icon: FirmwareIcon } },
    tangem: { badge: { text: 'EAL 6+', gradient: true, icon: FirmwareIcon } },
    ledger: { badge: { text: 'EAL 5+' } },
  },
  {
    name: 'Mobile friendly',
    tooltip: 'Compatible with mobile devices',
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
    name: 'Many cards, many keys',
    keycard: {
      featured: true,
      tooltip: 'No limit on master keys',
    },
    tangem: {
      featured: true,
      tooltip: 'No limit on master keys',
    },
    ledger: {
      featured: false,
    },
    tooltip: 'No limit on master keys',
  },
  {
    name: 'Easy back up of master keys',
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
    name: 'Open ecosystem',
    tooltip: 'Part of an open ecosystem',
    keycard: {
      featured: true,
    },
    tangem: {
      featured: false,
    },
    ledger: {
      featured: true,
    },
  },
  {
    name: 'Immutable, open-source secure element',
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
    name: 'Works on mobile and desktop',
    keycard: {
      featured: true,
    },
    tangem: {
      featured: false,
    },
    ledger: {
      featured: true,
    },
  },
] as const

type FeatureVariant = {
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

const TooltipInfo = ({
  variant,
}: {
  variant: FeatureVariant | undefined | string
}) => {
  if (typeof variant === 'string') return null

  if (!variant || !variant.tooltip) return null

  return (
    <Tooltip label={variant.tooltip || ''}>
      <div className="absolute left-[calc(50%+10px)] flex">
        <InfoIcon className="ml-2 flex-shrink-0 text-white-40 transition-colors hover:text-white-60" />
      </div>
    </Tooltip>
  )
}

const ComparisonTable = () => {
  const products: Array<keyof Feature> = ['keycard', 'tangem', 'ledger']

  return (
    <section className="mx-auto max-w-[1352px] pt-[120px] text-white-95 lg:pt-[200px]">
      <h2 className="px-3 font-lora text-32 text-white-95 min-[1512px]:px-0">
        Going one step further.
      </h2>
      <div className="overflow-x-auto px-3 scrollbar-none min-[1512px]:px-0">
        <div className="w-[684px] pt-14 md:w-full lg:w-full lg:pt-20">
          <div className="grid grid-cols-[1.33fr,1fr,1fr,1fr] justify-items-center text-center font-lora text-24 font-400 text-white-90 lg:grid-cols-[2fr,1fr,1fr,1fr] lg:text-24">
            <div className="justify-self-start p-4 pb-5 pl-6">Feature</div>
            <div className="p-4 pb-5">Keycard</div>
            <div className="p-4 pb-5">Tangem</div>
            <div className="p-4 pb-5">Ledger</div>
          </div>

          <div className="rounded-28 border border-white-8 bg-white-4 px-6">
            {features.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-[1.33fr,1fr,1fr,1fr] border-b border-dashed border-white-12 font-300 first:pt-2 last:border-b-0 last:pb-2 lg:grid-cols-[2fr,1fr,1fr,1fr]"
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
                      <TooltipInfo variant={feature[product]} />
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
