import { Metadata } from '~/app/_metadata'
import { ComparisonTable } from './_components/comparison-table'
import { Customisation } from './_components/customisation'
import { Design } from './_components/design'
import { Faqs } from './_components/faqs'
import { Hero } from './_components/hero'
import { Integration } from './_components/integration'
import { KeycardShell } from './_components/keycard-shell'
import { Prefooter } from './_components/pre-footer'
import { SecurityFeatures } from './_components/security-features'
import { UseCases } from './_components/use-cases'

export const metadata = Metadata({
  title: {
    absolute:
      'Keycard: Secure Crypto & Hardware Wallet - Lightweight, High-Security',
  },
})

export default async function HomePage() {
  return (
    <>
      <Hero />
      <SecurityFeatures />
      <Design />
      <Integration />
      <UseCases />
      <ComparisonTable />
      <KeycardShell />
      <Customisation />
      <Faqs />
      <Prefooter />
    </>
  )
}
