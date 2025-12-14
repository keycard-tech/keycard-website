'use client'

import { AddIcon, CloseIcon, RemoveIcon } from '@status-im/icons/20'
import { useCart } from '~/app/_providers/cart-provider'
import { useShopifyUTMParamsContext } from '~/app/_providers/shopify-utm-params-provider'
import { formatPrice } from '~/app/_utils/format-price'
import { Cart } from '~/lib/sharedCart'
import * as Dialog from '~components/dialog'
import { Image } from '~components/image'
import { useMemo } from 'react'

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
  <span className="relative inline-flex min-w-6 items-center justify-center rounded-full bg-orange px-2 py-[3px] text-12 font-600 leading-none text-white-95">
    <span
      className="absolute inset-0 rounded-full bg-orange blur-[10px]"
      style={{ opacity: 0.6 }}
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
  return (
    <div className="flex gap-3 border-b border-dark-8 pb-4 last:border-b-0 last:pb-0">
      <div className="relative size-24 overflow-hidden rounded-12 bg-white-8">
        {line.merchandise.image ? (
          <Image
            src={line.merchandise.image.url}
            alt={line.merchandise.image.altText || line.merchandise.title}
            width={96}
            height={96}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-12 text-dark-60">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <p className="text-15 font-600 text-grey-100">
            {line.merchandise.product.title}
          </p>
          <p className="text-13 font-400 text-dark-60">
            {line.merchandise.title}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-full border border-dark-8 bg-white-100 px-3 py-1">
            <button
              type="button"
              className="rounded-full p-1 text-grey-100 transition-colors hover:bg-dark-8"
              onClick={() => onUpdate(line.quantity - 1)}
              disabled={disabled}
              style={{ opacity: disabled ? 0.6 : 1 }}
              aria-label="Decrease quantity"
            >
              <RemoveIcon />
            </button>
            <span className="min-w-8 text-center text-14 font-500 text-grey-100">
              {line.quantity}
            </span>
            <button
              type="button"
              className="rounded-full p-1 text-grey-100 transition-colors hover:bg-dark-8"
              onClick={() => onUpdate(line.quantity + 1)}
              disabled={disabled}
              style={{ opacity: disabled ? 0.6 : 1 }}
              aria-label="Increase quantity"
            >
              <AddIcon />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-15 font-600 text-grey-100">
              {formatPrice({
                amount: Number(line.cost.totalAmount.amount),
                currencyCode: currency,
              })}
            </span>
            <button
              type="button"
              className="rounded-full border border-dark-8 bg-white-100 px-3 py-1 text-12 font-500 text-dark-60 transition-colors hover:bg-dark-8"
              onClick={onRemove}
              disabled={disabled}
              style={{ opacity: disabled ? 0.6 : 1 }}
            >
              Remove
            </button>
          </div>
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
      <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[440px] flex-col border-l border-dark-8 bg-white-100 p-6 text-dark-100 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dialog.Title className="text-20 font-600 text-grey-100">
              Cart
            </Dialog.Title>
            {cart?.totalQuantity ? (
              <CartBubble count={cart.totalQuantity} />
            ) : null}
          </div>
          <Dialog.Close asChild>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full border border-dark-8 text-grey-100 transition-colors hover:bg-dark-8"
              aria-label="Close cart"
            >
              <CloseIcon />
            </button>
          </Dialog.Close>
        </div>

        {error && (
          <div className="mb-3 rounded-12 border border-[rgba(255,80,80,0.3)] bg-[rgba(255,80,80,0.1)] px-3 py-2 text-13 text-red">
            {error}
          </div>
        )}

        <div className="flex-1 space-y-4 overflow-y-auto">
          {isLoading ? (
            <p className="text-14 text-dark-60">Loading cart...</p>
          ) : !cart || cart.lines.length === 0 ? (
            <p className="text-14 text-dark-60">Your cart is empty.</p>
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

        <div className="mt-5 space-y-3 rounded-16 border border-dark-8 bg-white-100 p-4 shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between text-14 text-grey-100">
            <span>Subtotal</span>
            <span className="font-600">
              {formatPrice({
                amount: totals.subtotal,
                currencyCode: currency || 'USD',
              })}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-dark-8 pt-3 text-16 font-600 text-grey-100">
            <span>Total</span>
            <span>
              {formatPrice({
                amount: totals.total,
                currencyCode: currency || 'USD',
              })}
            </span>
          </div>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-12 bg-dark-100 px-4 py-3 text-15 font-600 text-white-95 transition-colors hover:bg-dark-60"
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
            Proceed to checkout
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
