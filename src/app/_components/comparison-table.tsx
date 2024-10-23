import { cx } from 'cva'
import React from 'react'
import { Tooltip } from './tooltip'

const Shield = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1252_12446)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6 0.5V2.4062C11.246 2.42007 11.8458 2.45799 12.4 2.5276V1H13.6V2.74837C14.5768 2.99632 15.3706 3.39705 15.9868 4.01324C16.6547 4.68118 17.0695 5.55778 17.3109 6.65H19V7.85H17.5013C17.5527 8.33344 17.582 8.84997 17.5938 9.4H19.5V10.6H17.5938C17.5778 11.3443 17.5299 12.0273 17.4384 12.65H19V13.85H17.1836C16.9326 14.7131 16.5495 15.424 15.9868 15.9868C15.3706 16.603 14.5768 17.0037 13.6 17.2516V19H12.4V17.4724C11.8458 17.542 11.246 17.5799 10.6 17.5938V19.5H9.4V17.5938C8.75401 17.5799 8.15424 17.542 7.6 17.4724V19H6.4V17.2516C5.42319 17.0037 4.62942 16.603 4.01324 15.9868C3.45048 15.424 3.06744 14.7131 2.81637 13.85H1L1 12.65H2.56163C2.47009 12.0273 2.42218 11.3443 2.4062 10.6H0.5V9.4H2.4062C2.41801 8.84997 2.44725 8.33344 2.49865 7.85H1L1 6.65H2.68909C2.93052 5.55778 3.34529 4.68118 4.01324 4.01324C4.62942 3.39705 5.42319 2.99632 6.4 2.74837V1H7.6V2.5276C8.15424 2.45799 8.75401 2.42007 9.4 2.4062V0.5H10.6ZM3.6 10C3.6 7.25657 3.98658 5.73694 4.86176 4.86176C5.73694 3.98658 7.25657 3.6 10 3.6C12.7434 3.6 14.2631 3.98658 15.1382 4.86176C16.0134 5.73694 16.4 7.25657 16.4 10C16.4 12.7434 16.0134 14.2631 15.1382 15.1382C14.2631 16.0134 12.7434 16.4 10 16.4C7.25657 16.4 5.73694 16.0134 4.86176 15.1382C3.98658 14.2631 3.6 12.7434 3.6 10ZM6.6 9.6C6.6 8.83071 6.63205 8.27111 6.71996 7.8532C6.80568 7.4457 6.93406 7.22455 7.09159 7.08102C7.25554 6.93164 7.5208 6.80264 8.0029 6.7174C8.48731 6.63175 9.13076 6.6 10 6.6C10.8704 6.6 11.5102 6.63195 11.9905 6.72244C12.4649 6.81183 12.7244 6.9479 12.8882 7.11176C13.0521 7.27562 13.1882 7.53506 13.2776 8.00953C13.3681 8.48983 13.4 9.1296 13.4 10C13.4 10.8704 13.3681 11.5102 13.2776 11.9905C13.1882 12.4649 13.0521 12.7244 12.8882 12.8882C12.7244 13.0521 12.4649 13.1882 11.9905 13.2776C11.5102 13.3681 10.8704 13.4 10 13.4C9.12843 13.4 8.49237 13.3678 8.01611 13.2726C7.54962 13.1793 7.29458 13.0365 7.12942 12.8567C6.9585 12.6705 6.81633 12.3716 6.72427 11.8319C6.63186 11.2902 6.6 10.5712 6.6 9.6ZM10 5.4C9.11924 5.4 8.38769 5.43075 7.79397 5.53573C7.19795 5.64111 6.68196 5.83086 6.28341 6.19398C5.87844 6.56295 5.66307 7.04805 5.54566 7.60618C5.43045 8.15389 5.4 8.81929 5.4 9.6C5.4 10.5788 5.43064 11.3848 5.54136 12.0337C5.65242 12.6847 5.854 13.242 6.24558 13.6683C6.64292 14.101 7.16913 14.327 7.78077 14.4493C8.38263 14.5697 9.12157 14.6 10 14.6C10.8796 14.6 11.6148 14.5694 12.2127 14.4568C12.8163 14.3431 13.3381 14.1354 13.7368 13.7368C14.1354 13.3381 14.3431 12.8163 14.4568 12.2127C14.5694 11.6148 14.6 10.8796 14.6 10C14.6 9.1204 14.5694 8.38517 14.4568 7.78735C14.3431 7.18369 14.1354 6.66188 13.7368 6.26324C13.3381 5.8646 12.8163 5.65692 12.2127 5.54319C11.6148 5.43055 10.8796 5.4 10 5.4Z"
        fill="white"
        fillOpacity="0.6"
      />
    </g>
    <defs>
      <clipPath id="clip0_1252_12446">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const Check = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none">
      <path
        fill="#FF6400"
        d="m10.7 17.4-.392.454.49.424.385-.522-.483-.356Zm4.2-5.7-.483-.356.483.356Zm-6.4 3.8-.398.45.006.004.392-.454Zm2.683 2.256 4.2-5.7-.966-.712-4.2 5.7.966.712Zm4.2-5.7 4.2-5.7-.966-.712-4.2 5.7.966.712Zm-9.88 1.593 2.6 2.3.795-.898-2.6-2.3-.796.898Zm2.605 2.305 2.2 1.9.784-.908-2.2-1.9-.784.908Z"
      />
    </svg>
  )
}

