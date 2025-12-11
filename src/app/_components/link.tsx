import { Link as IntlLink } from '~/i18n/navigation'
import { forwardRef } from 'react'

const Link = (
  props: React.ComponentPropsWithRef<typeof IntlLink>,
  ref: React.Ref<HTMLAnchorElement>,
) => {
  const url = typeof props.href === 'string' ? props.href : props.href.pathname!
  const external = url?.startsWith('http')

  if (external) {
    const target = props.target ?? '_blank'
    const rel =
      props.rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)
    return (
      <a {...props} href={url} target={target} rel={rel} ref={ref}>
        {props.children}
      </a>
    )
  }

  return <IntlLink {...props} ref={ref} />
}

const _Link = forwardRef(Link)

export { _Link as Link }
