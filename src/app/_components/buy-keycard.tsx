'use client'

import { ButtonLink } from '~components/button-link'
import { useEffect, useState } from 'react'

type Props = {
  variant?: 'primary' | 'secondary'
  active?: boolean
}

const SHOPIFY_URL = 'https://get.keycard.tech/'
const SHOPIFY_UTM_PARAMS_KEY = 'shopify-utm-params'

export function BuyKeycard({ variant, active }: Props) {
  const url = new URL(SHOPIFY_URL)
  const utmParams = useShopifyUTMParams()

  utmParams.forEach((value, key) => {
    url.searchParams.append(key, value)
  })

  return (
    <ButtonLink href={url} variant={variant} active={active}>
      Buy Keycard
    </ButtonLink>
  )
}

export function useShopifyUTMParams() {
  const [utmParams, setUtmParams] = useState(new URLSearchParams())

  useEffect(() => {
    const storedParams = sessionStorage.getItem(SHOPIFY_UTM_PARAMS_KEY)

    if (storedParams) {
      setUtmParams(new URLSearchParams(storedParams))

      return
    }

    const params = new URLSearchParams()

    for (const [key, value] of new URL(
      window.location.href,
    ).searchParams.entries()) {
      if (key.startsWith('utm_')) {
        params.append(key, value)
      }
    }

    if (params.size === 0) {
      return
    }

    sessionStorage.setItem(SHOPIFY_UTM_PARAMS_KEY, params.toString())
    setUtmParams(params)
  }, [])

  return utmParams
}
