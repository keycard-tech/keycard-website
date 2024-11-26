import { BuyCards } from '~/app/(homepage)/_components/buy-cards'
import { ComparisonTable } from '~/app/(homepage)/_components/comparison-table'
import { Faqs } from '~/app/(homepage)/_components/faqs'
import { Hero } from '~/app/(homepage)/_components/hero'
import { KeycardFeatures } from '~/app/(homepage)/_components/keycard-features'
import { KeycardShell } from '~/app/(homepage)/_components/keycard-shell'
import { Metadata } from '../_metadata'
import { ThankYouDialog } from './_components/thank-you-dialog'

export const metadata = Metadata({
  title: 'Keycard',
  description:
    'Join the open source revolution of the most modular and future proof hardware wallet system ever conceived.',
  openGraph: {
    images: ['/assets/og/home.png'],
  },
})

export default async function HomePage() {
  return (
    <>
      <ThankYouDialog />
      <Hero />
      <KeycardShell />
      <KeycardFeatures />
      <ComparisonTable />
      <Faqs />
      <BuyCards />
    </>
  )
}
