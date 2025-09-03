import NextLink from 'next/link'
import { forwardRef } from 'react'

const Link = (
  props: React.ComponentPropsWithRef<typeof NextLink>,
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

  return <NextLink {...props} ref={ref} />
}

const _Link = forwardRef(Link)

export { _Link as Link }
