import { buildLocalizedPath, resolveLocale } from '~/app/_utils/metadata'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function DocsPage({ params }: Props) {
  const { locale } = await params
  return redirect(
    buildLocalizedPath(
      resolveLocale(locale),
      '/help/about-keycard-and-keycard-shell',
    ),
  )
}
