'use client'

import { AddIcon, CloseIcon, RemoveIcon } from '@status-im/icons/20'
import { useCart } from '~/app/_providers/cart-provider'
import { useShopifyUTMParamsContext } from '~/app/_providers/shopify-utm-params-provider'
import { Cart } from '~/lib/sharedCart'
import * as Dialog from '~components/dialog'
import { Image } from '~components/image'
import { useMemo } from 'react'

const DeleteIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M11.5 9v4.25M8.5 9v4.25M5.75 12.2V6h8.5c0 2.421 0 3.779 0 6.2 0 .853 0 1.447-.038 1.91-.037.453-.106.714-.207.911a2.498 2.498 0 0 1-.983 1.017c-.197.1-.458.17-.911.207-.463.037-1.057.038-1.91.038h-.4c-.853 0-1.447 0-1.91-.038-.453-.037-.714-.106-.911-.207a2.498 2.498 0 0 1-.984-1.017c-.1-.197-.17-.458-.207-.911C5.75 13.647 5.75 13.053 5.75 12.2z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M4.25 6h11.5M8 5.25a2 2 0 1 1 4 0"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const formatPriceWithLeadingSymbol = (amount: number, currency: string) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency || 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: 'symbol',
  })

  const parts = formatter.formatToParts(amount)
  const symbol = parts.find(part => part.type === 'currency')?.value ?? ''
  const fallbackCode = (currency || 'EUR').toUpperCase()
  const rest = parts
    .filter(part => part.type !== 'currency')
    .map(part => part.value)
    .join('')
    .trim()
  const cleanedRest = rest
    .replace(new RegExp(`\\s*${fallbackCode}\\s*$`, 'i'), '')
    .trim()

  return `${symbol}${cleanedRest}`
}

const formatPriceWithTrailingCode = (amount: number, currency: string) => {
  const symbolFirst = formatPriceWithLeadingSymbol(amount, currency)
  const code = (currency || 'EUR').toUpperCase()
  return `${symbolFirst} ${code}`
}

const getCookie = (name: string): string => {
  if (typeof document === 'undefined') return ''

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || ''
  return ''
}

const buildCheckoutUrl = (
  checkoutUrl?: string,
  utmParams?: URLSearchParams,
): string => {
  if (!checkoutUrl) return ''

  try {
    const url = new URL(checkoutUrl)

    utmParams?.forEach((value, key) => {
      url.searchParams.set(key, value)
    })

    const affiliateId = getCookie('bgaffilite_id')

    if (affiliateId) {
      url.searchParams.set('bg_ref', affiliateId)
    }

    return url.toString()
  } catch {
    return checkoutUrl
  }
}

const CartBubble = ({ count }: { count: number }) => (
  <span
    className="relative inline-flex size-7 items-center justify-center rounded-full bg-white-12 text-12 font-600 leading-none"
    style={{
      color: 'rgba(255,255,255,0.58)',
      backgroundColor: 'rgba(255,255,255,0.18)',
    }}
  >
    <span
      className="absolute inset-0 rounded-full bg-white-12 blur-[10px]"
      style={{ opacity: 0.35, backgroundColor: 'rgba(255,255,255,0.18)' }}
      aria-hidden
    />
    <span className="relative z-10">{count}</span>
  </span>
)

