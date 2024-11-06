import { AirGapped } from './_components/air-gapped'
import { Comparision } from './_components/comparision'
import { FeaturesCard } from './_components/features-card'
import { FeaturesGrid } from './_components/features-grid'
import { FeaturesSlider } from './_components/features-slider'
import { Hero } from './_components/hero'
import { Keycards } from './_components/keycards'
import { Prefooter } from './_components/pre-footer'

export default async function KeycardProPage() {
  return (
    <>
      <Hero />
      <FeaturesCard />
      <FeaturesGrid />
      <FeaturesSlider />
      <Comparision />
      <AirGapped />
      <Keycards />
      <Prefooter />
    </>
  )
}
