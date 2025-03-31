'use client'

import { Link } from '~components/link'
import { useEffect, useState } from 'react'

export function CheckoutUrlLink() {
  const [checkoutUrl, setCheckoutUrl] = useState('/?buyKeycard=true')

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const checkoutUrl = searchParams.get('checkoutUrl')
    if (checkoutUrl) {
      setCheckoutUrl(checkoutUrl)
    }
  }, [])

  return (
    <Link
      href={checkoutUrl}
      className="underline decoration-1 underline-offset-[3px] transition-colors hover:!text-white-95"
    >
      press here
    </Link>
  )
}
