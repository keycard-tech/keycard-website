'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as Checkbox from '@radix-ui/react-checkbox'
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  InfoIcon,
  LabelsIcon,
  LoadingIcon,
  RemoveIcon,
  WorldIcon,
} from '@status-im/icons/20'
import { Image } from '~components/image'
import { RecommendedIcon } from '~icons/recommended'
import { cx } from 'cva'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import { KEYCARD_PRODUCTS } from '../_constants/shopify/products'
import { useShopifyUTMParamsContext } from '../_providers/shopify-utm-params-provider'
import { formatPrice } from '../_utils/format-price'
import { Button } from './button'
import * as Dialog from './dialog'
import { Form } from './form/form'
import { Tooltip } from './tooltip'

const formSchema = z
  .object({
    bundleId: z.enum(['ONE_CARD_SET', 'TWO_CARDS_SET', 'THREE_CARDS_SET']),
    quantity: z.number(),
    includeKeycardReader: z.boolean(),
  })
  .required()

type FormValues = z.infer<typeof formSchema>

function createCheckoutUrl(values: FormValues, utmParams: URLSearchParams) {
  const url = new URL(
    `https://get.keycard.tech/cart/${KEYCARD_PRODUCTS[values.bundleId].variantId}:${values.quantity}`,
  )

  if (values.includeKeycardReader) {
    const readerVariant = `${KEYCARD_PRODUCTS.READER.variantId}:1`
    url.pathname += `,${readerVariant}`
  }

  utmParams.forEach((value, key) => {
    url.searchParams.append(key, value)
  })

  return url.toString()
}

