import { Link } from '~components/link'
import { Fragment } from 'react'
import { ChevronRightIcon } from '../_icons/chevron-right-icon'

type Props = {
  items: Array<{
    label: string
    href: string
  }>
}

const Breadcrumbs = (props: Props) => {
  const { items } = props

  return (
    <div className="mx-[-8px] border-y border-white-12 px-10 py-3">
      <div className="flex items-center gap-2">
        <div className="scrollbar-none flex items-center gap-2 overflow-x-scroll whitespace-nowrap">
          {items.map((item, index) => {
            if (index === items.length - 1) {
              return (
                <div
                  key={item.label + index}
                  className="text-16 font-500 text-white-60"
                >
                  {item.label}
                </div>
              )
            }

            return (
              <Fragment key={item.href + index}>
                <Link
                  href={item.href}
                  className="text-16 font-500 text-white-95 hover:text-orange"
                >
                  {item.label}
                </Link>
                <span className="size-5">
                  <ChevronRightIcon />
                </span>
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { Breadcrumbs }
export type { Props as BreadcrumbsProps }
