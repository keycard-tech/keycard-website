import { Metadata } from '~/app/_metadata'
import { AutoOpenBuyKeycardDialog } from './_components/auto-open-buy-keycard-dialog'
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
})

export default function HomePage() {
  return (
    <>
      <AutoOpenBuyKeycardDialog />
      <KeycardShell />
      <Keycard />
      <KeycardFeatures />
      <ComparisonTable />
      <Faqs />
      <BuyCards />
    </>
  )
}
