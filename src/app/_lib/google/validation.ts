import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email('Insert a valid email address'),
})

export type SignUp = z.infer<typeof signUpSchema>
