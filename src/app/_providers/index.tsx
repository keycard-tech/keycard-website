'use client'

import { ShopifyUTMParamsProvider } from './shopify-utm-params-provider'

type Props = {
  children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return <ShopifyUTMParamsProvider>{children}</ShopifyUTMParamsProvider>
}
