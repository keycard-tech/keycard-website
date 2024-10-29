import { BuyCards } from '~/app/(homepage)/_components/buy-cards'
import { ComparisonTable } from '~/app/(homepage)/_components/comparison-table'
import { Faqs } from '~/app/(homepage)/_components/faqs'
import { Hero } from '~/app/(homepage)/_components/hero'
import { KeycardFeatures } from '~/app/(homepage)/_components/keycard-features'
import { KeycardProSection } from '~/app/(homepage)/_components/keycard-pro-section'

export default async function HomePage() {
  return (
    <div className="relative w-full">
      <Hero />
      <KeycardProSection />
      <KeycardFeatures />
      <ComparisonTable />
      <Faqs />
      <BuyCards />
    </div>
  )
}