const CartLineRow = ({
  line,
  currency,
  disabled,
  onUpdate,
  onRemove,
}: {
  line: Cart['lines'][number]
  currency: string
  disabled: boolean
  onUpdate: (quantity: number) => void
  onRemove: () => void
}) => {
  const variantTitle =
    line.merchandise.title?.trim().toLowerCase() === 'default title'
      ? ''
      : line.merchandise.title
  const lineTotalAmount = Number(line.cost.totalAmount.amount)
  const formattedLinePrice = formatPriceWithLeadingSymbol(
    lineTotalAmount,
    currency,
  )
  const unitPrice =
    line.quantity > 0 ? lineTotalAmount / line.quantity : lineTotalAmount
  type CompareAtFields = { compareAtPrice?: { amount?: string } }
  type CostCompareAt = { compareAtAmountPerQuantity?: { amount?: string } }

  const merchandiseCompareAt = (line.merchandise as unknown as CompareAtFields)
    .compareAtPrice?.amount
  const costCompareAt = (line.cost as unknown as CostCompareAt)
    .compareAtAmountPerQuantity?.amount

  const compareAtUnit = merchandiseCompareAt
    ? Number(merchandiseCompareAt)
    : costCompareAt
      ? Number(costCompareAt)
      : null
  const formattedCompareAt =
    compareAtUnit && compareAtUnit > unitPrice
      ? formatPriceWithLeadingSymbol(compareAtUnit, currency)
      : null

  return (
    <div
      className="flex gap-4 border-b pb-6 last:border-b-0 last:pb-0"
      style={{ borderColor: 'rgba(255,255,255,0.3)' }}
    >
      <div className="relative size-14 overflow-hidden rounded-10 bg-white-8">
        {line.merchandise.image ? (
          <Image
            src={line.merchandise.image.url}
            alt={line.merchandise.image.altText || line.merchandise.title}
            width={56}
            height={56}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-12 text-white-60">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <p
              className="text-15 font-500"
              style={{ color: 'rgba(255,255,255,0.58)' }}
            >
              {line.merchandise.product.title}
            </p>
            {variantTitle ? (
              <p
                className="text-13 font-400"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {variantTitle}
              </p>
            ) : null}
            {formattedCompareAt ? (
              <p
                className="text-13 font-400 line-through"
                style={{ color: 'rgba(255,255,255,0.42)' }}
              >
                {formattedCompareAt}
              </p>
            ) : null}
          </div>
          <div
            className="text-right text-15 font-500"
            style={{ color: 'rgba(255,255,255,0.62)' }}
          >
            {formattedLinePrice}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 border border-white-20 bg-dark-100 px-2.5 py-1.5"
            style={{ borderRadius: 8 }}
          >
            <button
              type="button"
              className="rounded-full p-1 transition-colors hover:bg-white-12"
              onClick={() => onUpdate(line.quantity - 1)}
              disabled={disabled}
              style={{
                opacity: disabled ? 0.6 : 1,
                color: 'rgba(255,255,255,0.68)',
              }}
              aria-label="Decrease quantity"
            >
              <RemoveIcon className="size-[14px]" />
            </button>
            <span
              className="min-w-[28px] text-center text-14 font-600"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {line.quantity}
            </span>
            <button
              type="button"
              className="rounded-full p-1 transition-colors hover:bg-white-12"
              onClick={() => onUpdate(line.quantity + 1)}
              disabled={disabled}
              style={{
                opacity: disabled ? 0.6 : 1,
                color: 'rgba(255,255,255,0.68)',
              }}
              aria-label="Increase quantity"
            >
              <AddIcon className="size-[14px]" />
            </button>
          </div>

          <button
            type="button"
            className="flex size-[40px] items-center justify-center bg-orange text-white-95 transition-colors hover:bg-orange-dark"
            onClick={onRemove}
            disabled={disabled}
            style={{ opacity: disabled ? 0.6 : 1, borderRadius: 12 }}
            aria-label="Remove item"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export const CartDrawer = () => {
  const {
    cart,
    isDrawerOpen,
    isLoading,
    isMutating,
    error,
    openDrawer,
    closeDrawer,
    updateItem,
    removeItem,
  } = useCart()
  const utmParams = useShopifyUTMParamsContext()

  const currency =
    cart?.cost.totalAmount.currencyCode ||
    cart?.cost.subtotalAmount.currencyCode

  const checkoutUrl = useMemo(
    () => buildCheckoutUrl(cart?.checkoutUrl, utmParams),
    [cart?.checkoutUrl, utmParams],
  )

  const totals = useMemo(() => {
    if (!cart) {
      return { subtotal: 0, total: 0 }
    }

    return {
      subtotal: Number(cart.cost.subtotalAmount.amount),
      total: Number(cart.cost.totalAmount.amount),
    }
  }, [cart])

  return (
    <Dialog.Root
      open={isDrawerOpen}
      onOpenChange={open => (open ? openDrawer() : closeDrawer())}
    >
      <Dialog.Content
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[400px] flex-col bg-dark-100 p-5 text-white-80 shadow-2xl"
        style={{ color: 'rgba(255,255,255,0.65)' }}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dialog.Title
              className="font-lora text-[22px] font-600"
              style={{ color: 'rgba(255,255,255,0.58)' }}
            >
              Cart
            </Dialog.Title>
            {cart?.totalQuantity ? (
              <CartBubble count={cart.totalQuantity} />
            ) : null}
          </div>
          <Dialog.Close asChild>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-[14px] bg-orange text-white-95 transition-colors hover:bg-orange-dark"
              aria-label="Close cart"
            >
              <CloseIcon className="size-[20px]" />
            </button>
          </Dialog.Close>
        </div>

        {error && (
          <div
            className="mb-3 rounded-12 border px-3 py-2 text-13 text-red"
            style={{
              borderColor: 'rgba(255, 80, 80, 0.3)',
              backgroundColor: 'rgba(255, 80, 80, 0.1)',
            }}
          >
            {error}
          </div>
        )}

        <div
          className="flex-1 space-y-4 overflow-y-auto pt-3"
          style={{
            WebkitMaskImage:
              'linear-gradient(black 0%, black 96%, transparent 100%)',
            maskImage: 'linear-gradient(black 0%, black 96%, transparent 100%)',
          }}
        >
          {isLoading ? (
            <p className="text-14" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Loading cart...
            </p>
          ) : !cart || cart.lines.length === 0 ? (
            <p className="text-14" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Your cart is empty.
            </p>
          ) : (
            cart.lines.map(line => (
              <CartLineRow
                key={line.id}
                line={line}
                currency={currency || 'USD'}
                disabled={isMutating}
                onUpdate={quantity => updateItem(line.id, quantity)}
                onRemove={() => removeItem(line.id)}
              />
            ))
          )}
        </div>

        <div
          className="mt-5 space-y-4 border-t pt-5"
          style={{ borderColor: 'rgba(255,255,255,0.2)' }}
        >
          <div
            className="flex items-center justify-between text-[14px] font-400"
            style={{ color: 'rgba(255,255,255,0.58)' }}
          >
            <span>Estimated total</span>
            <span
              className="font-lora text-[23px]"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {formatPriceWithTrailingCode(totals.total, currency || 'EUR')}
            </span>
          </div>
          <p
            className="text-[12px]"
            style={{ color: 'rgba(255,255,255,0.58)' }}
          >
            Taxes and{' '}
            <a
              href="https://get.keycard.tech/policies/shipping-policy"
              className="text-orange"
            >
              shipping
            </a>{' '}
            calculated at checkout.
          </p>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-orange px-6 py-4 text-16 font-500 text-white-95 transition-colors hover:bg-orange-dark"
            onClick={() => checkoutUrl && (window.location.href = checkoutUrl)}
            disabled={
              !checkoutUrl || isMutating || !cart || cart.lines.length === 0
            }
            style={{
              opacity:
                !checkoutUrl || isMutating || !cart || cart.lines.length === 0
                  ? 0.6
                  : 1,
              cursor:
                !checkoutUrl || isMutating || !cart || cart.lines.length === 0
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            Check out
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
