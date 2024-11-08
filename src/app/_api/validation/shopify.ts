import { z } from 'zod'

export const shopifySchema = z
  .object({
    // The Shopify product ID could be '1-card', '2-card', or '3-card'
    bundleId: z.enum(['1-card', '2-card', '3-card']),
    quantity: z.number(),
    includeKeycardReader: z.boolean(),
  })
  .required() // The form must include these fields

export type Shopify = z.infer<typeof shopifySchema>
