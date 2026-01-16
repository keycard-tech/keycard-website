import { Metadata } from '~/app/_metadata'
import { buildLocaleAlternates } from '~/app/_utils/metadata'
import { SUPPORTED_LOCALES } from '~/i18n/constants'
import { getLegalDocumentContent } from '../_utils/get-legal-document-content'

type MetadataProps = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: MetadataProps) {
  const { locale } = await params
  const legalLocales = [SUPPORTED_LOCALES[0]]

  return Metadata({
    title: 'Terms of Use',
    alternates: buildLocaleAlternates(
      locale,
      '/legal/terms-of-use',
      legalLocales,
    ),
  })
}

export default async function TermsOfUsePage() {
  const { meta, content } = await getLegalDocumentContent('terms-of-use')

  return (
    <>
      <div className="mb-12">
        <h1 className="mb-3 font-lora text-32 font-500 text-white-95 xl:text-48">
          {meta.title}
        </h1>
      </div>
      <article className="font-300">{content}</article>
    </>
  )
}
