'use client'

import { useCart } from '~/app/_providers/cart-provider'
import { cx } from 'cva'

type Props = {
  className?: string
}

const CartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="var(--icon-stroke-width, 1.6)"
      d="M3.392 6.875h13.216v8.016c0 .567-.224 1.112-.624 1.513-.4.402-.941.627-1.506.627H5.522a2.13 2.13 0 0 1-1.506-.627 2.15 2.15 0 0 1-.624-1.513zM8.818 2.969h2.333c.618 0 1.211.247 1.649.686a2.35 2.35 0 0 1 .683 1.658v1.562H6.486V5.313c0-.622.246-1.218.683-1.658a2.33 2.33 0 0 1 1.65-.686"
    />
  </svg>
)

export const CartBadge = ({ className }: Props) => {
  const { cart, isLoading, isMutating, openDrawer, refreshCart } = useCart()

  const totalQuantity = cart?.totalQuantity ?? 0
  const showCount = !isLoading && totalQuantity > 0

  const handleClick = async () => {
    if (!cart && !isLoading) {
      await refreshCart()
    }

    openDrawer()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx(
        'relative inline-flex items-center justify-center p-2 text-white-95 transition-colors hover:text-white-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white-40',
        isMutating ? 'cursor-not-allowed' : '',
        className,
      )}
      aria-label="Open cart"
      disabled={isMutating}
      style={{
        opacity: isMutating ? 0.7 : 1,
      }}
    >
      <CartIcon className="size-6" />
      <span className="sr-only">Cart</span>
      <span
        className={cx(
          'absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1 text-12 font-600 leading-none text-white-95',
        )}
        style={{ opacity: showCount ? 1 : 0.5 }}
      >
        {isLoading ? '–' : totalQuantity}
      </span>
    </button>
  )
}
