import { MobileSidenav } from '~/app/_components/docs/mobile-sidenav'
import Sidenav from '~/app/_components/docs/sidenav'
import { Metadata } from '~/app/_metadata'
import { buildLocaleAlternates } from '~/app/_utils/metadata'
import config from '~/config/developers.json'

type Props = {
  children: React.ReactNode
}

type MetadataProps = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: MetadataProps) {
  const { locale } = await params

  return Metadata({
    title: {
      default: 'Keycard Developers',
      template: '%s — Keycard Developers',
    },
    description:
      'Documentation for Keycard and Keycard Shell: setup, recovery, SDKs, and developer guides.',
    alternates: buildLocaleAlternates(locale, '/developers'),
  })
}

export default async function DevelopersLayout({ children }: Props) {
  return (
    <div className="relative mt-[84px] w-full">
      <MobileSidenav items={config} title="Developer docs" />
      <div className="absolute bottom-0 left-0 top-12 z-10 border-white-12 lg:border-r">
        <div className="sticky top-[148px] hidden lg:block">
          <Sidenav items={config} />
        </div>
      </div>

      {children}
    </div>
  )
}
