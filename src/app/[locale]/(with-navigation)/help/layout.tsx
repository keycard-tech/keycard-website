import Sidenav from '~/app/_components/docs/sidenav'
import { Metadata } from '~/app/_metadata'
import config from '~/config/help.json'

type Props = {
  children: React.ReactNode
}

export const metadata = Metadata({
  title: { default: 'Keycard Help', template: '%s — Keycard Help' },
  description:
    'Help articles and guides for using Keycard products and Keycard Shell.',
  alternates: { canonical: '/help' },
})

export default async function DocsLayout({ children }: Props) {
  return (
    <div className="relative mt-[84px] w-full">
      <div className="absolute bottom-0 left-0 top-12 z-10 border-white-12 lg:border-r">
        <div className="sticky top-[148px] hidden lg:block">
          <Sidenav items={config} />
        </div>
      </div>

      <div
        className="min-h-[calc(100vh-168px)] lg:min-h-[calc(100vh-168px)]"
        style={{ minHeight: `${Math.max(config.length * 60 + 200, 800)}px` }}
      >
        {children}
      </div>
    </div>
  )
}
