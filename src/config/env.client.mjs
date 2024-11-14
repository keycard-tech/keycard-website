import { z } from 'zod'
import { handleError } from './env.base.mjs'

export const envSchema = z.object({
  NEXT_PUBLIC_VERCEL_ENV: z
    .union([
      z.literal('production'),
      z.literal('preview'),
      z.literal('development'),
    ])
    .optional(),
  NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_GHOST_API_URL: z.string(),
  NEXT_PUBLIC_GHOST_API_KEY: z.string(),
})

export const result = envSchema.strip().safeParse({
  NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  NEXT_PUBLIC_GHOST_API_URL: process.env.NEXT_PUBLIC_GHOST_API_URL,
  NEXT_PUBLIC_GHOST_API_KEY: process.env.NEXT_PUBLIC_GHOST_API_KEY,
})

if (!result.success) {
  handleError(result.error)

  process.exit(1)
}

const clientEnv = result.data

export { clientEnv }
