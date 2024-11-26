import { BuyCards } from '~/app/(with-navigation)/(homepage)/_components/buy-cards'
import { ComparisonTable } from '~/app/(with-navigation)/(homepage)/_components/comparison-table'
import { Faqs } from '~/app/(with-navigation)/(homepage)/_components/faqs'
import { Hero } from '~/app/(with-navigation)/(homepage)/_components/hero'
import { KeycardFeatures } from '~/app/(with-navigation)/(homepage)/_components/keycard-features'
import { KeycardShell } from '~/app/(with-navigation)/(homepage)/_components/keycard-shell'

type Props = {
  searchParams: Promise<{
    buyKeycard?: string
  }>
}

export default async function HomePage({ searchParams }: Props) {
  const isBuyKeycardDialogOpen = (await searchParams).buyKeycard === 'true'

  return (
    <>
      <Hero isBuyKeycardDialogOpen={isBuyKeycardDialogOpen} />
      <KeycardShell />
      <KeycardFeatures />
      <ComparisonTable />
      <Faqs />
      <BuyCards />
    </>
  )
}
