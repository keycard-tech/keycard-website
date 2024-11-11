import { z } from 'zod'

export const shopifySchema = z
  .object({
    // The Shopify product ID could be 'ONE_CARD', 'TWO_CARDS', or 'THREE_CARDS'
    bundleId: z.enum(['ONE_CARD', 'TWO_CARDS', 'THREE_CARDS']),
    quantity: z.number(),
    includeKeycardReader: z.boolean(),
  })
  .required()

export type Shopify = z.infer<typeof shopifySchema>
