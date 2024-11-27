import { Tag } from '~components/tag'
import { Tooltip } from '~components/tooltip'
import { Check, Info, Minus, Shield } from '~icons'
import { createElement } from 'react'

const features: Array<Feature> = [
  {
    name: 'Competitive pricing',
    tooltip: 'Pricing information',
    keycardShell: {
      label: 'TBD',
    },
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
    name: 'EVM chain compatible',
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
    name: 'Bitcoin compatible',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: true,
      tooltip: 'Bitcoin only',
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
    keycardShell: {
      badge: {
        text: 'EAL 6+',
        gradient: true,
        icon: Shield,
      },
    },
    keycard: { badge: { text: 'EAL 6+', gradient: true, icon: Shield } },
    tangem: { badge: { text: 'EAL 6+', gradient: true, icon: Shield } },
    ledger: { badge: { text: 'EAL 5+' } },
  },
  {
    name: 'Mobile friendly',
    tooltip: 'Compatible with mobile devices',
    keycardShell: {
      featured: true,
      tooltip: 'iOS and Android',
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
    name: 'Unlimited master keys',
    keycardShell: {
      featured: true,
    },
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
    name: 'Open ecosystem',
    tooltip: 'Part of an open ecosystem',
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
      featured: true,
    },
  },
  {
    name: 'Open source secure element',
    keycardShell: {
      featured: true,
      tooltip: 'Secure element is open source',
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
    name: "Secure element can't be upgraded",
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: false,
    },
    tangem: {
      featured: false,
      tooltip: 'Not applicable',
    },
    ledger: {
      featured: false,
      tooltip: 'Not applicable',
    },
  },
  {
    name: 'QR transaction signing with any wallet',
    tooltip: 'Sign transactions using QR codes',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: true,
      tooltip: 'Only with Keycard wallet',
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
    tooltip: 'Can operate without direct connection',
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
    name: 'Modular architecture',
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
    name: 'Secure element has its own usages',
    keycardShell: {
      featured: true,
      tooltip: 'Multiple use cases for secure element',
    },
    keycard: {
      featured: 'n/a',
    },
    tangem: {
      featured: 'n/a',
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'Can be used with future signing schemes',
    tooltip: 'Future-proof design',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: 'n/a',
    },
    tangem: {
      featured: 'n/a',
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'Removable battery',
    tooltip: 'Battery can be replaced',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: 'n/a',
      tooltip: 'Not applicable',
    },
    tangem: {
      featured: 'n/a',
      tooltip: 'Not applicable',
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'USBC + Camera',
    keycardShell: {
      featured: true,
    },
    keycard: {
      featured: 'n/a',
    },
    tangem: {
      featured: 'n/a',
    },
    ledger: {
      featured: false,
    },
  },
  {
    name: 'Oshwa label',
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

  if (variant.featured === true) return <Check className="text-orange" />
  if (variant.featured === false)
    return <Minus className="size-4 text-white-60" />
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
        <Info className="ml-2 flex-shrink-0 text-white-40 transition-colors hover:text-white-60" />
      </div>
    </Tooltip>
  )
}

const ComparisonTable = () => {
  const products: Array<keyof Feature> = [
    'keycardShell',
    'keycard',
    'tangem',
    'ledger',
  ]

  return (
    <section className="mx-auto max-w-[1352px] overflow-x-hidden pt-[120px] text-white-95 lg:pt-[200px]">
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
            <div className="p-4 pb-5">Ledger</div>
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
                            <Info className="ml-2 flex-shrink-0 text-white-40 transition-colors hover:text-white-60" />
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
