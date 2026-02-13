import { Metadata } from '~/app/_metadata'
import { buildLocaleAlternates } from '~/app/_utils/metadata'
import { TestimonialsStrip } from '~components/testimonials-strip'
import { AutoOpenDialogManager } from './_components/auto-open-dialog-manager'
import { BuyCards } from './_components/buy-cards-client'
import { ComparisonTable } from './_components/comparison-table'
import { Faqs } from './_components/faqs'
import { Keycard } from './_components/keycard'
import { KeycardFeatures } from './_components/keycard-features'
import { KeycardShell } from './_components/keycard-shell'

type MetadataProps = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: MetadataProps) {
  const { locale } = await params

  return Metadata({
    title: {
      absolute: 'Keycard: Open-Source Air-Gapped Crypto Hardware Wallet',
    },
    description:
      'Secure your crypto with Keycard hardware. Air-gapped, contactless NFC, and open-source. Use Keycard Shell for modular cold storage and Keycard for everyday access.',
    alternates: buildLocaleAlternates(locale, '/'),
  })
}

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">
        Keycard — Modular, Open-Source Crypto Hardware
      </h1>
      <AutoOpenDialogManager />
      <KeycardShell />
      <Keycard />
      <TestimonialsStrip />
      <KeycardFeatures />
      <ComparisonTable />
      <Faqs />
      <BuyCards />
    </>
  )
}