type Props = {
  children?: React.ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const BuyKeycardDialog = (props: Props) => {
  const { children, ...rest } = props

  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} {...rest}>
      {children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}
      <Dialog.Content
        onOpenAutoFocus={event => {
          event.preventDefault()

          const element = event.target as HTMLElement
          element.focus()
        }}
        className="fixed left-1/2 top-1/2 z-50 max-h-screen w-screen max-w-[1136px] -translate-x-1/2 -translate-y-1/2 overflow-auto focus:outline-none data-[state=open]:animate-contentShow lg:w-[90vw] lg:overflow-hidden"
      >
        <Dialog.Description className="sr-only">Buy Keycard</Dialog.Description>
        <ShopifyForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { BuyKeycardDialog }

const ShopifyForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bundleId: 'THREE_CARDS_SET',
      includeKeycardReader: true,
      quantity: 1,
    },
    mode: 'onTouched',
  })
  const { formState, watch, setValue } = form
  const { isSubmitting } = formState

  const router = useRouter()
  const utmParams = useShopifyUTMParamsContext()

  const selectedBundle = watch('bundleId')
  const quantity = watch('quantity')

  const { field } = useController({
    control: form.control,
    name: 'includeKeycardReader',
  })

  const total = useMemo(() => {
    const bundlePrice = KEYCARD_PRODUCTS[selectedBundle].price
    const readerPrice = 0 // includeReader ? 22 : 0

    return bundlePrice * quantity + readerPrice
  }, [selectedBundle, quantity])

  return (
    <div className="grid h-svh grid-cols-1 gap-6 overflow-auto bg-white-4 p-5 backdrop-blur-[20px] lg:h-auto lg:grid-cols-2 lg:overflow-clip lg:rounded-28 lg:border lg:border-white-12 lg:p-2">
      <div className="hidden h-full rounded-20 bg-[#0C0C0C] lg:block">
        <AnimatePresence>
          <motion.div
            key={selectedBundle}
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-full items-center justify-center overflow-hidden"
          >
            <Image
              className="w-auto"
              src={KEYCARD_PRODUCTS[selectedBundle].image}
              alt={`${KEYCARD_PRODUCTS[selectedBundle].name} keycard`}
              width={400}
              height={300}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col justify-start lg:p-6 lg:pl-0">
        <div className="flex items-center justify-between">
          <Dialog.Title className="font-lora text-32">Buy Keycard</Dialog.Title>
          <Dialog.Close asChild>
            <Button
              variant="secondary"
              className="size-10 px-[9px] text-white-95"
              aria-label="Close"
            >
              <CloseIcon className="size-5" />
            </Button>
          </Dialog.Close>
        </div>

        <Form {...form} onSubmit={() => {}}>
          <div className="pt-12 lg:pt-10">
            <h3 className="pb-2 text-12 text-white-80 lg:pb-3">
              SELECT BUNDLE
            </h3>

            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              {Object.entries(KEYCARD_PRODUCTS)
                .filter(([title]) => title !== 'READER')
                .map(([title, product]) => {
                  const selected = selectedBundle === title

                  return (
                    <button
                      key={title}
                      type="button"
                      onClick={() => {
                        setValue('bundleId', title as FormValues['bundleId'])
                      }}
                      className={cx(
                        'relative flex flex-col items-start justify-between rounded-20 bg-white-4 px-4 py-3 text-left transition-colors duration-300 hover:[&>span]:-left-1 hover:[&>span]:-top-1 hover:[&>span]:size-[calc(100%+8px)] hover:[&>span]:rounded-[24px]',
                        selected
                          ? 'outline outline-4 outline-[transparent]'
                          : '',
                      )}
                    >
                      <span
                        className={cx([
                          'absolute z-0 border transition-all',
                          selected
                            ? '-left-1 -top-1 size-[calc(100%+8px)] rounded-[24px] border-orange-dark'
                            : 'left-0 top-0 size-full rounded-20 border-white-12',
                        ])}
                      />

                      <div className="font-300 text-white-60">
                        {product.cards} card set
                      </div>
                      <div className="flex w-full items-center justify-between font-lora text-24 font-400">
                        {formatPrice({
                          amount: Number(product.price),
                        })}
                        {!!product.tag && (
                          <Tooltip label={product.tag}>
                            <div className="z-50 flex size-5 items-center justify-center rounded-full bg-orange">
                              <RecommendedIcon />
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    </button>
                  )
                })
                .reverse()}
            </div>
          </div>

          <div className="pt-8">
            <h3 className="pb-2 text-12 text-white-80">NUMBER OF SETS</h3>
            <div className="flex items-center gap-4 rounded-16 border border-white-12 bg-white-4 p-1">
              <Button
                type="button"
                variant="dark"
                onClick={() => setValue('quantity', Math.max(1, quantity - 1))}
                className="justify-center px-[9px] text-center text-white-100"
                disabled={quantity === 1}
                aria-label="Decrease quantity"
              >
                <RemoveIcon />
              </Button>
              <span className="flex-1 text-center text-16">{quantity}</span>
              <Button
                type="button"
                variant="dark"
                onClick={() => setValue('quantity', quantity + 1)}
                className="justify-center px-[9px] text-center text-white-100"
                aria-label="Increase quantity"
              >
                <AddIcon />
              </Button>
            </div>
          </div>

          <div className="py-8">
            <h3 className="mb-2 text-12 text-white-80">DESKTOP SUPPORT</h3>
            <div className="flex items-center justify-between space-x-3 rounded-16 border border-white-12 bg-white-4 p-3 pr-4">
              <div className="relative flex items-center justify-start">
                <Checkbox.Root
                  {...form.register('includeKeycardReader')}
                  id="includeKeycardReader"
                  className="flex size-6 appearance-none items-center justify-center rounded-[8px] border border-white-20 bg-white-4 outline-none aria-checked:bg-orange aria-checked:hover:bg-orange-dark [&>svg]:aria-checked:text-white-95"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label="Include USB-C Keycard reader"
                >
                  <Checkbox.Indicator className="text-white-95">
                    <CheckIcon className="size-5 text-white-95" />
                  </Checkbox.Indicator>
                </Checkbox.Root>

                <label
                  className="ml-3 mr-2 text-16 font-300 text-white-95"
                  htmlFor="includeKeycardReader"
                >
                  Include Keycard Reader (USB-C)
                </label>
                <Tooltip
                  label={
                    <>
                      <p className="mb-2.5 font-400">
                        For now, some features are only available via the Status
                        Desktop app:
                      </p>
                      <ul className="grid list-disc gap-0.5 pl-4">
                        <li className="font-300">
                          Support for multiple wallet accounts
                        </li>
                        <li className="font-300">
                          Support for non Status profile key pairs
                        </li>
                        <li className="font-300">Factory reset</li>
                        <li className="font-300">Change PIN</li>
                        <li className="font-300">Unlock</li>
                        <li className="font-300">Backup</li>
                      </ul>
                    </>
                  }
                >
                  <div className="flex">
                    <InfoIcon className="flex-shrink-0 text-white-40 transition-colors hover:text-white-60" />
                  </div>
                </Tooltip>
              </div>
              <div className="flex gap-2 text-16 font-300 text-white-80">
                <span className="text-green">Free</span>
                <span className="line-through">
                  {' '}
                  {formatPrice({
                    amount: Number(KEYCARD_PRODUCTS.READER.price),
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-16 border border-white-12 bg-white-4 p-1">
            <Button
              className="w-full justify-center font-500"
              onClick={() => {
                const checkoutUrl = createCheckoutUrl(
                  form.getValues(),
                  utmParams,
                )
                window.open(checkoutUrl, '_blank', 'noopener')
                router.push(`/thank-you?checkoutUrl=${checkoutUrl}`)
              }}
            >
              {isSubmitting ? (
                <LoadingIcon className="my-px animate-spin text-white-100" />
              ) : (
                <>
                  Checkout <div className="size-1 rounded-full bg-white-40" />
                  {formatPrice({
                    amount: total,
                  })}
                </>
              )}
            </Button>
          </div>

          <div className="pb-1 pt-5 lg:pb-0">
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
            <div className="mt-10 flex flex-col items-center gap-[10px] rounded-16 border border-dashed border-white-12 bg-white-4 px-4 py-[14px] text-14 text-white-60 lg:flex-row lg:justify-center lg:gap-2">
              <div className="flex items-center">
                <LabelsIcon className="mr-1 shrink-0 text-white-95" /> Prices
                don&apos;t include VAT
              </div>
              <div className="hidden size-1 rounded-full bg-white-40 lg:block" />

              <div className="flex items-center">
                <WorldIcon className="mr-1 shrink-0 text-white-95" />
                Express shipping (3-5 days) available
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
