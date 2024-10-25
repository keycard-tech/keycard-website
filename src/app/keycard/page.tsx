import { Design } from './_components/design'
import { Hero } from './_components/hero'
import { Integration } from './_components/integration'
import { SecurityFeatures } from './_components/security-features'

export default async function KeycardPage() {
  return (
    <>
      <Hero />
      <SecurityFeatures />
      <Design />
      <Integration />
    </>
  )
}
