import { ROUTES } from '~/config/routes'
import { Logo } from '~components/logo'
import Link from 'next/link'
import { Section } from './section'

const Footer = () => {
  return (
    <footer className="rounded-28 bg-orange pt-8">
      <div className="grid grid-cols-2 divide-x divide-dashed divide-white-20 lg:grid-cols-6">
        <div className="flex items-start border-b border-dashed border-white-20 p-6 pr-0 pt-0">
          <Link href="/" aria-label="Homepage">
            <Logo />
          </Link>
        </div>
        {Object.entries(ROUTES).map(([title, links]) => (
          <Section key={title} title={title} routes={links} />
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-2 px-5 py-4 md:flex-row md:gap-0 lg:px-6">
        <span className="text-16 font-300 text-white-80">
          © Keycard {new Date().getFullYear()}
        </span>
        <p className="text-center text-16 font-300 text-white-80 md:text-left">
          Keycard is part of the Institute of Free Technology
        </p>
      </div>
    </footer>
  )
}

export { Footer }
