import { BuyCards } from '~/app/(homepage)/_components/buy-cards'
import { ComparisonTable } from '~/app/(homepage)/_components/comparison-table'
import { Faqs } from '~/app/(homepage)/_components/faqs'
import { Hero } from '~/app/(homepage)/_components/hero'
import { KeycardFeatures } from '~/app/(homepage)/_components/keycard-features'
import { KeycardPro } from '~/app/(homepage)/_components/keycard-pro'

export default async function HomePage() {
  return (
    <div className="relative m-auto w-full max-w-[1512px]">
      <Hero />
      <KeycardPro />
      <KeycardFeatures />
      <ComparisonTable />
      <Faqs />
      <BuyCards />
    </div>
  )
}
