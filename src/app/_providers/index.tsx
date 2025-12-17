'use client'

import { CartDrawer } from '~components/cart/cart-drawer'
import { CartProvider } from './cart-provider'
import { ShopifyUTMParamsProvider } from './shopify-utm-params-provider'

type Props = {
  children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <ShopifyUTMParamsProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </ShopifyUTMParamsProvider>
  )
}
