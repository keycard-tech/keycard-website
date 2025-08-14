import { Metadata } from '~/app/_metadata'
import { AirGapped } from './_components/air-gapped'
import { Comparision } from './_components/comparision'
import { FeaturesCard } from './_components/features-card'
import { FeaturesGrid } from './_components/features-grid'
import { FeaturesSlider } from './_components/features-slider'
import { Hero } from './_components/hero'
import { Keycards } from './_components/keycards'
import { Prefooter } from './_components/pre-footer'

export const metadata = Metadata({
  title: 'Keycard Shell - Open-Source, Modular Hardware Wallet',
  description:
    'A modular hardware wallet that relies on Keycard as the secure element. Open-source, swappable battery, infinite removable cards.',
  alternates: { canonical: '/keycard-shell' },
})

export default async function KeycardShellPage() {
  return (
    <>
      <h1 className="sr-only">
        Keycard Shell — Modular, Open-Source Crypto Hardware Wallet
      </h1>
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
