import { Metadata } from '~/app/_metadata'
import { AutoOpenDialogManager } from './_components/auto-open-dialog-manager'
import { BuyCards } from './_components/buy-cards'
import { ComparisonTable } from './_components/comparison-table'
import { Faqs } from './_components/faqs'
import { Keycard } from './_components/keycard'
import { KeycardFeatures } from './_components/keycard-features'
import { KeycardShell } from './_components/keycard-shell'

export const metadata = Metadata({
  title: {
    absolute: 'Keycard: Secure Crypto & Hardware Wallet',
  },
  description:
    'Secure your crypto with Keycard hardware. Air-gapped, contactless NFC, and open-source. Use Keycard Shell for modular cold storage and Keycard card for everyday access.',
  alternates: { canonical: '/' },
})

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">
        Keycard — Modular, Open-Source Crypto Hardware
      </h1>
      <AutoOpenDialogManager />
      <KeycardShell />
      <Keycard />
      <KeycardFeatures />
      <ComparisonTable />
      <Faqs />
      <BuyCards />
    </>
  )
}
