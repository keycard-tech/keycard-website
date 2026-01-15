import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_QUERY,
} from './cart.gql'
import { deleteCartId, getCartId, setCartId } from './cookie'
import { storefrontRequest } from './storefront'

type Money = {
  amount: string
  currencyCode: string
}

type CartLine = {
  id: string
  quantity: number
  cost: {
    totalAmount: Money
  }
  merchandise: {
    id: string
    title: string
    product: {
      title: string
      handle: string
    }
    image: {
      url: string
      altText: string | null
    } | null
  }
}

type CartFromAPI = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: Money
    totalAmount: Money
  }
  lines: {
    edges: Array<{ node: CartLine }>
  }
}

export type Cart = Omit<CartFromAPI, 'lines'> & {
  lines: CartLine[]
}

const normalizeCart = (cart: CartFromAPI | null | undefined): Cart | null => {
  if (!cart) return null

  return {
    ...cart,
    lines: cart.lines.edges.map(edge => edge.node),
  }
}

const collectErrors = (errors?: Array<{ message?: string }>) =>
  errors
    ?.map(error => error?.message)
    .filter(Boolean)
    .join(', ')
    .trim()

const ensureCartId = async (): Promise<string> => {
  const existingCartId = getCartId()

  if (existingCartId) {
    return existingCartId
  }

  const cart = await createCart()

  return cart.id
}

const createCart = async (): Promise<Cart> => {
  const { cartCreate } = await storefrontRequest<{
    cartCreate: {
      cart: CartFromAPI | null
      userErrors: Array<{ field?: string[]; message?: string }>
    }
  }>(CART_CREATE_MUTATION)

  const userErrors = collectErrors(cartCreate.userErrors)

  if (userErrors) {
    throw new Error(userErrors)
  }

  const cart = normalizeCart(cartCreate.cart)

  if (!cart) {
    throw new Error('Unable to create cart')
  }

  setCartId(cart.id)

  return cart
}

const fetchCartById = async (cartId: string): Promise<Cart | null> => {
  try {
    const response = await storefrontRequest<{ cart: CartFromAPI | null }>(
      CART_QUERY,
      { cartId },
    )

    return normalizeCart(response.cart)
  } catch {
    return null
  }
}

export const getOrCreateCart = async (): Promise<Cart> => {
  const cartId = getCartId()

  if (cartId) {
    const cart = await fetchCartById(cartId)

    if (cart) {
      return cart
    }

    deleteCartId()
  }

  return createCart()
}

export const fetchCart = async (): Promise<Cart> => {
  const cartId = getCartId()

  if (!cartId) {
    return createCart()
  }

  const cart = await fetchCartById(cartId)

  if (cart) {
    return cart
  }

  deleteCartId()
  return createCart()
}

export const addLines = async (
  variantGid: string,
  quantity: number,
): Promise<Cart> => {
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0')
  }

  const cartId = await ensureCartId()

  const { cartLinesAdd } = await storefrontRequest<{
    cartLinesAdd: {
      cart: CartFromAPI | null
      userErrors: Array<{ field?: string[]; message?: string }>
    }
  }>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ merchandiseId: variantGid, quantity }],
  })

  const userErrors = collectErrors(cartLinesAdd.userErrors)

  if (userErrors) {
    throw new Error(userErrors)
  }

  const cart = normalizeCart(cartLinesAdd.cart)

  if (!cart) {
    deleteCartId()
    return createCart()
  }

  setCartId(cart.id)

  return cart
}

export const updateLine = async (
  lineId: string,
  quantity: number,
): Promise<Cart> => {
  if (quantity <= 0) {
    return removeLine(lineId)
  }

  const cartId = await ensureCartId()

  const { cartLinesUpdate } = await storefrontRequest<{
    cartLinesUpdate: {
      cart: CartFromAPI | null
      userErrors: Array<{ field?: string[]; message?: string }>
    }
  }>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })

  const userErrors = collectErrors(cartLinesUpdate.userErrors)

  if (userErrors) {
    throw new Error(userErrors)
  }

  const cart = normalizeCart(cartLinesUpdate.cart)

  if (!cart) {
    deleteCartId()
    return createCart()
  }

  setCartId(cart.id)

  return cart
}

export const removeLine = async (lineId: string): Promise<Cart> => {
  const cartId = await ensureCartId()

  const { cartLinesRemove } = await storefrontRequest<{
    cartLinesRemove: {
      cart: CartFromAPI | null
      userErrors: Array<{ field?: string[]; message?: string }>
    }
  }>(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  })

  const userErrors = collectErrors(cartLinesRemove.userErrors)

  if (userErrors) {
    throw new Error(userErrors)
  }

  const cart = normalizeCart(cartLinesRemove.cart)

  if (!cart) {
    deleteCartId()
    return createCart()
  }

  setCartId(cart.id)

  return cart
}

export const addVariantToCart = async (
  variantGid: string,
  quantity: number,
): Promise<Cart> => addLines(variantGid, quantity)
