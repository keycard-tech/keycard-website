import { Metadata } from '~/app/_metadata'

type Props = {
  children: React.ReactNode
}

export const metadata = Metadata({
  title: 'Wallets that support Keycard',
  description:
    'Compatible wallets for Keycard and Keycard Shell across Ethereum, Bitcoin, and multisig use cases.',
  alternates: { canonical: '/wallets' },
  openGraph: { url: '/wallets' },
})

export default function WalletsLayout({ children }: Props) {
  return <>{children}</>
}
