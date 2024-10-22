import ComparisonTable from '~components/comparison-table'
import FAQSection from '~components/faqs'
import FeaturesSection from '~components/features-section'
import { Hero } from '~components/hero'
import { KeycardProSection } from '~components/keycard-pro-section'

export default async function HomePage() {
  return (
    <div className="relative w-full">
      <Hero />
      <KeycardProSection />
      <FeaturesSection />
      <ComparisonTable />
      <FAQSection />
    </div>
  )
}
