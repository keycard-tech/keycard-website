import { ExternalIcon } from '@status-im/icons/20'
import { Routes } from '~/config/routes'
import { Link } from '~components/link'

type Props = {
  title: string
  routes: Routes
}

const Section = (props: Props) => {
  const { title, routes } = props

  return (
    <div className="relative flex flex-col gap-6 border-b border-dashed border-white-20 p-6 lg:border-0 lg:pb-12 lg:pt-0 lg:[&:nth-child(1)]:col-start-2">
      <p className="text-12 uppercase text-white-80">{title}</p>
      <ul className="grid gap-2">
        {routes.map(route => {
          const external = route.href.startsWith('http')

          return (
            <li key={route.name}>
              <Link
                href={route.href}
                className="group flex items-center gap-0.5"
              >
                <span className="text-16 font-500 text-white-95 transition-colors group-hover:text-white-60 group-data-[active='true']:text-white-40">
                  {route.name}
                </span>
                {external && <ExternalIcon className="text-white-60" />}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { Section }
