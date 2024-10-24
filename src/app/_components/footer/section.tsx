import { Routes } from '~/config/routes'
import { Link } from '~components/link'

type Props = {
  title: string
  routes: Routes
}

const ExternalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    className="-mb-0.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
  >
    <path
      fill="currentColor"
      fillOpacity=".6"
      fillRule="evenodd"
      d="M11.551 7.6H7V6.4h6.6V13h-1.2V8.448l-6.476 6.476-.848-.848L11.55 7.6Z"
      clipRule="evenodd"
    />
  </svg>
)

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
