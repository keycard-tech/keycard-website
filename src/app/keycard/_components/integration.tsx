import { FeaturesAccordion } from './features-accordion'

const features = [
  {
    title: 'Store your profile and chatkey',
    description: 'Here is a short description of the feature',
    image: '/assets/keycard/status-app-mobile.png',
  },
  {
    title: 'Send assets and collectibles',
    description:
      'Status supports all Ethereum assets in the Uniswap Labs default token list.',
    icons: [
      '/placeholder.svg?height=30&width=30',
      '/placeholder.svg?height=30&width=30',
      '/placeholder.svg?height=30&width=30',
      '/placeholder.svg?height=30&width=30',
      '/placeholder.svg?height=30&width=30',
      '/placeholder.svg?height=30&width=30',
      '/placeholder.svg?height=30&width=30',
      '/placeholder.svg?height=30&width=30',
      '/placeholder.svg?height=30&width=30',
    ],
    image: '/assets/keycard/status-app-mobile.png',
  },
  {
    title: 'Bridge',
    description: 'Here is a short description of the feature',
    image: '/assets/keycard/status-app-mobile.png',
  },
  {
    title: 'Swap',
    description: 'Here is a short description of the feature',
    tag: 'SOON',
    image: '/assets/keycard/status-app-mobile.png',
  },
  {
    title: 'Sign dApp transactions',
    description: 'Here is a short description of the feature',
    image: '/assets/keycard/status-app-mobile.png',
  },
]

const Integration = () => {
  return <FeaturesAccordion items={features} />
}

export { Integration }
