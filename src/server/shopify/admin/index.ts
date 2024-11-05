import 'server-only'
import type { TypedDocumentString } from '../../../graphql/shopify/admin/graphql'
import { DiscountsQuery } from './operations'

export async function experimental_getDiscounts() {
  const response = await _fetch(DiscountsQuery)

  return response
}

export async function _fetch<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
        'X-Shopify-Access-Token':
          process.env.SHOPIFY_ADMIN_API_PRIVATE_ACCESS_TOKEN,
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

  return body.data as TResult
}
