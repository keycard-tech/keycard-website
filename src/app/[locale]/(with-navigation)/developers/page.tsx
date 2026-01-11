import { buildLocalizedPath, resolveLocale } from '~/app/_utils/metadata'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function DevelopersPage({ params }: Props) {
  const { locale } = await params
  return redirect(
    buildLocalizedPath(resolveLocale(locale), '/developers/overview'),
  )
}
