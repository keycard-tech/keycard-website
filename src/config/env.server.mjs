import { z } from 'zod'
import { handleError } from './env.base.mjs'

if (typeof window !== 'undefined') {
  throw new Error(
    '❌ Attempted to access a server-side environment variable on the client',
  )
}

export const envSchema = z.object({
  VERCEL: z.string().optional(),
  VERCEL_ENV: z
    .union([
      z.literal('production'),
      z.literal('preview'),
      z.literal('development'),
    ])
    .optional(),
  SHOPIFY_STORE_DOMAIN: z.string(),
  SHOPIFY_STOREFRONT_API_PUBLIC_ACCESS_TOKEN: z.string(),
  SHOPIFY_ADMIN_API_PRIVATE_ACCESS_TOKEN: z.string(),
  GOOGLE_SPREADSHEET_ID: z.string(),
  GOOGLE_SHEET_ID: z.string(),
  GOOGLE_CLIENT_EMAIL: z.string(),
  GOOGLE_SERVICE_PRIVATE_KEY: z.string(),
  SHOPIFY_STOREFRONT_TOKEN: z.string(),
  SHOPIFY_STOREFRONT_API_VERSION: z.string(),
  SHOPIFY_STOREFRONT_DOMAIN: z.string(),
  CART_COOKIE_NAME: z.string(),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  handleError(result.error)

  process.exit(1)
}

const serverEnv = result.data

export { serverEnv }
