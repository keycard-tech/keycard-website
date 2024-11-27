// import { Demo } from './_components/demo'
import { Metadata } from '~/app/_metadata'
import { BuyCards } from './_components/buy-cards'
import { ComparisonTable } from './_components/comparison-table'
import { Faqs } from './_components/faqs'
import { Hero } from './_components/hero'
import { KeycardFeatures } from './_components/keycard-features'
import { KeycardShell } from './_components/keycard-shell'

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
      {/* <Demo /> */}
      <Faqs />
      <BuyCards />
    </>
  )
}
