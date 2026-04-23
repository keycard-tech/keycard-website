'use client'

import { DiscordIcon, TwitterIcon } from '@status-im/icons/social'
import { KeycardIcon } from '~/app/_icons/keycard-icon'
import { KeycardShellIcon } from '~/app/_icons/keycard-shell-icon'
import { ButtonLink } from '~components/button-link'
import { Link } from '~components/link'
import Image from 'next/image'
import { useState } from 'react'
import { match } from 'ts-pattern'
import { BuyCards } from '../(homepage)/_components/buy-cards-client'
import { Tabs, TabsList, TabsTrigger } from './_components/tabs'

type WalletType = 'Keycard' | 'Shell'
type BlockchainType = 'Ethereum' | 'Bitcoin'
type PlatformType = 'Mobile' | 'Desktop' | 'Extension'

interface Wallet {
  name: string
  icon?: {
    url: string
    width: number
    height: number
  }
  type: WalletType[]
  blockchains: BlockchainType[]
  platform: PlatformType[]
  setupGuideUrl: string
  websiteUrl: string
}

const WALLETS: Wallet[] = [
  {
    name: 'MetaMask',
    icon: { url: '/assets/wallets/metamask.png', width: 104, height: 100 },
    type: ['Shell'],
    blockchains: ['Ethereum'],
    platform: ['Mobile', 'Extension'],
    setupGuideUrl: '/help/connect-keycard-shell-to-metamask',
    websiteUrl: 'https://metamask.io',
  },
  {
    name: 'Status',
    icon: { url: '/assets/wallets/status.png', width: 96, height: 96 },
    type: ['Keycard'],
    blockchains: ['Ethereum'],
    platform: ['Mobile', 'Desktop'],
    setupGuideUrl: 'https://docs.keycard.tech/en/start/keycard',
    websiteUrl: 'https://docs.keycard.tech/en/start/keycard',
  },
  {
    name: 'Rabby',
    icon: { url: '/assets/wallets/rabby.png', width: 146, height: 147 },
    type: ['Shell'],
    blockchains: ['Ethereum'],
    platform: ['Mobile', 'Extension'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-software-wallet',
    websiteUrl: 'https://rabby.io',
  },
  {
    name: 'imToken',
    icon: { url: '/assets/wallets/imtoken.png', width: 112, height: 79 },
    type: ['Shell'],
    blockchains: ['Ethereum'],
    platform: ['Mobile'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-software-wallet',
    websiteUrl: 'https://token.im',
  },
  {
    name: 'BitGet',
    icon: { url: '/assets/wallets/bitget.png', width: 132, height: 132 },
    type: ['Shell'],
    blockchains: ['Ethereum', 'Bitcoin'],
    platform: ['Mobile', 'Extension'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-software-wallet',
    websiteUrl: 'https://web3.bitget.com',
  },
  {
    name: 'Unisat',
    icon: { url: '/assets/wallets/unisat.png', width: 82, height: 103 },
    type: ['Shell'],
    blockchains: ['Bitcoin'],
    platform: ['Extension'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-software-wallet',
    websiteUrl: 'https://unisat.io',
  },
  {
    name: 'Specter',
    icon: { url: '/assets/wallets/specter.png', width: 112, height: 102 },
    type: ['Shell'],
    blockchains: ['Bitcoin'],
    platform: ['Desktop'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-software-wallet',
    websiteUrl: 'https://specter.solutions/desktop',
  },
  {
    name: 'Sparrow',
    icon: { url: '/assets/wallets/sparrow.png', width: 114, height: 114 },
    type: ['Keycard', 'Shell'],
    blockchains: ['Bitcoin'],
    platform: ['Desktop'],
    setupGuideUrl: '/help/connect-keycard-shell-to-sparrow-wallet',
    websiteUrl: 'https://sparrowwallet.com',
  },
  {
    name: 'Nunchuk',
    icon: { url: '/assets/wallets/nunchuk.png', width: 96, height: 96 },
    type: ['Shell'],
    blockchains: ['Bitcoin'],
    platform: ['Mobile', 'Desktop'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-software-wallet',
    websiteUrl: 'https://nunchuk.io',
  },
  {
    name: 'BlueWallet',
    icon: { url: '/assets/wallets/bluewallet.png', width: 100, height: 100 },
    type: ['Shell'],
    blockchains: ['Bitcoin'],
    platform: ['Mobile', 'Desktop'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-software-wallet',
    websiteUrl: 'https://bluewallet.io',
  },
  {
    name: 'Bitcoin Safe',
    icon: { url: '/assets/wallets/bitcoin-safe.png', width: 100, height: 100 },
    type: ['Shell'],
    blockchains: ['Bitcoin'],
    platform: ['Desktop'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-software-wallet',
    websiteUrl: 'https://bitcoin-safe.org',
  },
  {
    name: 'Cove',
    icon: { url: '/assets/wallets/cove.png', width: 100, height: 100 },
    type: ['Shell'],
    blockchains: ['Bitcoin'],
    platform: ['Mobile'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-software-wallet',
    websiteUrl: 'https://covebitcoinwallet.com',
  },
  {
    name: 'Bull Bitcoin',
    icon: { url: '/assets/wallets/bullbitcoin.png', width: 100, height: 100 },
    type: ['Shell'],
    blockchains: ['Bitcoin'],
    platform: ['Mobile'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-software-wallet',
    websiteUrl: 'https://wallet.bullbitcoin.com',
  },
  {
    name: 'Walleth',
    icon: { url: '/assets/wallets/walleth.png', width: 96, height: 81 },
    type: ['Keycard'],
    blockchains: ['Ethereum'],
    platform: ['Mobile'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-software-wallet',
    websiteUrl: 'https://walleth.org',
  },
  {
    name: 'Ambire',
    icon: { url: '/assets/wallets/ambire.svg', width: 100, height: 100 },
    type: ['Shell'],
    blockchains: ['Ethereum'],
    platform: ['Extension'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-software-wallet',
    websiteUrl: 'https://www.ambire.com',
  },
]

const MobileIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path d="M7 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </svg>
)

const DesktopIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M2 4.25A2.25 2.25 0 0 1 4.25 2h11.5A2.25 2.25 0 0 1 18 4.25v8.5A2.25 2.25 0 0 1 15.75 15h-4v2h2a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h2v-2H4.25A2.25 2.25 0 0 1 2 12.75v-8.5Z"
      clipRule="evenodd"
    />
  </svg>
)

const ExtensionIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path d="M10 2.5a.75.75 0 0 1 .75.75v1a2.25 2.25 0 0 1 2.25 2.25h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0v-1h-1a.75.75 0 0 1 0-1.5h1A.75.75 0 0 0 12.25 5.75v-1h-1a.75.75 0 0 1 0-1.5h-1v-1A.75.75 0 0 1 10 2.5ZM3.5 7A2.5 2.5 0 0 1 6 4.5h1.75a.75.75 0 0 1 0 1.5H6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-1.75a.75.75 0 0 1 1.5 0V14a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 14V7Z" />
  </svg>
)

type BadgeType = WalletType | BlockchainType | PlatformType

const Badge = ({ children }: { children: BadgeType }) => {
  const icon = match(children)
    .with('Keycard', () => <KeycardIcon className="size-5 p-[2px]" />)
    .with('Shell', () => <KeycardShellIcon className="size-5 p-[2px]" />)
    .with('Ethereum', () => (
      <Image
        src="/assets/wallets/ethereum.png"
        alt="Ethereum"
        width={16}
        height={16}
        className="size-5 p-[2px]"
      />
    ))
    .with('Bitcoin', () => (
      <Image
        src="/assets/wallets/bitcoin.png"
        alt="Bitcoin"
        width={16}
        height={16}
        className="size-5 p-[2px]"
      />
    ))
    .with('Mobile', () => <MobileIcon className="size-5 p-[2px]" />)
    .with('Desktop', () => <DesktopIcon className="size-5 p-[2px]" />)
    .with('Extension', () => <ExtensionIcon className="size-5 p-[2px]" />)
    .exhaustive()

  return (
    <div className="flex items-center gap-1 rounded-28 bg-white-10 px-2 py-[3px] pl-[2px] text-13 text-white-100">
      {icon} {children}
    </div>
  )
}

function WalletCard({ wallet }: { wallet: Wallet }) {
  return (
    <div className="flex flex-col items-center rounded-20 border border-white-8 bg-white-4 p-6">
      <a
        href={wallet.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 mb-4 flex items-center justify-center transition-opacity"
      >
        {wallet.icon ? (
          <div className="flex size-[100px] items-center justify-center">
            <Image
              src={wallet.icon.url}
              alt={`${wallet.name} logo`}
              height={wallet.icon.height}
              width={wallet.icon.width}
              className="size-full rounded-16 object-contain"
              unoptimized={wallet.icon.url.endsWith('.svg')}
            />
          </div>
        ) : (
          <div className="flex size-[100px] items-center justify-center rounded-16 bg-white-20">
            <span className="text-32 font-500 text-white-60">
              {wallet.name.charAt(0)}
            </span>
          </div>
        )}
      </a>
      <h3 className="mb-4 text-center font-lora text-24 font-400 text-white-95">
        {wallet.name}
      </h3>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {wallet.type.map(type => (
          <Badge key={type}>{type}</Badge>
        ))}
        {wallet.platform.map(p => (
          <Badge key={p}>{p}</Badge>
        ))}
        {wallet.blockchains.map(blockchain => (
          <Badge key={blockchain}>{blockchain}</Badge>
        ))}
      </div>
      <Link
        href={wallet.setupGuideUrl}
        className="inline-flex items-center gap-1 rounded-12 border border-white-12 bg-white-4 pb-[10px] pl-[14px] pr-[10px] pt-2 text-16 font-500 text-white-95 transition-colors hover:border-white-20 hover:bg-white-8"
      >
        Setup guide
      </Link>
    </div>
  )
}

export default function WalletsPage() {
  const [activeHardware, setActiveHardware] = useState<'All' | WalletType>(
    'All',
  )
  const [activePlatform, setActivePlatform] = useState<'All' | PlatformType>(
    'All',
  )
  const [activeAsset, setActiveAsset] = useState<'All' | BlockchainType>('All')

  const filteredWallets = WALLETS.filter(wallet => {
    if (activeHardware !== 'All' && !wallet.type.includes(activeHardware))
      return false
    if (activePlatform !== 'All' && !wallet.platform.includes(activePlatform))
      return false
    if (activeAsset !== 'All' && !wallet.blockchains.includes(activeAsset))
      return false
    return true
  })

  return (
    <div className="px-3 pb-[120px] pt-12 md:px-8 lg:px-20 lg:pt-20">
      <header className="mb-8 grid gap-3">
        <h1 className="font-lora text-32 font-400 text-white-95 lg:text-48">
          <span className="hidden lg:inline">
            Wallets compatible with Keycard and Shell
          </span>
          <span className="lg:hidden">
            Wallets compatible with Keycard Shell
          </span>
        </h1>
        <h2 className="text-16 text-white-90 lg:text-20">
          <span className="hidden lg:inline">
            Step-by-step guides for wallets fully supported by Keycard and
            Keycard Shell.
          </span>
          <span className="lg:hidden">
            Step-by-step guides for ERC-4527 wallets fully supported by Keycard
            Shell.
          </span>
        </h2>
      </header>

      <h2 className="font-lora text-24 font-400 text-white-95">
        Filter software wallets
      </h2>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-[120px] shrink-0 text-14 font-500 text-white-60">
            By platform
          </span>
          <Tabs
            defaultValue="All"
            onValueChange={value =>
              setActivePlatform(value as 'All' | PlatformType)
            }
          >
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Mobile">Mobile</TabsTrigger>
              <TabsTrigger value="Desktop">Desktop</TabsTrigger>
              <TabsTrigger value="Extension">Browser extension</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-[120px] shrink-0 text-14 font-500 text-white-60">
            By assets
          </span>
          <Tabs
            defaultValue="All"
            onValueChange={value =>
              setActiveAsset(value as 'All' | BlockchainType)
            }
          >
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Bitcoin">Bitcoin</TabsTrigger>
              <TabsTrigger value="Ethereum">Ethereum</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-[120px] shrink-0 text-14 font-500 text-white-60">
            Integrates with
          </span>
          <Tabs
            defaultValue="All"
            onValueChange={value =>
              setActiveHardware(value as 'All' | WalletType)
            }
          >
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Keycard">Keycard</TabsTrigger>
              <TabsTrigger value="Shell">Shell</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filteredWallets.length > 0 ? (
        <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWallets.map(wallet => (
            <WalletCard key={wallet.name} wallet={wallet} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-16 text-white-60">
          No wallets match these filters. Try adjusting your selection.
        </p>
      )}

      <div className="mt-10 flex flex-1 flex-col gap-6 rounded-28 border border-white-8 bg-white-4 p-6 pt-5 lg:mt-6 lg:max-w-[435px]">
        <div className="flex flex-col gap-[6px]">
          <h2 className="font-lora text-24 font-400 text-white-95">
            Have questions? <span className="sr-only">Wallet support</span>
          </h2>
          <p className="text-16 font-300 text-white-60">
            Reach out to our team or engage with our community on Discord or X.
          </p>
        </div>
        <div className="flex gap-3">
          <ButtonLink href="mailto:support@keycard.tech" variant="secondary">
            Get in touch
          </ButtonLink>
          <ButtonLink
            href="https://discord.gg/uJAXk7jFhZ"
            variant="secondary"
            className="px-[9px]"
            aria-label="Keycard on Discord"
          >
            <DiscordIcon />
          </ButtonLink>
          <ButtonLink
            href="https://x.com/keycard_"
            variant="secondary"
            className="px-[9px]"
            aria-label="Keycard on X"
          >
            <TwitterIcon />
          </ButtonLink>
        </div>
      </div>

      <BuyCards />
    </div>
  )
}
