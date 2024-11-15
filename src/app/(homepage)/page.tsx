import { BuyCards } from '~/app/(homepage)/_components/buy-cards'
import { ComparisonTable } from '~/app/(homepage)/_components/comparison-table'
import { Faqs } from '~/app/(homepage)/_components/faqs'
import { Hero } from '~/app/(homepage)/_components/hero'
import { KeycardFeatures } from '~/app/(homepage)/_components/keycard-features'
import { KeycardPro } from '~/app/(homepage)/_components/keycard-pro'
import { Metadata } from '../_metadata'
import { ThankYouDialog } from './_components/thank-you-dialog'

export const metadata = Metadata({
  title: 'Keycard',
  description:
    'Join the open source revolution of the most modular and future proof hardware wallet system ever conceived.',
})

export default async function HomePage() {
  return (
    <div className="relative m-auto mt-20 w-full max-w-[1512px] lg:mt-[92px]">
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
