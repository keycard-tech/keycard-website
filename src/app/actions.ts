'use server'

import { addRowToSheet } from '~/app/_lib/google/sign-up'
import { signUpSchema } from '~/app/_lib/google/validation'
import { createCart } from '~/server/shopify/storefront'
import { z } from 'zod'

export async function handleSignUp(input: { email: string }) {
  try {
    const data = signUpSchema.parse(input)
    await addRowToSheet(data.email)
    return { success: true, email: data.email }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { success: false, message: 'Invalid input.' }
    } else {
      console.error(error)
      return {
        success: false,
        message: 'An unexpected error occurred.',
      }
    }
  }
}

async function _createCart(input: { productId: string; quantity: number }) {
  return await createCart(input)
}

export { _createCart as createCart }
