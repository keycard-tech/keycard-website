import { ComparisonTable } from '~components/comparison-table'
import { Faqs } from '~components/faqs'
import { Hero } from '~components/hero'
import { KeycardFeatures } from '~components/keycard-features'
import { KeycardProSection } from '~components/keycard-pro-section'

export default async function HomePage() {
  return (
    <div className="relative w-full">
      <Hero />
      <KeycardProSection />
      <KeycardFeatures />
      <ComparisonTable />
      <Faqs />
    </div>
  )
}
