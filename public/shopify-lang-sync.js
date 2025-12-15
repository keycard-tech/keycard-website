/**
 * Shopify storefront helper.
 * Usage: load on get.keycard.tech (e.g. theme.liquid)
 * <script src="https://keycard.tech/shopify-lang-sync.js" defer></script>
 */
(function syncShopifyLocaleToCookie() {
  const COOKIE_NAME = 'lang'
  const COOKIE_DOMAIN = '.keycard.tech'
  const COOKIE_PATH = '/'
  const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year
  const COOKIE_SAME_SITE = 'lax'
  const SUPPORTED = ['en', 'fr', 'de', 'es', 'nl']

  const rawLocale =
    (window.Shopify && (window.Shopify.locale || window.Shopify.shop?.locale)) ||
    document.documentElement.lang ||
    ''

  const normalized = (rawLocale || '')
    .toLowerCase()
    .split(/[-_]/)[0]
    .trim()

  const locale = SUPPORTED.includes(normalized) ? normalized : 'en'

  // Always set on Shopify to keep the shared cookie in sync with the active storefront locale.
  document.cookie = [
    `${COOKIE_NAME}=${locale}`,
    `Domain=${COOKIE_DOMAIN}`,
    `Path=${COOKIE_PATH}`,
    `Max-Age=${COOKIE_MAX_AGE}`,
    `SameSite=${COOKIE_SAME_SITE}`,
  ].join('; ')
})()
