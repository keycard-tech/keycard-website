'use client'

import { Check, Close } from '~icons'
import { cx } from 'cva'
import { useState } from 'react'
import * as Dialog from '../../../_components/dialog'

type Props = {
  children: React.ReactElement
}

const features: Array<Feature> = [
  {
    name: 'Create Status profile',
    mobile: true,
    desktop: true,
  },
  {
    name: 'Log in',
    mobile: true,
    desktop: true,
  },
  {
    name: 'Migrate profile to new card',
    mobile: true,
    desktop: true,
  },
  {
    name: 'Factory reset',
    mobile: 'Q4 2024',
    desktop: true,
  },
  {
    name: 'Multiple wallet accounts',
    mobile: '2025',
    desktop: true,
  },
  {
    name: 'Change PIN',
    mobile: '2025',
    desktop: true,
  },
  {
    name: 'Unlock',
    mobile: '2025',
    desktop: true,
  },
  {
    name: 'Back up',
    mobile: '2025',
    desktop: true,
  },
  {
    name: 'Key pair support',
    mobile: 'Status profile only',
    desktop: 'Any key pair',
  },
] as const

type FeatureVariant = string | true

type Feature = {
  name: string
  mobile: FeatureVariant
  desktop: FeatureVariant
}

const FeaturesDialog = (props: Props) => {
  const { children } = props

  const [open, setOpen] = useState(false)

  const products: Array<keyof Feature> = ['mobile', 'desktop']

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <div
          className={cx(
            'fixed inset-0 z-50 h-full overflow-y-auto focus:outline-none',
            'md:left-1/2 md:top-1/2 md:h-fit md:w-[570px] md:-translate-x-1/2 md:-translate-y-1/2',
          )}
        >
          <div
            className={cx(
              'grid w-full max-w-[570px] overflow-auto border-0 border-white-12 bg-[transparent]',
              'md:rounded-28 md:border md:bg-white-4',
            )}
          >
            <Dialog.Title asChild className="px-6 pt-6">
              <h3 className="font-lora text-32">
                Available features on Status
              </h3>
            </Dialog.Title>

            <Dialog.Close asChild>
              <div className="absolute right-5 top-5 z-50 md:right-6 md:top-6">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-12 border border-white-12 bg-white-4 p-[10px] text-white-100 hover:bg-white-8"
                >
                  <Close />
                </button>
              </div>
            </Dialog.Close>

            <div className="px-6 pt-[34px]">
              <div className="grid grid-cols-[1.33fr,1fr,1fr] justify-items-center text-center font-lora text-24 font-400 text-white-90 lg:grid-cols-[2fr,1fr,1fr] lg:text-24">
                <div className="justify-self-start p-4 pb-0 pl-0">Feature</div>
                <div className="p-4 pb-0">Mobile</div>
                <div className="p-4 pb-0">Desktop</div>
              </div>
              <div className="">
                {features.map((feature, index) => {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-[1.33fr,1fr,1fr] border-b border-dashed border-white-12 font-300 first:pt-2 last:border-b-0 lg:grid-cols-[2fr,1fr,1fr]"
                    >
                      <div className="w-full p-3 first:pl-0 lg:flex lg:items-center">
                        <span className="relative inline whitespace-normal">
                          {feature.name.split(' ').slice(0, -1).join(' ')}{' '}
                          <span className="inline-flex items-center">
                            {feature.name.split(' ').slice(-1)[0]}
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
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { FeaturesDialog }

const FeatureInfo = ({ variant }: { variant: FeatureVariant }) => {
  if (variant === true) return <Check className="text-orange" />
  if (typeof variant === 'string')
    return (
      <p className="whitespace-nowrap text-center text-16 text-white-95">
        {variant}
      </p>
    )
}
