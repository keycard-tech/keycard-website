import { BuyCards } from '~/app/(with-navigation)/(homepage)/_components/buy-cards'
import { ComparisonTable } from '~/app/(with-navigation)/(homepage)/_components/comparison-table'
import { Faqs } from '~/app/(with-navigation)/(homepage)/_components/faqs'
import { Hero } from '~/app/(with-navigation)/(homepage)/_components/hero'
import { KeycardFeatures } from '~/app/(with-navigation)/(homepage)/_components/keycard-features'
import { KeycardShell } from '~/app/(with-navigation)/(homepage)/_components/keycard-shell'
import { AutoOpenBuyKeycardDialog } from './_components/auto-open-buy-keycard-dialog'

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
