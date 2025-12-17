const CART_COOKIE_NAME = process.env.CART_COOKIE_NAME ?? 'kc_cart_id'
const CART_COOKIE_DOMAIN = '.keycard.tech'
const CART_MAX_AGE_SECONDS = 60 * 60 * 24 * 30

const shouldUseSharedDomain = () =>
  typeof window !== 'undefined' &&
  (window.location.hostname === 'keycard.tech' ||
    window.location.hostname.endsWith('.keycard.tech'))

const buildCookieAttributes = (overrides?: {
  maxAge?: number
  expire?: boolean
}) => {
  const attributes = [
    'Path=/',
    `Max-Age=${overrides?.expire ? 0 : (overrides?.maxAge ?? CART_MAX_AGE_SECONDS)}`,
    'Secure',
    'SameSite=Lax',
  ]

  if (shouldUseSharedDomain()) {
    attributes.push(`Domain=${CART_COOKIE_DOMAIN}`)
  }

  return attributes
}

export const getCartId = (): string | null => {
  if (typeof document === 'undefined') return null

  const cookies = document.cookie.split(';').map(cookie => cookie.trim())

  for (const cookie of cookies) {
    if (cookie.startsWith(`${CART_COOKIE_NAME}=`)) {
      return decodeURIComponent(cookie.split('=')[1] || '')
    }
  }

  return null
}

export const setCartId = (cartId: string) => {
  if (typeof document === 'undefined') return

  const attributes = buildCookieAttributes()
  document.cookie = `${CART_COOKIE_NAME}=${encodeURIComponent(cartId)}; ${attributes.join('; ')}`
}

export const deleteCartId = () => {
  if (typeof document === 'undefined') return

  const attributes = buildCookieAttributes({ expire: true })
  document.cookie = `${CART_COOKIE_NAME}=; ${attributes.join('; ')}`
}
