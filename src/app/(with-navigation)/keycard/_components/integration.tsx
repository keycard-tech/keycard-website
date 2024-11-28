import { ButtonLink } from '~components/button-link'
import { Link } from '~components/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/tabs'
import { ExternalIcon } from '~icons'
import Image from 'next/image'
import { FeaturesAccordion } from './features-accordion'
import { FeaturesSliderDesktop } from './features-slider-desktop'
import { FeaturesSliderMobile } from './features-slider-mobile'

const featuresMobile = [
  {
    title: 'Send crypto and NFTs',
    description: (
      <>
        Status supports all Ethereum assets in the{' '}
        <Link
          href="https://tokenlists.org/token-list?url=https://ipfs.io/ipns/tokens.uniswap.org"
          className="underline transition-colors hover:text-orange"
        >
          Uniswap Labs token list.
        </Link>
      </>
    ),
    image: '/assets/keycard/slider/status-app-mobile-send.png',
    imageMobile: '/assets/keycard/slider/iphone-send.png',
  },
  {
    title: 'Swap',
    description: 'Swap your favourite assets on Mainnet, Arbitrum or Optimism.',
    tag: 'SOON',
    image: '/assets/keycard/slider/status-app-mobile-swap.png',
    imageMobile: '/assets/keycard/slider/iphone-swap.png',
  },
  {
    title: 'Bridge',
    description: 'Bridge assets across Ethereum’s most popular chains.',
    image: '/assets/keycard/slider/status-app-mobile-bridge.png',
    imageMobile: '/assets/keycard/slider/iphone-bridge.png',
  },
  {
    title: 'Sign dApp transactions',
    description: (
      <>
        Connect to your favourite dApps with the{' '}
        <Link
          href="https://github.com/status-im/status-web/tree/main/apps/connector"
          className="underline transition-colors hover:text-orange"
        >
          Status Connector
        </Link>{' '}
        web extension.
      </>
    ),
    tag: 'SOON',
    image: '/assets/keycard/slider/status-app-mobile-dapp.png',
    imageMobile: '/assets/keycard/slider/iphone-dapp.png',
  },
]

const featuresDesktop = [
  {
    title: 'Send crypto and NFTs',
    description: (
      <>
        Status supports all Ethereum assets in the{' '}
        <Link
          href="https://tokenlists.org/token-list?url=https://ipfs.io/ipns/tokens.uniswap.org"
          className="underline transition-colors hover:text-orange"
        >
          Uniswap Labs token list.
        </Link>
      </>
    ),
    image: '/assets/keycard/slider/status-app-desktop-send.png',
    imageMobile: '/assets/keycard/slider/status-app-desktop-send.png',
  },
  {
    title: 'Swap',
    description: 'Swap your favourite assets on Mainnet, Arbitrum or Optimism.',
    tag: 'SOON',
    image: '/assets/keycard/slider/status-app-desktop-swap.png',
    imageMobile: '/assets/keycard/slider/status-app-desktop-swap.png',
  },
  {
    title: 'Bridge',
    description: 'Bridge assets across Ethereum’s most popular chains.',
    image: '/assets/keycard/slider/status-app-desktop-bridge.png',
    imageMobile: '/assets/keycard/slider/status-app-desktop-bridge.png',
  },
  {
    title: 'Sign dApp transactions',
    description: (
      <>
        Connect to your favourite dApps with the{' '}
        <Link
          href="https://github.com/status-im/status-web/tree/main/apps/connector"
          className="underline transition-colors hover:text-orange"
        >
          Status Connector
        </Link>{' '}
        web extension.
      </>
    ),
    tag: 'SOON',
    image: '/assets/keycard/slider/status-app-desktop-dapp.png',
    imageMobile: '/assets/keycard/slider/status-app-desktop-dapp.png',
  },
]

const integrations = [
  {
    name: 'Enno Wallet',
    description: 'Native Android Ethereum Wallet',
    logo: '/assets/keycard/enno.png',
    buttonText: 'Learn more',
    href: 'https://ennowallet.com/',
  },
  {
    name: 'WallETH',
    description: 'Native Android Ethereum Wallet',
    logo: '/assets/keycard/walleth.png',
    buttonText: 'Learn more',
    href: 'https://walleth.org/',
  },
  {
    name: 'Logos Operators',
    description: '5,000 Ordinals Collection',
    logo: '/assets/keycard/logos-operators.png',
    buttonText: 'Learn more',
    href: 'https://dashboard.logos.co/',
  },
]

const Integration = () => {
  return (
    <section className="mt-[200px]">
      <div className="flex justify-center border-y border-y-white-8 bg-white-4 remove-full-view-port lg:full-view-port">
        <div className="w-full max-w-[1512px] p-20 px-0 pb-5 lg:px-20 lg:pb-20">
          <div className="flex max-w-[550px] flex-col gap-2 px-3 pb-8 lg:px-0">
            <Image
              width={109}
              height={32}
              alt="Status"
              src="/assets/keycard/status-logo.png"
            />
            <h2 className="pt-1 font-lora text-32 font-400 text-white-95">
              Seamless integration with Status
            </h2>
            <p className="text-20 font-300 text-white-60">
              Keycard works straight out of the box with the Status app.
              <br />
              No need to pair it, it just works!
            </p>
          </div>
          <Tabs defaultValue="desktop">
            <TabsList className="mx-3 lg:mx-0">
              <TabsTrigger value="desktop">On desktop</TabsTrigger>
              <TabsTrigger value="mobile">On mobile</TabsTrigger>
            </TabsList>
            <TabsContent value="desktop" className="pt-20">
              <FeaturesAccordion
                variant="desktop"
                items={featuresDesktop}
                imageClassName="absolute top-0 min-w-[808px] translate-x-[45%] xl:translate-x-[43%] 2xl:translate-x-[33%] translate-y-[-87%] xl:min-w-[1008px] right-0 2xl:min-w-[1178px]"
              />
              <FeaturesSliderDesktop items={featuresDesktop} />
            </TabsContent>
            <TabsContent value="mobile" className="pt-20">
              <FeaturesAccordion
                variant="mobile"
                items={featuresMobile}
                imageClassName="absolute top-0 translate-x-[30%] xl:translate-x-0  max-w-[604px] translate-y-[-100%] right-0"
              />
              <FeaturesSliderMobile items={featuresMobile} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="px-3 pt-20 md:px-12">
        <h2 className="pb-4 pl-6 text-12 font-400 text-white-80 lg:pl-8">
          ALSO INTEGRATED WITH
        </h2>
        <div className="grid grid-cols-1 gap-8 rounded-28 border border-white-8 bg-white-4 p-6 pt-5 text-white-95 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:p-8 lg:pt-9">
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

              <ButtonLink
                href={integration.href}
                variant="secondary"
                className="group w-fit pr-2"
              >
                <span className="text-white-95">{integration.buttonText}</span>
                <ExternalIcon />
              </ButtonLink>
            </div>
          ))}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-lora text-24 font-500 text-white-95 lg:text-32">
                Want to integrate?
              </h2>
              <p className="text-16 text-white-80">
                Read our documentation or get in touch
              </p>
            </div>
            <div className="flex gap-3">
              <ButtonLink href="/docs">Read docs</ButtonLink>
              <ButtonLink
                href="mailto:support@keycard.tech"
                variant="secondary"
              >
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
