import { BuyCards } from '~components/homepage/buy-cards'
import { ComparisonTable } from '~components/homepage/comparison-table'
import { Faqs } from '~components/homepage/faqs'
import { Hero } from '~components/homepage/hero'
import { KeycardFeatures } from '~components/homepage/keycard-features'
import { KeycardProSection } from '~components/homepage/keycard-pro-section'

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
