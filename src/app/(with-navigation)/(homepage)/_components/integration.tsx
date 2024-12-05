import { Image } from '~components/image'
import { Link } from '~components/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/tabs'
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
          <Tabs defaultValue="mobile">
            <TabsList className="mx-3 lg:mx-0">
              <TabsTrigger value="mobile">On mobile</TabsTrigger>
              <TabsTrigger value="desktop">On desktop</TabsTrigger>
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
    </section>
  )
}

export { Integration }
