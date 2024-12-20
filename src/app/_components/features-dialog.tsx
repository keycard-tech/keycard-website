'use client'

import { CheckIcon, CloseIcon } from '@status-im/icons/20'
import { Button } from '~components/button'
import * as Dialog from '~components/dialog'
import { cx } from 'cva'
import { useState } from 'react'

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
    name: 'Migrate profile to new card',
    mobile: true,
    desktop: true,
  },
  {
    name: 'Log in',
    mobile: true,
    desktop: true,
  },
  {
    name: 'Send and Bridge',
    mobile: true,
    desktop: true,
  },
  {
    name: 'Swap',
    mobile: true,
    desktop: true,
  },
  {
    name: 'dApp interactions',
    mobile: 'Q1 2025',
    desktop: true,
  },
  {
    name: 'Backup',
    mobile: 'Q1 2025',
    desktop: true,
  },
  {
    name: 'Change PIN',
    mobile: 'Q1 2025',
    desktop: true,
  },
  {
    name: 'Unlock',
    mobile: 'Q1 2025',
    desktop: true,
  },
  {
    name: 'Factory reset',
    mobile: 'Q1 2025',
    desktop: true,
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

  const products: Array<keyof Feature> = ['desktop', 'mobile']

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
            <Dialog.Title asChild className="p-6">
              <h3 className="font-lora text-32">Keycard features on Status</h3>
            </Dialog.Title>

            <Dialog.Close asChild>
              <Button
                variant="secondary"
                className="absolute right-5 top-5 z-50 size-10 px-[9px] text-white-95 md:right-6 md:top-6"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <CloseIcon className="size-5" />
              </Button>
            </Dialog.Close>

            <div className="px-6 pt-[10px]">
              <div className="grid grid-cols-[1.33fr,1fr,1fr] justify-items-center text-center font-lora text-24 font-400 text-white-90 lg:grid-cols-[2fr,1fr,1fr] lg:text-24">
                <div className="justify-self-start">Feature</div>
                <div>Desktop</div>
                <div>Mobile</div>
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
  if (variant === true) return <CheckIcon className="text-orange" />
  if (typeof variant === 'string')
    return (
      <p className="whitespace-nowrap text-center text-16 text-white-95">
        {variant}
      </p>
    )
}
