import { CartAddEvent } from '@theme/events'

const CART_COOKIE_NAME = 'kc_cart_id'
const CART_COOKIE_DOMAIN = '.keycard.tech'
const CART_MAX_AGE_SECONDS = 60 * 60 * 24 * 30
const PROXY_URL = 'https://docs.keycard.tech/api/shopify/storefront'

const shouldUseSharedDomain = () =>
  typeof window !== 'undefined' &&
  (window.location.hostname === 'keycard.tech' ||
    window.location.hostname.endsWith('.keycard.tech'))

const setCookie = (name, value, maxAge = CART_MAX_AGE_SECONDS) => {
  const attributes = ['Path=/', `Max-Age=${maxAge}`, 'Secure', 'SameSite=Lax']

  if (shouldUseSharedDomain()) {
    attributes.push(`Domain=${CART_COOKIE_DOMAIN}`)
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; ${attributes.join('; ')}`
}

const deleteCookie = name => {
  const attributes = ['Path=/', 'Max-Age=0', 'Secure', 'SameSite=Lax']

  if (shouldUseSharedDomain()) {
    attributes.push(`Domain=${CART_COOKIE_DOMAIN}`)
  }

  document.cookie = `${name}=; ${attributes.join('; ')}`
}

const getCartId = () => {
  if (typeof document === 'undefined') return null
  const parts = document.cookie.split(';').map(c => c.trim())
  for (const part of parts) {
    if (part.startsWith(`${CART_COOKIE_NAME}=`)) {
      return decodeURIComponent(part.split('=')[1] || '')
    }
  }
  return null
}

const setCartId = cartId => setCookie(CART_COOKIE_NAME, cartId)

const gql = String.raw

const CART_QUERY = gql`
  query CartQuery($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                compareAtPrice {
                  amount
                }
                product {
                  title
                  handle
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`

const CART_CREATE_MUTATION = gql`
  mutation CartCreate {
    cartCreate {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

const CART_LINES_ADD_MUTATION = gql`
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  compareAtPrice {
                    amount
                  }
                  product {
                    title
                    handle
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

const CART_LINES_UPDATE_MUTATION = gql`
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  compareAtPrice {
                    amount
                  }
                  product {
                    title
                    handle
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

const CART_LINES_REMOVE_MUTATION = gql`
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  compareAtPrice {
                    amount
                  }
                  product {
                    title
                    handle
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

const storefrontRequest = async (query, variables) => {
  const response = await fetch(PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ query, variables }),
  })

  let payload
  try {
    payload = await response.json()
  } catch {
    throw new Error('Invalid response from Shopify')
  }

  if (!response.ok) {
    const message =
      payload?.errors
        ?.map(error => error?.message)
        .filter(Boolean)
        .join(', ') ||
      payload?.error ||
      `Request failed with status ${response.status}`
    throw new Error(message)
  }

  if (payload?.errors?.length) {
    const message = payload.errors
      .map(error => error?.message)
      .filter(Boolean)
      .join(', ')
    throw new Error(message || 'Unknown Shopify error')
  }

  if (!payload?.data) {
    throw new Error('Missing data from Shopify')
  }

  return payload.data
}

const collectErrors = errors =>
  errors
    ?.map(error => error?.message)
    .filter(Boolean)
    .join(', ')
    .trim()

const normalizeCart = cart => {
  if (!cart) return null
  return {
    ...cart,
    lines: cart.lines?.edges?.map(edge => edge.node) || [],
  }
}

const createCart = async () => {
  const { cartCreate } = await storefrontRequest(CART_CREATE_MUTATION)
  const userErrors = collectErrors(cartCreate?.userErrors)
  if (userErrors) throw new Error(userErrors)
  const cart = normalizeCart(cartCreate?.cart)
  if (!cart) throw new Error('Unable to create cart')
  setCartId(cart.id)
  return cart
}

const fetchCartById = async cartId => {
  const response = await storefrontRequest(CART_QUERY, { cartId })
  return normalizeCart(response.cart)
}

const ensureCart = async () => {
  const existingId = getCartId()
  if (existingId) {
    const existingCart = await fetchCartById(existingId).catch(() => null)
    if (existingCart) return existingCart
    deleteCookie(CART_COOKIE_NAME)
  }
  return createCart()
}

const addLines = async (variantGid, quantity) => {
  if (quantity <= 0) throw new Error('Quantity must be greater than 0')
  const cart = await ensureCart()
  const { cartLinesAdd } = await storefrontRequest(CART_LINES_ADD_MUTATION, {
    cartId: cart.id,
    lines: [{ merchandiseId: variantGid, quantity }],
  })
  const userErrors = collectErrors(cartLinesAdd?.userErrors)
  if (userErrors) throw new Error(userErrors)
  const updated = normalizeCart(cartLinesAdd?.cart)
  if (!updated) {
    deleteCookie(CART_COOKIE_NAME)
    return createCart()
  }
  setCartId(updated.id)
  return updated
}

const updateLine = async (lineId, quantity) => {
  if (quantity <= 0) return removeLine(lineId)
  const cart = await ensureCart()
  const { cartLinesUpdate } = await storefrontRequest(
    CART_LINES_UPDATE_MUTATION,
    {
      cartId: cart.id,
      lines: [{ id: lineId, quantity }],
    },
  )
  const userErrors = collectErrors(cartLinesUpdate?.userErrors)
  if (userErrors) throw new Error(userErrors)
  const updated = normalizeCart(cartLinesUpdate?.cart)
  if (!updated) {
    deleteCookie(CART_COOKIE_NAME)
    return createCart()
  }
  setCartId(updated.id)
  return updated
}

const removeLine = async lineId => {
  const cart = await ensureCart()
  const { cartLinesRemove } = await storefrontRequest(
    CART_LINES_REMOVE_MUTATION,
    {
      cartId: cart.id,
      lineIds: [lineId],
    },
  )
  const userErrors = collectErrors(cartLinesRemove?.userErrors)
  if (userErrors) throw new Error(userErrors)
  const updated = normalizeCart(cartLinesRemove?.cart)
  if (!updated) {
    deleteCookie(CART_COOKIE_NAME)
    return createCart()
  }
  setCartId(updated.id)
  return updated
}

const formatPrice = (amount, currency) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency || 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount))

const renderCart = cart => {
  const container = document.getElementById('shared-cart-drawer-content')
  if (!container) return

  if (!cart || !cart.lines || cart.lines.length === 0) {
    container.innerHTML = `<p class="cart-items__empty">${window.Shopify?.routes?.cart_url ? 'Your cart is empty.' : 'Your cart is empty.'}</p>`
    return
  }

  const currency = cart.cost?.totalAmount?.currencyCode || 'EUR'

  const linesHtml = cart.lines
    .map(line => {
      const price = formatPrice(line.cost?.totalAmount?.amount || 0, currency)
      const compareAt = line.merchandise?.compareAtPrice?.amount
        ? formatPrice(line.merchandise.compareAtPrice.amount, currency)
        : ''
      const image = line.merchandise?.image
      const title = line.merchandise?.product?.title || ''
      const variantTitle =
        (line.merchandise?.title || '').trim().toLowerCase() === 'default title'
          ? ''
          : line.merchandise?.title || ''
      return `
        <div class="cart-items__table-row" data-line-id="${line.id}">
          <div class="cart-items__media" role="cell">
            ${
              image
                ? `<div class="cart-items__media-container" style="--ratio:1;">
                    <img src="${image.url}" alt="${image.altText || title || ''}" class="cart-items__media-image" loading="lazy" />
                  </div>`
                : ''
            }
          </div>
          <div class="cart-items__details cart-primary-typography">
            <p class="cart-items__title">${title}</p>
            ${variantTitle ? `<div class="cart-items__variants">${variantTitle}</div>` : ''}
            <div class="cart-items__price-line">
              <span>${price}</span>
              ${compareAt ? `<s class="compare-at-price">${compareAt}</s>` : ''}
            </div>
          </div>
          <div class="cart-items__quantity-controls">
            <div class="quantity-selector-wrapper">
              <div class="quantity-selector cart-primary-typography">
                <button type="button" class="button quantity-minus button-unstyled" data-action="decrease" data-line-id="${line.id}">-</button>
                <input type="number" value="${line.quantity}" min="1" data-line-id="${line.id}" aria-label="Quantity">
                <button type="button" class="button quantity-plus button-unstyled" data-action="increase" data-line-id="${line.id}">+</button>
              </div>
            </div>
            <button class="button button--tertiary cart-items__remove" type="button" data-action="remove" data-line-id="${line.id}" aria-label="Remove ${title}">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 9v4.25M8.5 9v4.25M5.75 12.2V6h8.5c0 2.421 0 3.779 0 6.2 0 .853 0 1.447-.038 1.91-.037.453-.106.714-.207.911a2.498 2.498 0 0 1-.983 1.017c-.197.1-.458.17-.911.207-.463.037-1.057.038-1.91.038h-.4c-.853 0-1.447 0-1.91-.038-.453-.037-.714-.106-.911-.207a2.498 2.498 0 0 1-.984-1.017c-.1-.197-.17-.458-.207-.911C5.75 13.647 5.75 13.053 5.75 12.2z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
                <path d="M4.25 6h11.5M8 5.25a2 2 0 1 1 4 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <span class="visually-hidden">Remove</span>
            </button>
          </div>
          <div class="cart-items__price cart-secondary-typography">${price}</div>
        </div>
      `
    })
    .join('')

  const total = formatPrice(cart.cost?.totalAmount?.amount || 0, currency)

  container.innerHTML = `
    <div class="cart-items__wrapper">
      <div class="cart-items spacing-style">
        <div class="cart-items__table" role="table">
          <div role="rowgroup">
            ${linesHtml}
          </div>
        </div>
      </div>
    </div>
    <div class="cart-drawer__summary">
      <div class="cart__total-container cart__total-container--has-installments">
        <span class="cart__summary-item cart__total" role="status">
          <span class="cart__total-label cart-primary-typography">Estimated total</span>
          <span class="cart__total-value cart-secondary-typography">${total}</span>
        </span>
        <div class="cart__summary-item tax-note cart-primary-typography">
          <small>Taxes and <a href="/policies/shipping-policy">shipping</a> calculated at checkout.</small>
        </div>
      </div>
      <div class="cart__ctas">
        <button type="button" class="cart__checkout-button button" id="shared-cart-checkout">
          Check out
        </button>
      </div>
    </div>
  `

  // Bind quantity and remove controls
  container.querySelectorAll('[data-action="decrease"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const lineId = btn.getAttribute('data-line-id')
      const line = cart.lines.find(l => l.id === lineId)
      if (!line) return
      const updated = await updateLine(lineId, line.quantity - 1).catch(
        () => null,
      )
      if (updated) {
        renderCart(updated)
        document.dispatchEvent(
          new CartAddEvent(updated, 'shared-cart', {
            itemCount: updated.totalQuantity,
          }),
        )
      }
    })
  })
  container.querySelectorAll('[data-action="increase"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const lineId = btn.getAttribute('data-line-id')
      const line = cart.lines.find(l => l.id === lineId)
      if (!line) return
      const updated = await updateLine(lineId, line.quantity + 1).catch(
        () => null,
      )
      if (updated) {
        renderCart(updated)
        document.dispatchEvent(
          new CartAddEvent(updated, 'shared-cart', {
            itemCount: updated.totalQuantity,
          }),
        )
      }
    })
  })
  container.querySelectorAll('[data-action="remove"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const lineId = btn.getAttribute('data-line-id')
      const updated = await removeLine(lineId).catch(() => null)
      if (updated) {
        renderCart(updated)
        document.dispatchEvent(
          new CartAddEvent(updated, 'shared-cart', {
            itemCount: updated.totalQuantity,
          }),
        )
      }
    })
  })

  const checkoutBtn = container.querySelector('#shared-cart-checkout')
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.checkoutUrl) {
        window.location.href = cart.checkoutUrl
      }
    })
  }
}

const interceptAddToCart = () => {
  document.addEventListener('submit', async event => {
    const form = event.target
    if (!(form instanceof HTMLFormElement)) return
    if (!form.action || !form.action.includes('/cart/add')) return

    event.preventDefault()

    const idInput = form.querySelector('input[name="id"]')
    if (!idInput) {
      form.submit()
      return
    }

    const quantityInput = form.querySelector('input[name="quantity"]')
    const quantity = Number(quantityInput?.value || '1')
    const variantId = idInput.value
    const merchandiseId = `gid://shopify/ProductVariant/${variantId}`

    try {
      const cart = await addLines(merchandiseId, quantity > 0 ? quantity : 1)
      document.dispatchEvent(
        new CartAddEvent(cart, form.id || 'shared-cart', {
          itemCount: cart.totalQuantity,
          variantId,
        }),
      )
    } catch (err) {
      console.error('Shared cart add failed', err)
      form.submit()
    }
  })
}

const attachToDrawer = () => {
  const drawer = document.querySelector('cart-drawer-component')
  if (!drawer) return

  drawer.addEventListener('cart:update', async () => {
    try {
      const cart = await ensureCart()
      renderCart(cart)
    } catch (err) {
      console.error('Shared cart render failed', err)
    }
  })

  drawer.addEventListener('click', async event => {
    const target = event.target
    if (!(target instanceof HTMLElement)) return
    if (
      target.matches(
        '[on\\:click="/open"], [data-testid="cart-drawer-trigger"]',
      )
    ) {
      try {
        const cart = await ensureCart()
        renderCart(cart)
      } catch (err) {
        console.error('Shared cart load failed', err)
      }
    }
  })
}

const init = () => {
  window.SharedCart = {
    getOrCreateCart: ensureCart,
    fetchCart: ensureCart,
    addLines,
    updateLine,
    removeLine,
  }

  interceptAddToCart()
  attachToDrawer()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
