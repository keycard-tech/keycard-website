import { Link as IntlLink } from '~/i18n/navigation'
import { forwardRef } from 'react'

const Link = (
  props: React.ComponentPropsWithRef<typeof IntlLink>,
  ref: React.Ref<HTMLAnchorElement>,
) => {
  const href = props.href

  if (typeof href === 'string' && href.startsWith('#')) {
    return (
      <a {...props} href={href} ref={ref}>
        {props.children}
      </a>
    )
  }

  if (typeof href !== 'string' && href.pathname == null && href.hash != null) {
    const hash = href.hash.startsWith('#') ? href.hash : `#${href.hash}`
    return (
      <a {...props} href={hash} ref={ref}>
        {props.children}
      </a>
    )
  }

  const url = typeof href === 'string' ? href : href.pathname!
  const external =
    url?.startsWith('http') ||
    url?.startsWith('mailto:') ||
    url?.startsWith('tel:') ||
    // Treat /en/ URLs as external to avoid double locale prefixing
    // (legal pages are always canonical at /en/legal/*)
    url?.startsWith('/en/')

  if (external) {
    const fullHref =
      typeof href === 'string'
        ? href
        : `${href.pathname ?? ''}${href.hash ? (href.hash.startsWith('#') ? href.hash : `#${href.hash}`) : ''}`
    const target = props.target ?? '_blank'
    const rel =
      props.rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)
    return (
      <a {...props} href={fullHref} target={target} rel={rel} ref={ref}>
        {props.children}
      </a>
    )
  }

  return <IntlLink {...props} ref={ref} />
}

const _Link = forwardRef(Link)

export { _Link as Link }
