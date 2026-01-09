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
import { getShopifyUrl } from '~/config/routes'
import { CryptoPaymentIcon } from '~components/crypto-payment-icon'
import { Image } from '~components/image'
import { Link } from '~components/link'
import { RecommendedIcon } from '~icons/recommended'
import { cx } from 'cva'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { useMemo, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import { KEYCARD_PRODUCTS, KEYCARD_SHELL } from '../_constants/shopify/products'
import { useCart } from '../_providers/cart-provider'
import { formatPrice } from '../_utils/format-price'
import { Button } from './button'
import * as Dialog from './dialog'
import { Form } from './form/form'
import { Tooltip } from './tooltip'

const formSchema = z
  .object({
    includeKeycardReader: z.boolean(),
    includeShell: z.boolean(),
  })
  .required()

type FormValues = z.infer<typeof formSchema>

type Props = {
  children?: React.ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type BundleKey = Exclude<keyof typeof KEYCARD_PRODUCTS, 'READER'>

const BUNDLE_OPTIONS: BundleKey[] = [
  'ONE_CARD_SET',
  'TWO_CARDS_SET',
  'THREE_CARDS_SET',
]

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
        <ShopifyForm onClose={() => setOpen(false)} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { BuyKeycardDialog }

const ShopifyForm = ({ onClose }: { onClose?: () => void }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      includeKeycardReader: true,
      includeShell: false,
    },
    mode: 'onTouched',
  })
  const { formState } = form
  const { isSubmitting } = formState

  const { addItem } = useCart()
  const locale = useLocale()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [bundleQuantities, setBundleQuantities] = useState<
    Record<BundleKey, number>
  >({
    ONE_CARD_SET: 0,
    TWO_CARDS_SET: 0,
    THREE_CARDS_SET: 1,
  })

  const { field } = useController({
    control: form.control,
    name: 'includeKeycardReader',
  })
  const { field: shellField } = useController({
    control: form.control,
    name: 'includeShell',
  })
  const includeShell = shellField.value
  const shellCompareAt = KEYCARD_SHELL.compareAtPrice
  const showShellDiscount = shellCompareAt > KEYCARD_SHELL.price

  const primaryBundle = useMemo(() => {
    let bestKey: BundleKey = 'THREE_CARDS_SET'
    let bestQuantity = 0

    for (const bundleKey of BUNDLE_OPTIONS) {
      const quantity = bundleQuantities[bundleKey] ?? 0
      if (
        quantity > bestQuantity ||
        (quantity === bestQuantity &&
          KEYCARD_PRODUCTS[bundleKey].cards > KEYCARD_PRODUCTS[bestKey].cards)
      ) {
        bestKey = bundleKey
        bestQuantity = quantity
      }
    }

    return bestQuantity > 0 ? bestKey : 'THREE_CARDS_SET'
  }, [bundleQuantities])

  const total = useMemo(() => {
    const bundlesTotal = BUNDLE_OPTIONS.reduce(
      (sum, bundleKey) =>
        sum + KEYCARD_PRODUCTS[bundleKey].price * bundleQuantities[bundleKey],
      0,
    )
    const readerPrice = 0 // includeReader ? 22 : 0
    const shellPrice = includeShell ? KEYCARD_SHELL.price : 0

    return bundlesTotal + readerPrice + shellPrice
  }, [bundleQuantities, includeShell])

  const selectedBundles = BUNDLE_OPTIONS.filter(
    bundleKey => bundleQuantities[bundleKey] > 0,
  )
  const checkoutEvent =
    selectedBundles.length === 1
      ? KEYCARD_PRODUCTS[selectedBundles[0]].cards === 1
        ? 'buy-keycard'
        : `buy-keycard-bundle-${KEYCARD_PRODUCTS[selectedBundles[0]].cards}`
      : selectedBundles.length > 1
        ? 'buy-keycard-bundle-multi'
        : 'buy-keycard-bundle-none'

  const handleSubmit = async (values: FormValues) => {
    setSubmitError(null)

    const totalBundles = BUNDLE_OPTIONS.reduce(
      (sum, bundleKey) => sum + bundleQuantities[bundleKey],
      0,
    )

    if (totalBundles === 0) {
      setSubmitError('Select at least one Keycard set')
      return
    }

    const lines: Array<{ variantId: string; quantity: number }> = []

    for (const bundleKey of BUNDLE_OPTIONS) {
      const quantity = bundleQuantities[bundleKey]
      if (quantity > 0) {
        lines.push({
          variantId: KEYCARD_PRODUCTS[bundleKey].variantId,
          quantity,
        })
      }
    }

    if (values.includeKeycardReader) {
      lines.push({
        variantId: KEYCARD_PRODUCTS.READER.variantId,
        quantity: 1,
      })
    }

    if (values.includeShell) {
      lines.push({
        variantId: KEYCARD_SHELL.variantId,
        quantity: 1,
      })
    }

    try {
      for (const line of lines) {
        const merchandiseId = `gid://shopify/ProductVariant/${line.variantId}`
        await addItem(merchandiseId, line.quantity)
      }

      onClose?.()
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Unable to update cart',
      )
    }
  }

  return (
    <div className="grid h-svh grid-cols-1 gap-6 overflow-auto bg-white-4 p-5 backdrop-blur-[20px] lg:h-auto lg:grid-cols-2 lg:overflow-clip lg:rounded-28 lg:border lg:border-white-12 lg:p-2">
      <div className="hidden h-full rounded-20 bg-[#0C0C0C] lg:block">
        <AnimatePresence>
          <motion.div
            key={primaryBundle}
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-full items-center justify-center overflow-hidden"
          >
            <Image
              className="w-auto"
              src={KEYCARD_PRODUCTS[primaryBundle].image}
              alt={`${KEYCARD_PRODUCTS[primaryBundle].name} keycard`}
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

        <Form {...form} onSubmit={handleSubmit}>
          <div className="pt-12 lg:pt-10">
            <h3 className="pb-2 text-12 text-white-80 lg:pb-3">SELECT SETS</h3>

            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              {[...BUNDLE_OPTIONS].reverse().map(bundleKey => {
                const product = KEYCARD_PRODUCTS[bundleKey]
                const quantity = bundleQuantities[bundleKey]
                const selected = quantity > 0

                return (
                  <div
                    key={bundleKey}
                    className={cx(
                      'relative flex cursor-pointer flex-col items-start justify-between rounded-20 bg-white-4 px-4 py-3 text-left transition-colors duration-300',
                      selected ? 'outline outline-4 outline-[transparent]' : '',
                    )}
                    onClick={() =>
                      setBundleQuantities(prev => ({
                        ...prev,
                        [bundleKey]: prev[bundleKey] + 1,
                      }))
                    }
                  >
                    <span
                      className={cx([
                        'pointer-events-none absolute z-0 border transition-all',
                        selected
                          ? '-left-1 -top-1 size-[calc(100%+8px)] rounded-24 border-orange-dark'
                          : 'left-0 top-0 size-full rounded-20 border-white-12',
                      ])}
                    />

                    <div className="font-300 text-white-60">
                      {product.cards === 1
                        ? '1 card'
                        : `${product.cards} card set`}
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
                    <div className="mt-3 flex w-full items-center gap-2 rounded-16 border border-white-12 bg-white-4 p-1">
                      <Button
                        type="button"
                        variant="dark"
                        onClick={event => {
                          event.stopPropagation()
                          setBundleQuantities(prev => ({
                            ...prev,
                            [bundleKey]: Math.max(0, prev[bundleKey] - 1),
                          }))
                        }}
                        className="justify-center px-[9px] text-center text-white-100"
                        disabled={quantity === 0}
                        aria-label={`Decrease ${product.cards} card set quantity`}
                      >
                        <RemoveIcon />
                      </Button>
                      <span className="flex-1 text-center text-16">
                        {quantity}
                      </span>
                      <Button
                        type="button"
                        variant="dark"
                        onClick={event => {
                          event.stopPropagation()
                          setBundleQuantities(prev => ({
                            ...prev,
                            [bundleKey]: prev[bundleKey] + 1,
                          }))
                        }}
                        className="justify-center px-[9px] text-center text-white-100"
                        aria-label={`Increase ${product.cards} card set quantity`}
                      >
                        <AddIcon />
                      </Button>
                    </div>
                  </div>
                )
              })}
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

          <div className="pb-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-12 text-white-80">KEYCARD SHELL</h3>
              <Link
                href={getShopifyUrl(locale, '/pages/keycard-shell')}
                className="text-12 text-orange hover:text-orange-dark"
              >
                Learn more about Shell
              </Link>
            </div>
            <div className="flex items-center justify-between space-x-3 rounded-16 border border-white-12 bg-white-4 p-3 pr-4">
              <div className="relative flex items-center justify-start">
                <Checkbox.Root
                  {...form.register('includeShell')}
                  id="includeShell"
                  className="flex size-6 appearance-none items-center justify-center rounded-[8px] border border-white-20 bg-white-4 outline-none aria-checked:bg-orange aria-checked:hover:bg-orange-dark [&>svg]:aria-checked:text-white-95"
                  checked={shellField.value}
                  onCheckedChange={shellField.onChange}
                  aria-label="Add Keycard Shell"
                >
                  <Checkbox.Indicator className="text-white-95">
                    <CheckIcon className="size-5 text-white-95" />
                  </Checkbox.Indicator>
                </Checkbox.Root>

                <label
                  className="ml-3 mr-2 text-16 font-300 text-white-95"
                  htmlFor="includeShell"
                >
                  Add Keycard Shell (includes 2 Keycards)
                </label>
              </div>
              <div className="flex gap-2 text-16 font-300 text-white-80">
                <span className="text-green">
                  {formatPrice({
                    amount: KEYCARD_SHELL.price,
                  })}
                </span>
                {showShellDiscount ? (
                  <span className="text-white-60 line-through">
                    {formatPrice({
                      amount: shellCompareAt,
                    })}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div className="rounded-16 border border-white-12 bg-white-4 p-1">
            {submitError && (
              <div className="mb-2 rounded-12 border border-[rgba(255,80,80,0.3)] bg-[rgba(255,80,80,0.1)] px-3 py-2 text-13 text-red">
                {submitError}
              </div>
            )}
            <Button
              type="submit"
              className="w-full justify-center gap-2 font-500"
              data-umami-event={checkoutEvent}
              data-umami-event-page="buy-keycard-dialog"
              data-umami-event-section="checkout"
              data-umami-event-element="button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoadingIcon className="my-px animate-spin text-white-100" />
              ) : (
                <>
                  Add to cart{' '}
                  <div className="size-1 rounded-full bg-white-40" />
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
                src="/assets/buy/amex.png"
                alt="American Express"
                width={52}
                height={32}
              />
              <CryptoPaymentIcon />
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
