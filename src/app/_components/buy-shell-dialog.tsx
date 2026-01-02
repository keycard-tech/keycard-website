'use client'

import {
  AddIcon,
  CloseIcon,
  KeycardCardIcon,
  LabelsIcon,
  LoadingIcon,
  RemoveIcon,
  WorldIcon,
} from '@status-im/icons/20'
import { getShopifyUrl } from '~/config/routes'
import { CryptoPaymentIcon } from '~components/crypto-payment-icon'
import { Image } from '~components/image'
import { Link } from '~components/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { KEYCARD_PRODUCTS, KEYCARD_SHELL } from '../_constants/shopify/products'
import { useCart } from '../_providers/cart-provider'
import { formatPrice } from '../_utils/format-price'
import { Button } from './button'
import * as Dialog from './dialog'

type BundleKey = Exclude<keyof typeof KEYCARD_PRODUCTS, 'READER'>

const BUNDLE_OPTIONS: BundleKey[] = [
  'ONE_CARD_SET',
  'TWO_CARDS_SET',
  'THREE_CARDS_SET',
]

const buildBundlePlan = (cardCount: number) => {
  const bundles = BUNDLE_OPTIONS.map(bundleKey => ({
    key: bundleKey,
    cards: KEYCARD_PRODUCTS[bundleKey].cards,
    price: KEYCARD_PRODUCTS[bundleKey].price,
  }))
  const bestCost = Array.from({ length: cardCount + 1 }, () => Infinity)
  const choice: Array<BundleKey | null> = Array.from(
    { length: cardCount + 1 },
    () => null,
  )
  bestCost[0] = 0

  for (let i = 1; i <= cardCount; i += 1) {
    for (const bundle of bundles) {
      if (i >= bundle.cards) {
        const cost = bestCost[i - bundle.cards] + bundle.price
        if (cost < bestCost[i]) {
          bestCost[i] = cost
          choice[i] = bundle.key
        }
      }
    }
  }

  const counts: Partial<Record<BundleKey, number>> = {}
  let remaining = cardCount

  while (remaining > 0) {
    const picked = choice[remaining]
    if (!picked) break
    counts[picked] = (counts[picked] ?? 0) + 1
    remaining -= KEYCARD_PRODUCTS[picked].cards
  }

  const totalPrice = Number.isFinite(bestCost[cardCount])
    ? bestCost[cardCount]
    : 0
  const regularPrice = cardCount * KEYCARD_PRODUCTS.ONE_CARD_SET.price

  const breakdown = [...BUNDLE_OPTIONS]
    .sort((a, b) => KEYCARD_PRODUCTS[b].cards - KEYCARD_PRODUCTS[a].cards)
    .map(bundleKey => {
      const quantity = counts[bundleKey] ?? 0
      if (quantity <= 0) return null
      const cardCount = KEYCARD_PRODUCTS[bundleKey].cards
      const label = cardCount === 1 ? '1 card' : `${cardCount}-card`
      return `${quantity}× ${label}`
    })
    .filter(Boolean)
    .join(', ')

  return {
    counts,
    totalPrice,
    regularPrice,
    breakdown: breakdown || 'No add-ons',
  }
}

