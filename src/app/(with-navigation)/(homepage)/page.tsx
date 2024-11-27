import { Metadata } from '~/app/_metadata'
import { BuyCards } from '~/app/(with-navigation)/(homepage)/_components/buy-cards'
import { ComparisonTable } from '~/app/(with-navigation)/(homepage)/_components/comparison-table'
import { Faqs } from '~/app/(with-navigation)/(homepage)/_components/faqs'
import { Hero } from '~/app/(with-navigation)/(homepage)/_components/hero'
import { KeycardFeatures } from '~/app/(with-navigation)/(homepage)/_components/keycard-features'
import { KeycardShell } from '~/app/(with-navigation)/(homepage)/_components/keycard-shell'

export const metadata = Metadata({
  title: 'Keycard',
  description:
    'Join the open source revolution of the most modular and future proof hardware wallet system ever conceived.',
})

export default async function HomePage() {
  return (
    <>
      <Hero />
      <KeycardShell />
      <KeycardFeatures />
      <ComparisonTable />
      <Faqs />
      <BuyCards />
    </>
  )
}
