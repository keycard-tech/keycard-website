import { Customisation } from './_components/customisation'
import { Design } from './_components/design'
import { Hero } from './_components/hero'
import { Integration } from './_components/integration'
import { KeycardPro } from './_components/keycard-pro'
import { SecurityFeatures } from './_components/security-features'
import { UseCases } from './_components/use-cases'

export default async function KeycardPage() {
  return (
    <>
      <Hero />
      <SecurityFeatures />
      <Design />
      <Integration />
      <UseCases />
      <KeycardPro />
      <Customisation />
    </>
  )
}