type Props = {
  children?: React.ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const BuyShellDialog = (props: Props) => {
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
        <Dialog.Description className="sr-only">Buy Shell</Dialog.Description>
        <Content onClose={() => setOpen(false)} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { BuyShellDialog }

const Content = ({ onClose }: { onClose?: () => void }) => {
  const { addItem } = useCart()
  const locale = useLocale()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cardCount, setCardCount] = useState(0)

  const bundlePlan = buildBundlePlan(cardCount)
  const total = KEYCARD_SHELL.price + bundlePlan.totalPrice
  const showBreakdown = cardCount > 0 && bundlePlan.breakdown !== 'No add-ons'
  const showSavings =
    cardCount > 0 && bundlePlan.regularPrice > bundlePlan.totalPrice

  const handleAddToCart = async () => {
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const lines: Array<{ variantId: string; quantity: number }> = [
        { variantId: KEYCARD_SHELL.variantId, quantity: 1 },
      ]

      for (const bundleKey of BUNDLE_OPTIONS) {
        const quantity = bundlePlan.counts[bundleKey] ?? 0
        if (quantity > 0) {
          lines.push({
            variantId: KEYCARD_PRODUCTS[bundleKey].variantId,
            quantity,
          })
        }
      }

      for (const line of lines) {
        const merchandiseId = `gid://shopify/ProductVariant/${line.variantId}`
        await addItem(merchandiseId, line.quantity)
      }
      onClose?.()
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Unable to update cart',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid h-svh grid-cols-1 gap-6 overflow-auto bg-white-4 p-5 backdrop-blur-[20px] lg:h-auto lg:grid-cols-2 lg:overflow-clip lg:rounded-28 lg:border lg:border-white-12 lg:p-2">
      <div className="relative hidden rounded-20 bg-[#010101] lg:block lg:max-h-[70vh] lg:p-4">
        <AnimatePresence>
          <motion.div
            key="shell"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-full items-center justify-center overflow-hidden"
          >
            <Image
              src="/assets/keycard-shell.gif"
              alt="Keycard Shell (animated)"
              className="h-auto max-h-[48vh] w-full max-w-[336px] object-contain lg:max-w-[448px]"
              width={1052}
              height={768}
              unoptimized
              priority
              sizes="(min-width:1024px) 448px, 90vw"
            />
          </motion.div>
        </AnimatePresence>
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-12 font-300 text-white-60">
          Final product may vary from promotional images
        </p>
      </div>

      <div className="flex flex-col justify-start lg:p-4 lg:pl-0">
        <div className="flex justify-between lg:items-center">
          <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center">
            <Dialog.Title className="font-lora text-32">Buy Shell</Dialog.Title>
          </div>
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

        <div className="pt-5 lg:pt-10">
          <div className="rounded-16 bg-white-4 px-4 py-3">
            <p className="pb-0.5 font-300 text-white-60">Price</p>
            <div className="flex items-center gap-2 font-lora">
              <p className="text-24 text-green">
                {formatPrice({
                  amount: KEYCARD_SHELL.price,
                })}
              </p>
            </div>
            <div className="flex items-center gap-[6px] pt-4 font-300">
              <KeycardCardIcon className="text-white-60" /> Includes 2 Keycards
            </div>
          </div>
        </div>

        <div className="pt-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-12 uppercase text-white-80">
              Add extra Keycards
            </h3>
            <Link
              href={getShopifyUrl(locale, '/pages/keycard')}
              className="text-12 text-orange hover:text-orange-dark"
            >
              Learn more about Keycard
            </Link>
          </div>
          <div className="rounded-16 border border-white-12 bg-white-4 p-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-12 text-white-60">Cards</span>
              <div className="flex items-center gap-2 rounded-full border border-white-12 bg-white-4 px-3 py-1.5">
                <button
                  type="button"
                  className="rounded-full p-1 transition-colors hover:bg-white-12"
                  onClick={() => setCardCount(count => Math.max(0, count - 1))}
                  aria-label="Decrease number of cards"
                >
                  <RemoveIcon className="size-[14px]" />
                </button>
                <span className="min-w-[28px] text-center text-14 font-600">
                  {cardCount}
                </span>
                <button
                  type="button"
                  className="rounded-full p-1 transition-colors hover:bg-white-12"
                  onClick={() => setCardCount(count => count + 1)}
                  aria-label="Increase number of cards"
                >
                  <AddIcon className="size-[14px]" />
                </button>
              </div>
              <span className="text-12 text-white-60">
                {formatPrice({
                  amount: bundlePlan.totalPrice,
                })}
              </span>
              <span className="ml-auto flex items-center gap-2 text-12 text-white-60">
                <span>Added: {cardCount}</span>
                {showBreakdown ? (
                  <span
                    className="max-w-[200px] truncate"
                    title={bundlePlan.breakdown}
                  >
                    • {bundlePlan.breakdown}
                  </span>
                ) : null}
                {showSavings ? (
                  <span className="text-green">
                    • Save{' '}
                    {formatPrice({
                      amount: bundlePlan.regularPrice - bundlePlan.totalPrice,
                    })}
                  </span>
                ) : null}
              </span>
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
            type="button"
            className="w-full justify-center gap-2 font-500"
            data-umami-event="buy-shell"
            data-umami-event-page="buy-shell-dialog"
            data-umami-event-section="checkout"
            data-umami-event-element="button"
            onClick={handleAddToCart}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoadingIcon className="my-px animate-spin text-white-100" />
            ) : (
              <>
                Add to cart <div className="size-1 rounded-full bg-white-40" />
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
              <LabelsIcon className="mr-1 shrink-0 text-white-95" /> Price
              doesn&apos;t include VAT
            </div>
            <div className="hidden size-1 rounded-full bg-white-40 lg:block" />

            <div className="flex items-center">
              <WorldIcon className="mr-1 shrink-0 text-white-95" />
              Ships in 3-10 days
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
