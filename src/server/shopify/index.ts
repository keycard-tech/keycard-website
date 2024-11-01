// todo: use graphql stack

/**
 * @see https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started
 */

import 'server-only'
import { createStorefrontClient } from '@shopify/hydrogen-react'

export const client = createStorefrontClient({
  // eslint-disable-next-line no-restricted-globals
  storeDomain: process.env['PUBLIC_STORE_DOMAIN'],
  // eslint-disable-next-line no-restricted-globals
  publicStorefrontToken: process.env['PUBLIC_STOREFRONT_API_TOKEN'],
  // eslint-disable-next-line no-restricted-globals
  privateStorefrontToken: process.env['PRIVATE_STOREFRONT_API_TOKEN'],
})

const ProductsRequestQuery = `
 products(first: 10) {
    edges {
      cursor
      node {
        id
        title
        description
        handle
				adjacentVariants {
					__typename
					id
				}
        variants(first: 10) {
          edges {
            cursor
            node {
							availableForSale
              id
              title
              quantityAvailable
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`

type ProductsResponseBody = {
  data: {
    products: {
      edges: Array<{
        cursor: string
        node: {
          id: string
          title: string
          description: string
          handle: string
          adjacentVariants: Array<{
            __typename: string
            id: string
          }>
          variants: {
            edges: Array<{
              cursor: string
              node: {
                availableForSale: boolean
                id: string
                title: string
                quantityAvailable: null
                price: {
                  amount: string
                  currencyCode: string
                }
              }
            }>
          }
        }
      }>
    }
  }
  errors?: Array<{
    message: string
    locations: Array<{
      line: number
      column: number
    }>
    path: Array<string | number>
    extensions: {
      code: string
      documentation: string
      requiredAccess: string
    }
  }>
}

export async function fetchProducts() {
  const response = await fetch(client.getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: ProductsRequestQuery,
    }),
    headers: client.getPrivateTokenHeaders(),
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const body: ProductsResponseBody = await response.json()

  return body
}

type CreateCartResponseBody = {
  data: {
    cartCreate: {
      cart: {
        id: string
        createdAt: string
        updatedAt: string
        checkoutUrl: string
        lines: {
          edges: Array<{
            node: {
              id: string
              merchandise: {
                id: string
              }
            }
          }>
        }
        attributes: Array<never>
        cost: {
          totalAmount: {
            amount: string
            currencyCode: string
          }
          subtotalAmount: {
            amount: string
            currencyCode: string
          }
          totalTaxAmount: null
          totalDutyAmount: null
        }
      }
    }
  }
}

const CartRequestQuery = `
  mutation {
  cartCreate(input: {
		lines: [
			{quantity: 1
			merchandiseId: "gid://shopify/ProductVariant/49399300620631"}
		]
	}) {
    cart {
      id
      createdAt
      updatedAt
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
      attributes {
        key
        value
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
`

export async function createCart() {
  const response = await fetch(client.getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: CartRequestQuery,
    }),
    headers: client.getPrivateTokenHeaders(),
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const body: CreateCartResponseBody = await response.json()

  return body
}
