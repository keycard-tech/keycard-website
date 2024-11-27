import { cx } from 'cva'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import { Metadata } from './_metadata'
import { Providers } from './_providers'

const lora = Lora({
  variable: '--font-lora',
  weight: '400',
  subsets: ['latin'],
  preload: true,
})

const inter = Inter({
  variable: '--font-inter',
  weight: ['200', '300', '400', '500'],
  subsets: ['latin'],
  preload: true,
})

export const metadata = Metadata({
  metadataBase: new URL('https://keycard.tech/'),

  title: {
    default: 'Keycard',
    template: '%s - Keycard',
  },
  description:
    'Join the open source revolution of the most modular and future proof hardware wallet system ever conceived.',

  alternates: {
    canonical: './',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@keycard_',
  },
})

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={cx(
          lora.variable,
          inter.variable,
          'bg-dark-100 p-2 pt-0 font-inter text-white-100 antialiased',
        )}
      >
        <Providers>
          <div className="flex w-full justify-center">
            <div className="w-full">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
