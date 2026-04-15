import { Metadata } from '~/app/_metadata'
import { buildLocaleAlternates } from '~/app/_utils/metadata'
import { ButtonLink } from '~components/button-link'
import { Logo } from '~components/logo'

type MetadataProps = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: MetadataProps) {
  const { locale } = await params

  return Metadata({
    title: 'Keycard Documentation',
    description:
      'Find help articles, setup guides, and developer documentation for Keycard and Keycard Shell.',
    alternates: buildLocaleAlternates(locale, '/'),
  })
}

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-3 pb-[120px] pt-12 md:px-8">
      <div className="w-full max-w-[720px]">
        <div className="mb-12 text-center">
          <Logo className="opacity-60 mx-auto mb-6 h-10 w-auto" />
          <h1 className="font-lora text-32 font-400 text-white-95 lg:text-48">
            Documentation
          </h1>
          <p className="text-18 mx-auto mt-3 max-w-[480px] font-inter font-300 text-white-60">
            What are you looking for?
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-1 flex-col rounded-28 border border-white-8 bg-white-4 p-6 pt-5">
            <p className="mb-1 text-14 font-400 uppercase tracking-wider text-orange">
              User guides
            </p>
            <h2 className="mb-2 font-lora text-24 font-400 text-white-95">
              I use Keycard or Shell
            </h2>
            <p className="mb-6 font-inter text-16 font-300 text-white-60">
              Setup guides, wallet pairing, transaction signing,
              troubleshooting, and FAQ.
            </p>
            <ButtonLink href="/help" variant="primary" className="mt-auto">
              Help center
            </ButtonLink>
          </div>

          <div className="flex flex-1 flex-col rounded-28 border border-white-8 bg-white-4 p-6 pt-5">
            <p className="mb-1 text-14 font-400 uppercase tracking-wider text-orange">
              Technical docs
            </p>
            <h2 className="mb-2 font-lora text-24 font-400 text-white-95">
              I build with Keycard
            </h2>
            <p className="mb-6 font-inter text-16 font-300 text-white-60">
              API reference, protocol details, firmware internals, and
              integration guides.
            </p>
            <ButtonLink
              href="/developers"
              variant="primary"
              className="mt-auto"
            >
              Developer docs
            </ButtonLink>
          </div>
        </div>

        <p className="mt-8 text-center font-inter text-14 font-300 text-white-40">
          Looking for the product?{' '}
          <a
            href="https://keycard.tech"
            className="text-white-60 underline underline-offset-2 hover:text-white-80"
          >
            keycard.tech
          </a>
        </p>
      </div>
    </div>
  )
}
