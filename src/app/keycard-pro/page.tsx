import { FeaturesCard } from './_components/features-card'
import { FeaturesGrid } from './_components/features-grid'
import { FeaturesSlider } from './_components/features-slider'
import { Hero } from './_components/hero'
import { Prefooter } from './_components/pre-footer'

export default async function KeycardProPage() {
  return (
    <>
      <Hero />
      <FeaturesCard />
      <FeaturesGrid />
      <FeaturesSlider />
      <Prefooter />
    </>
  )
}
