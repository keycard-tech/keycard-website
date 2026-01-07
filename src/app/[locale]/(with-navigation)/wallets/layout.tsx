import { Metadata } from '~/app/_metadata'
import {
  buildLocaleAlternates,
  buildLocalizedPath,
  resolveLocale,
} from '~/app/_utils/metadata'

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
  const activeLocale = resolveLocale(locale)

  return Metadata({
    title: 'Wallets that support Keycard',
    description:
      'Compatible wallets for Keycard and Keycard Shell across Ethereum, Bitcoin, and multisig use cases.',
    alternates: buildLocaleAlternates(locale, '/wallets'),
    openGraph: { url: buildLocalizedPath(activeLocale, '/wallets') },
  })
}

export default function WalletsLayout({ children }: Props) {
  return <>{children}</>
}
