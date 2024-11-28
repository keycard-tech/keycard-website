import { Routes } from '~/config/routes'
import { Link } from '~components/link'
import { ExternalIcon } from '~icons'

type Props = {
  title: string
  routes: Routes
}

const Section = (props: Props) => {
  const { title, routes } = props

  return (
    <div className="relative">
      <div className="relative flex flex-col gap-6 p-6">
        <p className="text-12 font-400 uppercase text-white-60">{title}</p>
        <ul className="grid gap-1">
          {routes.map(route => {
            const external = route.href.startsWith('http')

            return (
              <li key={route.name}>
                <Link href={route.href} className="group flex items-center">
                  <span className="text-16 font-500 text-white-95 transition-colors group-hover:text-white-60 group-data-[active='true']:text-white-40">
                    {route.name}
                  </span>
                  {external && <ExternalIcon />}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export { Section }
