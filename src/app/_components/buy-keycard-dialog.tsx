'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import { cx } from 'cva'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { Shopify, shopifySchema } from '../_api/validation/shopify'
import { Check, Close, Minus, Plus, Recommended } from '../_icons'
import { Button } from './button'
import { Form } from './form/form'

const bundles: Bundle[] = [
  {
    id: '3-card',
    name: '3 card set',
    price: 64,
    cards: 3,
    image: '/assets/buy/3-card.png',
    tag: 'Best deal',
  },
  {
    id: '2-card',
    name: '2 card set',
    price: 48,
    cards: 2,
    image: '/assets/buy/2-card.png',
  },
  {
    id: '1-card',
    name: '1 card set',
    price: 25,
    cards: 1,
    image: '/assets/buy/1-card.png',
  },
] as const

type Bundle = {
  id: Shopify['bundleId']
  name: string
  price: number
  cards: number
  image: string
  tag?: string
}

type Props = {
  children: React.ReactElement
}

export const BuyKeycardDialog = (props: Props) => {
  const { children } = props

  const [open, setOpen] = useState(false)

  const onSubmit: SubmitHandler<Shopify> = async data => {
    console.log('submitted', data)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-dark-60 backdrop-blur-2xl" />
        <Dialog.Content className="fixed inset-0 top-1/2 z-50 w-full focus:outline-none md:left-1/2 md:!max-w-[1190px] md:-translate-x-1/2 md:-translate-y-1/2">
          <ShopifyForm onSubmit={onSubmit} setOpen={setOpen} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type ShopifyFormProps = {
  onSubmit: SubmitHandler<Shopify>
  setOpen: (open: boolean) => void
}

const ShopifyForm = (props: ShopifyFormProps) => {
  const { onSubmit, setOpen } = props

  const form = useForm<Shopify>({
    resolver: zodResolver(shopifySchema),
    defaultValues: {
      bundleId: '3-card',
      includeKeycardReader: true,
      quantity: 1,
    },
    mode: 'onTouched',
  })

  const {
    formState: { isSubmitting },
    watch,
    setValue,
  } = form

  const submitHandler: SubmitHandler<Shopify> = async data => {
    console.log('submitting', isSubmitting)
    return onSubmit(data)
  }

  const selectedBundle = watch('bundleId')
  const quantity = watch('quantity')
  const includeReader = watch('includeKeycardReader')

  const total = useMemo(() => {
    const bundlePrice = bundles.find(b => b.id === selectedBundle)!.price
    const readerPrice = includeReader ? 5 : 0
    return (bundlePrice + readerPrice) * quantity
  }, [selectedBundle, quantity, includeReader])

  return (
    <div className="grid grid-cols-1 gap-6 overflow-hidden rounded-28 border border-white-12 bg-white-3 p-2 backdrop-blur-[20px] md:grid-cols-2">
      <div className="h-full overflow-hidden rounded-28 bg-dark-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBundle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex h-full items-center justify-center"
          >
            <Image
              src={bundles.find(b => b.id === selectedBundle)!.image}
              alt={`${bundles.find(b => b.id === selectedBundle)!.name} keycard`}
              width={400}
              height={300}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col justify-start p-6">
        <div className="flex items-center justify-between">
          <Dialog.Title className="font-lora text-32">Buy Keycard</Dialog.Title>
          <Button
            variant="secondary"
            size="small"
            className="text-white-95"
            onClick={() => setOpen(false)}
          >
            <Close />
          </Button>
        </div>

        <Form {...form} onSubmit={submitHandler}>
          <div className="pt-10">
            <h3 className="py-3 text-12 text-white-80">SELECT BUNDLE</h3>

            <div className="grid grid-cols-3 gap-6">
              {bundles.map(bundle => {
                const selected = selectedBundle === bundle.id
                console.log('selected', selected)
                return (
                  <button
                    key={bundle.name}
                    type="button"
                    onClick={() => setValue('bundleId', bundle.id)}
                    className={cx([
                      'flex w-40 flex-col justify-between rounded-[20px] border bg-white-3 px-4 py-3',
                      selected
                        ? 'border-orange-dark hover:border-orange'
                        : 'border-white-12 hover:border-white-60',
                    ])}
                  >
                    <span className="font-300 text-white-60">
                      {bundle.cards} card set
                    </span>
                    <div className="flex w-full items-center justify-between font-lora text-24 font-400">
                      ${bundle.price}
                      {bundle.tag && (
                        <span className="flex size-5 items-center justify-center rounded-full bg-orange">
                          <Recommended />
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="pt-8">
            <h3 className="pb-2 text-12 text-white-80">NUMBER OF SETS</h3>
            <div className="flex items-center gap-4 rounded-16 border border-white-12 bg-white-3 p-1">
              <Button
                type="button"
                variant="dark"
                size="small"
                onClick={() => setValue('quantity', Math.max(1, quantity - 1))}
                className="justify-center text-center text-white-100"
              >
                <Minus />
              </Button>
              <span className="flex-1 text-center text-16">{quantity}</span>
              <Button
                type="button"
                variant="dark"
                size="small"
                onClick={() => setValue('quantity', quantity + 1)}
                className="justify-center text-center text-white-100"
              >
                <Plus className="size-5" />
              </Button>
            </div>
          </div>

          <div className="py-8">
            <h3 className="mb-2 text-12 text-white-80">DESKTOP SUPPORT</h3>
            <div className="flex items-center justify-between space-x-3 rounded-16 border border-white-12 bg-white-3 p-4">
              <div className="flex items-center justify-start">
                <Checkbox.Root
                  {...form.register('includeKeycardReader')}
                  id="includeKeycardReader"
                  className="flex size-6 appearance-none items-center justify-center rounded-[8px] bg-white-100 outline-none aria-checked:bg-orange aria-checked:hover:bg-orange-dark [&>svg]:aria-checked:text-white-95"
                  defaultChecked
                >
                  <Checkbox.Indicator className="text-white-95">
                    <Check className="size-4 text-white-95" />
                  </Checkbox.Indicator>
                </Checkbox.Root>

                <label
                  className="ml-3 text-16 font-300 text-white-95"
                  htmlFor="includeKeycardReader"
                >
                  Include USB-C Keycard reader
                </label>
              </div>
              <div className="text-16 font-300 text-white-60">+$5</div>
            </div>
          </div>

          <Button type="submit" className="w-full justify-center font-500">
            Checkout <div className="size-1 rounded-full bg-white-40" /> $
            {total}
          </Button>

          <div className="text-sm text-gray-400 flex items-center justify-between pt-5">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/buy/visa.png"
                alt="Visa"
                width={52}
                height={32}
              />
              <Image
                src="/assets/buy/mastercard.png"
                alt="Mastercard"
                width={52}
                height={32}
              />
              <Image
                src="/assets/buy/apple-pay.png"
                alt="Apple Pay"
                width={52}
                height={32}
              />
              <Image
                src="/assets/buy/google-pay.png"
                alt="Google Pay"
                width={52}
                height={32}
              />
            </div>
            {/* <div className="flex items-center gap-4">
              <span>Prices don't include VAT</span>
              <span>Delivery estimate: 3-5 business days</span>
            </div> */}
          </div>
        </Form>
      </div>
    </div>
  )
}
