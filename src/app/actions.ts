'use server'

import { createCart } from '~/server/shopify/storefront'
import { CartInput } from '~/server/shopify/storefront/validation'

async function _createCart(input: CartInput) {
  return await createCart(input)
}

export { _createCart as createCart }
