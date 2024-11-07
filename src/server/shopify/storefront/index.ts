import { z } from 'zod'
import 'server-only'
import { CartMutation, ProductsQuery } from './operations'
import { CartResponseBody, ProductsResponseBody } from './types'

export async function experimental_getProducts() {
  const response = await _fetch<ProductsResponseBody>(ProductsQuery)

  const products = response.products.edges.map(({ node }) => {
    return {
      id: node.id,
      title: node.title,
      description: node.description,
      variants: node.variants.edges.map(({ node }) => {
        return {
          id: node.id,
          title: node.title,
          price: node.price,
        }
      }),
    }
  })

  return products
}

const cartSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
})

export async function createCart(
  input: z.infer<typeof cartSchema>,
): Promise<string> {
  const { productId, quantity } = cartSchema.parse(input)

  const response = await _fetch<CartResponseBody>(CartMutation, {
    merchandiseId: productId,
    quantity,
  })

  const checkoutUrl = response.cartCreate?.cart?.checkoutUrl

  if (!checkoutUrl) {
    throw new Error('Failed to create cart')
  }

  return checkoutUrl
}

export async function _fetch<T extends ProductsResponseBody | CartResponseBody>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
        'Shopify-Storefront-Private-Token':
          process.env.SHOPIFY_STOREFRONT_API_PRIVATE_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch')
  }

  const body = await response.json()

  return body.data as T
}
