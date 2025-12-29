import { Metadata } from '~/app/_metadata'
import { getLegalDocumentContent } from '../_utils/get-legal-document-content'

export const metadata = Metadata({
  title: 'Terms of Use',
  alternates: {
    canonical: 'https://keycard.tech/en/legal/terms-of-use',
  },
})

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
