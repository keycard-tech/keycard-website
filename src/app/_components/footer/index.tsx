import { ROUTES } from '~/config/routes'
import { Link } from '~components/link'
import { Logo } from '~components/logo'
import { Section } from './section'

const Footer = () => {
  return (
    <footer className="mt-auto rounded-28 bg-orange pt-8">
      <div className="relative">
        <div className="absolute flex items-start pl-6">
          <Link href="/" aria-label="Homepage">
            <Logo />
          </Link>
        </div>
        <div className="m-auto max-w-[1512px]">
          <div className="grid grid-cols-2 divide-x divide-dashed divide-white-20 lg:grid-cols-5 lg:pl-[152px] lg:pr-[72px] xl:pl-[282px]">
            <div
              key="empty"
              title="empty"
              className="border-b border-dashed border-white-20 lg:hidden"
            />
            {Object.entries(ROUTES).map(([title, links]) => (
              <Section key={title} title={title} routes={links} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 border-0 border-dashed border-white-20 px-5 py-4 md:flex-row md:gap-0 lg:border-t lg:px-6">
        <span className="text-16 font-300 text-white-80">
          © Keycard {new Date().getFullYear()}
        </span>
        <p className="text-center text-16 font-300 text-white-80 md:text-left">
          Keycard is part of the{' '}
          <Link href="https://free.technology" className="hover:text-white-95">
            Institute of Free Technology
          </Link>
        </p>
      </div>
    </footer>
  )
}

export { Footer }
