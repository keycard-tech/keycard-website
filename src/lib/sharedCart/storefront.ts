type GraphQLResponse<T> = {
  data?: T
  errors?: Array<{ message?: string }>
}

export async function storefrontRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  let response: Response

  try {
    response = await fetch('/api/shopify/storefront', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    })
  } catch {
    throw new Error('Network error contacting Shopify')
  }

  let payload: GraphQLResponse<T>

  try {
    payload = await response.json()
  } catch {
    throw new Error('Invalid response from Shopify')
  }

  if (!response.ok) {
    const message =
      payload?.errors
        ?.map(error => error?.message)
        .filter(Boolean)
        .join(', ') || `Request failed with status ${response.status}`
    throw new Error(message)
  }

  if (payload.errors?.length) {
    const message = payload.errors
      .map(error => error?.message)
      .filter(Boolean)
      .join(', ')
    throw new Error(message || 'Unknown Shopify error')
  }

  if (!payload.data) {
    throw new Error('Missing data from Shopify')
  }

  return payload.data
}
