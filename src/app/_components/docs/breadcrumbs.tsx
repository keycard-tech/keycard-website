import { ChevronRightIcon } from '@status-im/icons/20'
import { Link } from '~/app/_components/link'
import { Fragment } from 'react'

type Props = {
  items: Array<{
    label: string
    href: string
  }>
  action?: React.ReactNode
  actionPlacement?: 'inline' | 'right'
}

const Breadcrumbs = (props: Props) => {
  const { items, action, actionPlacement = 'right' } = props

  return (
    <div className="mx-[-8px] border-y border-white-12 px-5 py-3 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-scroll whitespace-nowrap scrollbar-none">
          {items.map((item, index) => {
            if (index === items.length - 1) {
              return (
                <div
                  key={item.label + index}
                  className="flex items-center gap-2 text-16 font-500 text-white-60"
                >
                  <span>{item.label}</span>
                  {action && actionPlacement === 'inline' && (
                    <span className="shrink-0">{action}</span>
                  )}
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
        {action && actionPlacement === 'right' && (
          <div className="shrink-0">{action}</div>
        )}
      </div>
    </div>
  )
}

export { Breadcrumbs }
export type { Props as BreadcrumbsProps }