const Minus = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none">
      <path
        stroke="#fff"
        strokeOpacity=".4"
        strokeWidth="1.2"
        d="m8.5 11.85 8-0"
      />
    </svg>
  )
}
const Info = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      className="ml-2 flex-shrink-0 text-dark-60"
    >
      <path
        fill="#fff"
        fillOpacity=".4"
        fillRule="evenodd"
        d="M3.6 10a6.4 6.4 0 1 1 12.8 0 6.4 6.4 0 0 1-12.8 0ZM10 2.4a7.6 7.6 0 1 0 0 15.2 7.6 7.6 0 0 0 0-15.2Zm-.55 6.1-.2 6h1.5l-.2-6h-1.1Zm-.2-2.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const features: Array<Feature> = [
  {
    name: 'Competitive pricing',
    tooltip: 'Pricing information',
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
    keycardPro: {
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
]

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
  keycardPro: FeatureVariant
  keycard: FeatureVariant
  tangem: FeatureVariant
  ledger: FeatureVariant
}

const ComparisonTable = () => {
  return (
    <section className="mx-auto max-w-[1352px] overflow-x-auto rounded-12 pt-[200px] text-white-95">
      <h1 className="font-lora text-32 text-white-95">
        Going one step further.
      </h1>
      <div className="overflow-hidden pt-20">
        <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] justify-items-center font-lora text-24 font-400">
          <div className="justify-self-start p-4 pb-5">Feature</div>
          <div className="p-4 pb-5">Keycard Pro</div>
          <div className="p-4 pb-5">Keycard</div>
          <div className="p-4 pb-5">Tangem</div>
          <div className="p-4 pb-5">Ledger</div>
        </div>

        <div className="rounded-12 border border-white-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] border-b border-dashed border-white-12 last:border-b-0"
            >
              <div className="flex items-center p-4">
                {feature.name}
                {feature.tooltip && (
                  <Tooltip label={feature.tooltip}>
                    <Info />
                  </Tooltip>
                )}
              </div>
              {(
                ['keycardPro', 'keycard', 'tangem', 'ledger'] as Array<
                  keyof Feature
                >
              ).map((product, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center p-4"
                >
                  {typeof feature[product] === 'object' &&
                    feature[product]?.featured === true && <Check />}
                  {typeof feature[product] === 'object' &&
                    feature[product]?.featured === false && <Minus />}
                  {typeof feature[product] === 'object' &&
                    feature[product]?.featured === 'n/a' && (
                      <p className="text-white-60">n/a</p>
                    )}
                  {typeof feature[product] === 'object' &&
                    feature[product]?.badge && (
                      <div
                        className={cx([
                          'flex w-fit items-center gap-[6px] rounded-[32px] border border-white-12 py-1 pl-3 pr-2 text-16 text-white-95',
                          feature[product]?.badge?.gradient &&
                            'bg-gradient-to-b from-[transparent] to-white-12 pl-2',
                        ])}
                      >
                        {feature[product]?.badge?.icon &&
                          React.createElement(feature[product]?.badge?.icon)}
                        <span>{feature[product]?.badge?.text}</span>
                      </div>
                    )}
                  {typeof feature[product] === 'object' &&
                    feature[product]?.tooltip && (
                      <Tooltip label={feature[product]?.tooltip || ''}>
                        <div className="absolute left-[calc(50%+10px)] flex">
                          <Info />
                        </div>
                      </Tooltip>
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ComparisonTable
