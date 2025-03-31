'use client'

import { Link } from '~components/link'

export function CheckoutUrlLink() {
  const searchParams = new URLSearchParams(window.location.search)
  const checkoutUrl = searchParams.get('checkoutUrl') || ''

  return (
    <Link
      href={checkoutUrl}
      className="underline decoration-1 underline-offset-[3px] transition-colors hover:!text-white-95"
    >
      press here
    </Link>
  )
}
