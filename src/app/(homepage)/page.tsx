import { BuyCards } from '~/app/(homepage)/_components/buy-cards'
import { ComparisonTable } from '~/app/(homepage)/_components/comparison-table'
import { Faqs } from '~/app/(homepage)/_components/faqs'
import { Hero } from '~/app/(homepage)/_components/hero'
import { KeycardFeatures } from '~/app/(homepage)/_components/keycard-features'
import { KeycardShell } from '~/app/(homepage)/_components/keycard-shell'
import { Demo } from './_components/demo'
import { ThankYouDialog } from './_components/thank-you-dialog'

export default async function HomePage() {
  return (
    <>
      <ThankYouDialog />
      <Hero />
      <KeycardShell />
      <KeycardFeatures />
      <Demo />
      <ComparisonTable />
      <Faqs />
      <BuyCards />
    </>
  )
}
