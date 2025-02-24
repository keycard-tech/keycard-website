import { Metadata } from '~/app/_metadata'
import { AutoOpenBuyKeycardDialog } from './_components/auto-open-buy-keycard-dialog'
import { BuyCards } from './_components/buy-cards'
import { ComparisonTable } from './_components/comparison-table'
import { Faqs } from './_components/faqs'
import { Hero } from './_components/hero'
import { KeycardFeatures } from './_components/keycard-features'
import { KeycardShell } from './_components/keycard-shell'

export const metadata = Metadata({
  title: {
    absolute: 'Keycard: Secure Crypto & Hardware Wallet',
  },
})

export default function HomePage() {
  return (
    <>
      <AutoOpenBuyKeycardDialog />
      <Hero />
      <KeycardShell />
      <KeycardFeatures />
      <ComparisonTable />
      <Faqs />
      <BuyCards />
    </>
  )
}
