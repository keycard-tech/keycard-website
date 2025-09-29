import { ExternalIcon } from '@status-im/icons/20'
import { Metadata } from '~/app/_metadata'
import { ButtonLink } from '~components/button-link'
import { DownloadStatusForDesktop } from '~components/download-status-for-desktop'
import { DownloadStatusForMobile } from '~components/download-status-for-mobile'
import { FeaturesDisclaimer } from '~components/features-disclaimer'
import Image from 'next/image'

export const metadata = Metadata({
  title: 'Get Started — Keycard & Keycard Shell',
  description:
    'Set up your Keycard and Keycard Shell, pair supported wallets, and learn best practices for backups and recovery.',
  alternates: { canonical: '/start' },
})

export default function StartPage() {
  return (
    <div className="px-3 pb-[120px] pt-12 md:px-8 lg:px-20 lg:pt-20">
      <div className="mb-6 grid grid-flow-row gap-3">
        <h1 className="font-lora text-32 font-400 text-white-95 lg:text-48">
          Get started with Keycard
        </h1>
        <p className="font-inter text-20 font-300 text-white-95">
          Follow our step-by-step guides to set up your Keycard
        </p>
      </div>
      <div className="mt-14 grid grid-flow-row gap-3">
        <h2 className="mb-6 flex justify-start gap-3 font-lora text-32 font-400 text-white-95">
          <span className="text-orange">1</span> Download Status
        </h2>
        <div className="mb-6 flex flex-col gap-5 rounded-28 border border-white-8 bg-white-4 p-3 pt-5">
          <Image
            src="/assets/status-logo.png"
            alt="Status logo"
            width={120}
            height={32}
            className="ml-3"
          />
          <div className="flex flex-col gap-3 lg:flex-row">
            <DownloadStatusForDesktop title="Desktop" />
            <DownloadStatusForMobile title="Mobile" />
          </div>
          <FeaturesDisclaimer />
        </div>
      </div>
      <h2 className="my-6 flex justify-start gap-3 font-lora text-32 font-400 text-white-95">
        <span className="text-orange">2</span> Follow our guides
      </h2>
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="flex flex-1 flex-col rounded-28 border border-white-8 bg-white-4 p-6 pt-5">
          <h3 className="mb-1 font-lora text-24 font-400 text-white-95">
            If you never used Status
          </h3>
          <p className="mb-6 font-inter text-16 font-300 text-white-80">
            Learn how to create and store your keys directly on Keycard
          </p>
          <ButtonLink
            href="https://status.app/help/keycard/create-a-status-profile-using-keycard"
            variant="secondary"
            icon={<ExternalIcon />}
            className="mt-auto"
          >
            Get started
          </ButtonLink>
        </div>
        <div className="flex flex-1 flex-col rounded-28 border border-white-8 bg-white-4 p-6 pt-5">
          <h3 className="mb-1 font-lora text-24 font-400 text-white-95">
            If you already have a Status profile
          </h3>
          <p className="mb-6 font-inter text-16 font-300 text-white-80">
            Learn how to move your keys to Keycard
          </p>
          <ButtonLink
            href="https://status.app/help/keycard/secure-your-status-profile-or-wallet-with-keycard"
            variant="secondary"
            icon={<ExternalIcon />}
            className="mt-auto"
          >
            Get started
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
