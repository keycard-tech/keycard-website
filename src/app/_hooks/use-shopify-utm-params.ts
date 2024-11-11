'use client'

import { useEffect, useState } from 'react'

const SHOPIFY_UTM_PARAMS_KEY = 'shopify-utm-params'

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
