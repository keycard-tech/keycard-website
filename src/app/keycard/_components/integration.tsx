import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/tabs'
import Image from 'next/image'
import { FeaturesAccordion } from './features-accordion'

// TODO: Replace with correct data when design has it.
const featuresMobile = [
  {
    title: 'Store your profile and chatkey',
    description: 'Here is a short description of the feature',
    image: '/assets/keycard/status-app-mobile.png',
  },
  {
    title: 'Send assets and collectibles',
    description:
      'Status supports all Ethereum assets in the Uniswap Labs default token list.',
    tokens: '/assets/keycard/tokens.png',
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

const featuresDesktop = [
  {
    title: 'Store your profile and chatkey',
    description: 'Here is a short description of the feature',
    image: '/assets/keycard/status-app-mobile.png',
  },
  {
    title: 'Send assets and collectibles',
    description:
      'Status supports all Ethereum assets in the Uniswap Labs default token list.',
    tokens: '/assets/keycard/tokens.png',
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
  return (
    <section className="-ml-[calc((100vw-100%)/2)] mt-[200px] flex w-screen justify-center border-y border-y-white-8 bg-white-3">
      <div className="w-full max-w-[1512px] p-20">
        <div className="flex max-w-[550px] flex-col gap-2 pb-8">
          <Image
            width={109}
            height={32}
            alt="Status"
            src="/assets/keycard/status-logo.png"
          />
          <h1 className="pt-1 font-lora text-32 font-400 text-white-95">
            Seamless integration with Status
          </h1>
          <p className="text-20 font-300 text-white-60">
            Keycard works straight out of the box with the Status app. No need
            to pair it, it just works!
          </p>
        </div>
        <Tabs defaultValue="desktop">
          <TabsList>
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
          <TabsContent value="desktop">
            <FeaturesAccordion items={featuresDesktop} />
          </TabsContent>
          <TabsContent value="mobile">
            <FeaturesAccordion items={featuresMobile} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export { Integration }
