import { Metadata } from '~/app/_metadata'
import { Customisation } from './_components/customisation'
import { Design } from './_components/design'
import { Hero } from './_components/hero'
import { Integration } from './_components/integration'
import { KeycardShell } from './_components/keycard-shell'
import { Prefooter } from './_components/pre-footer'
import { SecurityFeatures } from './_components/security-features'
import { UseCases } from './_components/use-cases'

export const metadata = Metadata({
  title: 'Keycard — Secure, Contactless Crypto Card',
  description:
    'Keycard is a smart card with secure element for storing keys and transacting via NFC. Durable, open-source, and built for Ethereum/EVM.',
  alternates: { canonical: '/keycard' },
})

export default async function KeycardPage() {
  return (
    <>
      <h1 className="sr-only">Keycard — Secure, Contactless Crypto Card</h1>
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
