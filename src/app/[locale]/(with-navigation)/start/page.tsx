import { Metadata } from '~/app/_metadata'
import { buildLocaleAlternates } from '~/app/_utils/metadata'
import { ButtonLink } from '~components/button-link'

type MetadataProps = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: MetadataProps) {
  const { locale } = await params

  return Metadata({
    title: 'Get started — Keycard',
    description: 'Choose a guide to get started with Keycard or Keycard Shell.',
    alternates: buildLocaleAlternates(locale, '/start'),
  })
}

export default function StartPage() {
  return (
    <div className="px-3 pb-[120px] pt-12 md:px-8 lg:px-20 lg:pt-20">
      <div className="mb-6 grid grid-flow-row gap-3">
        <h1 className="font-lora text-32 font-400 text-white-95 lg:text-48">
          Get started
        </h1>
        <p className="font-inter text-20 font-300 text-white-95">
          Choose a guide to set up your Keycard or Keycard Shell.
        </p>
      </div>

      <div className="mt-14 flex flex-col gap-3 lg:flex-row">
        <div className="flex flex-1 flex-col rounded-28 border border-white-8 bg-white-4 p-6 pt-5">
          <h2 className="mb-1 font-lora text-24 font-400 text-white-95">
            Keycard
          </h2>
          <p className="mb-6 font-inter text-16 font-300 text-white-80">
            Set up Keycard and use it with Status.
          </p>
          <ButtonLink
            href="/start/keycard"
            variant="secondary"
            className="mt-auto"
          >
            Keycard start guide
          </ButtonLink>
        </div>

        <div className="flex flex-1 flex-col rounded-28 border border-white-8 bg-white-4 p-6 pt-5">
          <h2 className="mb-1 font-lora text-24 font-400 text-white-95">
            Keycard Shell
          </h2>
          <p className="mb-6 font-inter text-16 font-300 text-white-80">
            Quick start guide for setting up and verifying Keycard Shell.
          </p>
          <ButtonLink
            href="/start/shell"
            variant="secondary"
            className="mt-auto"
          >
            Shell quick start guide
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
