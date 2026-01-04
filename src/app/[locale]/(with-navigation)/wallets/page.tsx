'use client'

import { DiscordIcon, TwitterIcon } from '@status-im/icons/social'
import { KeycardIcon } from '~/app/_icons/keycard-icon'
import { KeycardShellIcon } from '~/app/_icons/keycard-shell-icon'
import { ButtonLink } from '~components/button-link'
import { Link } from '~components/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import { match } from 'ts-pattern'
import { Tabs, TabsList, TabsTrigger } from './_components/tabs'

const BuyCards = dynamic(
  () => import('../(homepage)/_components/buy-cards').then(m => m.BuyCards),
  {
    ssr: false,
    loading: () => <div className="min-h-[320px]" aria-hidden="true" />,
  },
)

type WalletType = 'Keycard' | 'Shell'
type BlockchainType = 'Ethereum' | 'Bitcoin' | 'Multisig'

interface Wallet {
  name: string
  icon?: {
    url: string
    width: number
    height: number
  }
  type: WalletType[]
  blockchains: BlockchainType[]
  setupGuideUrl: string
}

const WALLETS: Wallet[] = [
  {
    name: 'MetaMask',
    icon: { url: '/assets/wallets/metamask.png', width: 104, height: 100 },
    type: ['Shell'],
    blockchains: ['Ethereum'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
  {
    name: 'Status',
    icon: { url: '/assets/wallets/status.png', width: 96, height: 96 },
    type: ['Keycard'],
    blockchains: ['Ethereum'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
  {
    name: 'Rabby',
    icon: { url: '/assets/wallets/rabby.png', width: 146, height: 147 },
    type: ['Shell'],
    blockchains: ['Ethereum'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
  {
    name: 'imToken',
    icon: { url: '/assets/wallets/imtoken.png', width: 112, height: 79 },
    type: ['Shell'],
    blockchains: ['Ethereum'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
  {
    name: 'BitGet',
    icon: { url: '/assets/wallets/bitget.png', width: 132, height: 132 },
    type: ['Shell'],
    blockchains: ['Ethereum', 'Bitcoin'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
  {
    name: 'Unisat',
    icon: { url: '/assets/wallets/unisat.png', width: 82, height: 103 },
    type: ['Shell'],
    blockchains: ['Bitcoin'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
  {
    name: 'Specter',
    icon: { url: '/assets/wallets/specter.png', width: 112, height: 102 },
    type: ['Shell'],
    blockchains: ['Bitcoin', 'Multisig'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
  {
    name: 'Sparrow',
    icon: { url: '/assets/wallets/sparrow.png', width: 114, height: 114 },
    type: ['Shell'],
    blockchains: ['Bitcoin', 'Multisig'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
  {
    name: 'Nunchuk',
    icon: { url: '/assets/wallets/nunchuk.png', width: 96, height: 96 },
    type: ['Shell'],
    blockchains: ['Bitcoin', 'Multisig'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
  {
    name: 'BlueWallet',
    icon: { url: '/assets/wallets/bluewallet.png', width: 100, height: 100 },
    type: ['Shell'],
    blockchains: ['Bitcoin'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
  {
    name: 'Bitcoin Safe',
    icon: { url: '/assets/wallets/bitcoin-safe.png', width: 100, height: 100 },
    type: ['Shell'],
    blockchains: ['Bitcoin'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
  {
    name: 'Bull Bitcoin',
    icon: { url: '/assets/wallets/bullbitcoin.png', width: 100, height: 100 },
    type: ['Shell'],
    blockchains: ['Bitcoin'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
  {
    name: 'Walleth',
    icon: { url: '/assets/wallets/walleth.png', width: 96, height: 81 },
    type: ['Keycard'],
    blockchains: ['Ethereum'],
    setupGuideUrl: '/help/connect-keycard-shell-to-a-wallet-app',
  },
]

const Badge = ({ children }: { children: WalletType | BlockchainType }) => {
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
    .with('Multisig', () => (
      <span className="flex size-5 items-center justify-center rounded-full bg-white-10 text-[10px] font-500">
        M
      </span>
    ))
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
      <div className="mb-4 flex items-center justify-center">
        {wallet.icon ? (
          <div className="flex size-[100px] items-center justify-center">
            <Image
              src={wallet.icon.url}
              alt={`${wallet.name} logo`}
              height={wallet.icon.height}
              width={wallet.icon.width}
              className="size-full rounded-16 object-contain"
            />
          </div>
        ) : (
          <div className="flex size-[100px] items-center justify-center rounded-16 bg-white-20">
            <span className="text-32 font-500 text-white-60">
              {wallet.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <h3 className="mb-4 text-center font-lora text-24 font-400 text-white-95">
        {wallet.name}
      </h3>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {wallet.type.map(type => (
          <Badge key={type}>{type}</Badge>
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
  const [activeTab, setActiveTab] = useState<'All' | 'Keycard' | 'Shell'>('All')

  const filteredWallets = WALLETS.filter(wallet => {
    if (activeTab === 'All') return true
    return wallet.type.includes(activeTab)
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
        <p className="text-16 text-white-90 lg:text-20">
          <span className="hidden lg:inline">
            Step-by-step guides for wallets fully supported by Keycard and
            Keycard Shell.
          </span>
          <span className="lg:hidden">
            Step-by-step guides for ERC-4527 wallets fully supported by Keycard
            Shell.
          </span>
        </p>
      </header>

      <Tabs
        defaultValue="All"
        onValueChange={value =>
          setActiveTab(value as 'Keycard' | 'Shell' | 'All')
        }
      >
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Keycard">Keycard</TabsTrigger>
          <TabsTrigger value="Shell">Shell</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredWallets.map(wallet => (
          <WalletCard key={wallet.name} wallet={wallet} />
        ))}
      </div>

      <div className="mt-10 flex flex-1 flex-col gap-6 rounded-28 border border-white-8 bg-white-4 p-6 pt-5 lg:mt-6 lg:max-w-[435px]">
        <div className="flex flex-col gap-[6px]">
          <p className="font-lora text-24 font-400 text-white-95">
            Have questions?
          </p>
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
