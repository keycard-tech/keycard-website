'use client'

import dynamic from 'next/dynamic'

const BuyCards = dynamic(
  () => import('./buy-cards').then(module => module.BuyCards),
  {
    ssr: false,
    loading: () => <div className="min-h-[320px]" aria-hidden="true" />,
  },
)

export { BuyCards }
