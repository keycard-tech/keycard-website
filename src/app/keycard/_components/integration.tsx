import { ButtonLink } from '~components/button-link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/tabs'
import { External } from '~icons'
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

const integrations = [
  {
    name: 'Enno Wallet',
    description: 'Native Android Ethereum Wallet',
    logo: '/assets/keycard/enno.png',
    buttonText: 'Learn more',
  },
  {
    name: 'WallETH',
    description: 'Native Android Ethereum Wallet',
    logo: '/assets/keycard/walleth.png',
    buttonText: 'Learn more',
  },
  {
    name: 'Logos Operators',
    description: '5,000 Ordinals Collection',
    logo: '/assets/keycard/logos-operators.png',
    buttonText: 'Learn more',
  },
]

const Integration = () => {
  return (
    <section>
      {/* eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values*/}
      <div className="-ml-[calc((100vw-100%)/2)] mt-[200px] flex w-screen justify-center border-y border-y-white-8 bg-white-3">
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
      </div>

      <div className="px-6 pt-20 md:px-20">
        <h2 className="mb-4 text-12 font-400 text-white-80">
          ALSO INTEGRATED WITH
        </h2>
        <div className="grid grid-cols-1 gap-6 rounded-28 border border-white-8 bg-white-3 p-8 pt-9 text-white-95 md:grid-cols-2 lg:grid-cols-4">
          {integrations.map((integration, index) => (
            <div key={index} className="flex flex-col">
              <div className="mb-3 inline-flex items-center">
                {integration.logo && (
                  <Image
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    width={24}
                    height={23}
                    className="mr-2"
                  />
                )}
                <h3 className="font-lora text-24 font-400">
                  {integration.name}
                </h3>
              </div>
              <p className="mb-6 text-16 font-300 text-white-80">
                {integration.description}
              </p>

              <ButtonLink href="/" variant="secondary" className="group w-fit">
                <span className="text-white-95">{integration.buttonText}</span>
                <External />
              </ButtonLink>
            </div>
          ))}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-lora text-32 font-500 text-white-95">
                Want to integrate?
              </h2>
              <p className="text-16 text-white-80">
                Read our documentation or get in touch
              </p>
            </div>
            <div className="flex gap-3">
              <ButtonLink href="/">Read docs</ButtonLink>
              <ButtonLink href="/" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Integration }
