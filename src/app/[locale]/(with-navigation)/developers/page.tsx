import { buildLocalizedPath, resolveLocale } from '~/app/_utils/metadata'
import { permanentRedirect } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function DevelopersPage({ params }: Props) {
  const { locale } = await params
  return permanentRedirect(
    buildLocalizedPath(resolveLocale(locale), '/developers/overview'),
  )
}
