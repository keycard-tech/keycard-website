import { cx } from 'cva'
import { Children, cloneElement } from 'react'

export function renderText(params: {
  children: React.ReactNode | React.ReactNode[]
  size?: string
  weight?: string
  color?: string
  parent?: string
}) {
  const {
    children,
    size = 'text-16',
    weight = 'font-300',
    color = 'text-white-95',
    parent,
  } = params

  return Children.map(children, child => {
    if (typeof child === 'string') {
      return (
        <span
          className={cx(
            size,
            weight,
            color,
            // 'break-word hyphens-manual break-all'
          )}
        >
          {child}
        </span>
      )
    }

    if (parent) {
      return cloneElement(child as React.ReactElement, { parent })
    }

    return child
  })
}
