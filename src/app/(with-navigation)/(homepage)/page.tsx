import { BuyCards } from '~/app/(with-navigation)/(homepage)/_components/buy-cards'
import { BuyKeycardDialog } from '~/app/(with-navigation)/(homepage)/_components/buy-keycard-dialog'
import { ComparisonTable } from '~/app/(with-navigation)/(homepage)/_components/comparison-table'
import { Faqs } from '~/app/(with-navigation)/(homepage)/_components/faqs'
import { Hero } from '~/app/(with-navigation)/(homepage)/_components/hero'
import { KeycardFeatures } from '~/app/(with-navigation)/(homepage)/_components/keycard-features'
import { KeycardShell } from '~/app/(with-navigation)/(homepage)/_components/keycard-shell'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <>
      <Hero />
      <KeycardShell />
      <KeycardFeatures />
      <ComparisonTable />
      <Faqs />
      <BuyCards />

      <Suspense>
        <BuyKeycardDialog />
      </Suspense>
    </>
  )
}
