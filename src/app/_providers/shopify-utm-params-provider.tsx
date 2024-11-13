'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ShopifyUTMParamsContext = createContext<URLSearchParams | undefined>(
  undefined,
)

type Props = {
  children: React.ReactNode
}

export function ShopifyUTMParamsProvider({ children }: Props) {
  const utmParams = useShopifyUTMParams()

  return (
    <ShopifyUTMParamsContext.Provider value={utmParams}>
      {children}
    </ShopifyUTMParamsContext.Provider>
  )
}

export function useShopifyUTMParamsContext() {
  console.log('useShopifyUTMParamsContext')
  const context = useContext(ShopifyUTMParamsContext)

  if (!context) {
    throw new Error(
      'useShopifyUTMParamsContext must be used within a ShopifyUTMParamsProvider',
    )
  }

  return context
}

const SHOPIFY_UTM_PARAMS_KEY = 'shopify-utm-params'

function useShopifyUTMParams() {
  console.log('useShopifyUTMParams')
  const [utmParams, setUtmParams] = useState(new URLSearchParams())

  useEffect(() => {
    console.log('useShopifyUTMParamsEffect')
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
