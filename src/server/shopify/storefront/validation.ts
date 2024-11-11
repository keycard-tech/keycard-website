import { z } from 'zod'

export const cartSchema = z.array(
  z.object({
    productId: z.string(),
    quantity: z.number().min(1),
  }),
)

export type CartInput = z.infer<typeof cartSchema>
