import { Routes } from '~/config/routes'
import { Link } from '~components/link'
import { External } from '~icons'

type Props = {
  title: string
  routes: Routes
}

const Section = (props: Props) => {
  const { title, routes } = props

  return (
    <div className="relative border-b border-dashed border-white-20">
      <div className="relative grid gap-6 px-6 pb-12">
        <p className="text-12 uppercase text-white-80">{title}</p>
        <ul className="grid gap-1">
          {routes.map(route => {
            const external = route.href.startsWith('http')

            return (
              <li key={route.name}>
                <Link href={route.href} className="group flex items-center">
                  <span className="text-16 font-500 text-white-95 transition-colors group-hover:text-white-60 group-data-[active='true']:text-white-40">
                    {route.name}
                  </span>
                  {external && <External />}
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
