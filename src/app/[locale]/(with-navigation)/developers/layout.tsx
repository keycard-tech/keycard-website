import Sidenav from '~/app/_components/docs/sidenav'
import { Metadata } from '~/app/_metadata'
import config from '~/config/developers.json'

type Props = {
  children: React.ReactNode
}

export const metadata = Metadata({
  title: { default: 'Keycard Developers', template: '%s — Keycard Developers' },
  description:
    'Documentation for Keycard and Keycard Shell: setup, recovery, SDKs, and developer guides.',
  alternates: { canonical: '/developers' },
})

export default async function DevelopersLayout({ children }: Props) {
  return (
    <div className="relative mt-[84px] w-full">
      <div className="absolute bottom-0 left-0 top-12 z-10 border-white-12 lg:border-r">
        <div className="sticky top-[148px] hidden lg:block">
          <Sidenav items={config} />
        </div>
      </div>

      {children}
    </div>
  )
}
