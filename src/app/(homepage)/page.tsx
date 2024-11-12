import { BuyCards } from '~/app/(homepage)/_components/buy-cards'
import { ComparisonTable } from '~/app/(homepage)/_components/comparison-table'
import { Faqs } from '~/app/(homepage)/_components/faqs'
import { Hero } from '~/app/(homepage)/_components/hero'
import { KeycardFeatures } from '~/app/(homepage)/_components/keycard-features'
import { KeycardPro } from '~/app/(homepage)/_components/keycard-pro'
import { ThankYouDialog } from './_components/thank-you-dialog'

export default async function HomePage() {
  return (
    <div className="relative mt-20 w-full lg:mt-[92px]">
      <ThankYouDialog />
      <Hero />
      <KeycardPro />
      <KeycardFeatures />
      <ComparisonTable />
      <Faqs />
      <BuyCards />
    </div>
  )
}
