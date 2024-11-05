'use server'

import { createCart } from '~/server/shopify/storefront'

async function _createCart(input: { productId: string; quantity: number }) {
  return await createCart(input)
}

export { _createCart as createCart }
