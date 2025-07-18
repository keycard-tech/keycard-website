import 'server-only'
import { serverEnv } from '~/config/env.server.mjs'
import { ProductsQuery } from './operations'
import { ProductsResponseBody } from './types'

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

export async function _fetch<T extends ProductsResponseBody>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(
    `https://${serverEnv.SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
        'X-Shopify-Storefront-Access-Token':
          serverEnv.SHOPIFY_STOREFRONT_API_PUBLIC_ACCESS_TOKEN,
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

  if (body.errors) {
    throw new Error('Failed to fetch')
  }

  return body.data as T
}
