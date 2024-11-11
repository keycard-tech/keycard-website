'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import { cx } from 'cva'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { Shopify, shopifySchema } from '../_api/validation/shopify'
import { KEYCARD_BUNDLES } from '../_constants/shopify/products'
import {
  Check,
  Close,
  Info,
  Labels,
  Loading,
  Minus,
  Plus,
  Recommended,
  World,
} from '../_icons'
import { createCart } from '../actions'
import { Button } from './button'
import { Form } from './form/form'
import { Tooltip } from './tooltip'

const bundles: Bundle[] = [
  {
    id: 'THREE_CARDS',
    name: '3 card set',
    price: 64,
    cards: 3,
    image: '/assets/buy/3-card.png',
    tag: 'Best deal',
  },
  {
    id: 'TWO_CARDS',
    name: '2 card set',
    price: 48,
    cards: 2,
    image: '/assets/buy/2-card.png',
  },
  {
    id: 'ONE_CARD',
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

  const router = useRouter()

  const onSubmit: SubmitHandler<Shopify> = async data => {
    const quantity = data.quantity
    const productId = data.includeKeycardReader
      ? KEYCARD_BUNDLES[data.bundleId].READER.productId
      : KEYCARD_BUNDLES[data.bundleId].NO_READER.productId

    const shopifyCartUrl = await createCart({
      productId,
      quantity: quantity,
    })

    router.push(shopifyCartUrl)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-dark-60 backdrop-blur-2xl" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-[1136px] -translate-x-1/2 -translate-y-1/2 focus:outline-none data-[state=open]:animate-contentShow lg:max-h-[85vh]">
          <Dialog.Description className="sr-only">
            Buy Keycard
          </Dialog.Description>
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
      bundleId: 'THREE_CARDS',
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
    return onSubmit(data)
  }

  const selectedBundle = watch('bundleId')
  const quantity = watch('quantity')
  const includeReader = watch('includeKeycardReader')

  const { field } = useController({
    control: form.control,
    name: 'includeKeycardReader',
  })

  const total = useMemo(() => {
    const bundlePrice = bundles.find(b => b.id === selectedBundle)?.price || 0
    const readerPrice = includeReader ? 5 : 0

    return bundlePrice * quantity + readerPrice
  }, [selectedBundle, quantity, includeReader])

  return (
    <div className="grid grid-cols-1 gap-6 overflow-hidden rounded-28 border border-white-12 bg-white-3 p-2 backdrop-blur-[20px] md:grid-cols-2">
      <div className="h-full overflow-hidden rounded-28 bg-dark-100">
        <AnimatePresence>
          <motion.div
            key={selectedBundle}
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-full items-center justify-center overflow-hidden"
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
            className="px-[9px] text-white-95"
            onClick={() => setOpen(false)}
          >
            <Close className="size-5" />
          </Button>
        </div>

        <Form {...form} onSubmit={submitHandler}>
          <div className="pt-10">
            <h3 className="py-3 text-12 text-white-80">SELECT BUNDLE</h3>

            <div className="grid grid-cols-3 gap-6">
              {bundles.map(bundle => {
                const selected = selectedBundle === bundle.id

                return (
                  <button
                    key={bundle.name}
                    type="button"
                    onClick={() => {
                      setValue('bundleId', bundle.id)
                    }}
                    className={cx([
                      'flex max-w-40 flex-col items-start justify-between rounded-[20px] border bg-white-3 px-4 py-3 text-left',
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
                        <Tooltip label="Best deal">
                          <span className="flex size-5 items-center justify-center rounded-full bg-orange">
                            <Recommended />
                          </span>
                        </Tooltip>
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
                onClick={() => setValue('quantity', Math.max(1, quantity - 1))}
                className="justify-center px-[9px] text-center text-white-100"
              >
                <Minus />
              </Button>
              <span className="flex-1 text-center text-16">{quantity}</span>
              <Button
                type="button"
                variant="dark"
                onClick={() => setValue('quantity', quantity + 1)}
                className="justify-center px-[9px] text-center text-white-100"
              >
                <Plus />
              </Button>
            </div>
          </div>

          <div className="py-8">
            <h3 className="mb-2 text-12 text-white-80">DESKTOP SUPPORT</h3>
            <div className="flex items-center justify-between space-x-3 rounded-16 border border-white-12 bg-white-3 p-4">
              <div className="relative flex items-center justify-start">
                <Checkbox.Root
                  {...form.register('includeKeycardReader')}
                  id="includeKeycardReader"
                  className="flex size-6 appearance-none items-center justify-center rounded-[8px] bg-white-100 outline-none aria-checked:bg-orange aria-checked:hover:bg-orange-dark [&>svg]:aria-checked:text-white-95"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                >
                  <Checkbox.Indicator className="text-white-95">
                    <Check className="size-5 text-white-95" />
                  </Checkbox.Indicator>
                </Checkbox.Root>

                <label
                  className="ml-3 mr-2 text-16 font-300 text-white-95"
                  htmlFor="includeKeycardReader"
                >
                  Include USB-C Keycard reader
                </label>
                <Tooltip
                  label={
                    <>
                      <p className="font-400">
                        For now, some features are only available on Desktop:
                      </p>
                      <ul className="flex list-disc flex-col gap-0.5 pl-4 pt-2">
                        <li className="font-300">Something here</li>
                        <li className="font-300">Amazing feature here</li>
                        <li className="font-300">Great stuff here</li>
                      </ul>
                    </>
                  }
                >
                  <div className="flex">
                    <Info className="flex-shrink-0 text-white-40 transition-colors hover:text-white-60" />
                  </div>
                </Tooltip>
              </div>
              <div className="text-16 font-300 text-white-60">+$5</div>
            </div>
          </div>

          <Button type="submit" className="w-full justify-center font-500">
            {isSubmitting ? (
              <Loading className="my-px animate-spin text-white-100" />
            ) : (
              <>
                Checkout <div className="size-1 rounded-full bg-white-40" /> $
                {total}
              </>
            )}
          </Button>

          <div className="pt-5">
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
            <div className="mt-10 flex items-center gap-4 rounded-16 border border-dashed border-white-12 bg-white-3 px-4 py-[14px] text-14 text-white-60">
              <span className="flex">
                <Labels className="mr-1 shrink-0" /> Prices don&apos;t include
                VAT
              </span>
              <div className="size-1 rounded-full bg-white-40" />

              <span className="flex">
                <World className="mr-1 shrink-0" />
                Delivery estimate: 3-5 business days
              </span>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
