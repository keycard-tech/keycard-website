import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const ALLOWED_ORIGINS = [
  'https://keycard.tech',
  'https://get.keycard.tech',
  'http://localhost:3000',
]

const corsHeaders = (origin: string | null): HeadersInit => {
  const baseHeaders: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return baseHeaders
  }

  return {
    ...baseHeaders,
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
    Vary: 'Origin',
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  })
}

type StorefrontPayload = {
  query?: string
  variables?: Record<string, unknown>
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')
  const headers = corsHeaders(origin)

  const token = process.env.SHOPIFY_STOREFRONT_API_PUBLIC_ACCESS_TOKEN
  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION
  const domain = process.env.SHOPIFY_STORE_DOMAIN

  if (!token || !apiVersion || !domain) {
    return NextResponse.json(
      { error: 'Shopify environment is not configured' },
      { status: 500, headers },
    )
  }

  let payload: StorefrontPayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400, headers },
    )
  }

  if (!payload.query) {
    return NextResponse.json(
      { error: 'Missing GraphQL query' },
      { status: 400, headers },
    )
  }

  const storefrontUrl = `https://${domain}/api/${apiVersion}/graphql.json`

  try {
    const response = await fetch(storefrontUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({
        query: payload.query,
        variables: payload.variables,
      }),
      cache: 'no-store',
    })

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
      headers,
    })
  } catch {
    return NextResponse.json(
      { error: 'Unable to reach Shopify Storefront API' },
      { status: 502, headers },
    )
  }
}
