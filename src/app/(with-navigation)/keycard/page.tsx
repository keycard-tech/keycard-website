import { Metadata } from '../_metadata'
import { Customisation } from './_components/customisation'
import { Design } from './_components/design'
import { Hero } from './_components/hero'
import { Integration } from './_components/integration'
import { KeycardShell } from './_components/keycard-shell'
import { Prefooter } from './_components/pre-footer'
import { SecurityFeatures } from './_components/security-features'
import { UseCases } from './_components/use-cases'

export const metadata = Metadata({
  title: 'Keycard',
  description:
    'Store and trade your crypto with a simple, secure and slim hardware wallet.',
})

export default async function KeycardPage() {
  return (
    <>
      <Hero />
      <SecurityFeatures />
      <Design />
      <Integration />
      <UseCases />
      <KeycardShell />
      <Customisation />
      <Prefooter />
    </>
  )
}
