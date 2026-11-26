const KEYCARD_HOSTNAME = /(^|\.)keycard\.tech$/i

/**
 * `rel` value for an external link that opens in a new tab.
 *
 * Links to keycard.tech and any of its subdomains (get., shell., affiliates.,
 * docs.) keep the referrer, so Shopify and analytics can attribute the visit
 * to docs instead of counting it as Direct. `noopener` is always kept.
 * Everything else also gets `noreferrer`.
 */
export const getExternalRel = (href: string): string => {
  if (href.startsWith('/') && !href.startsWith('//')) {
    return 'noopener'
  }

  try {
    return KEYCARD_HOSTNAME.test(new URL(href).hostname)
      ? 'noopener'
      : 'noopener noreferrer'
  } catch {
    return 'noopener noreferrer'
  }
}
