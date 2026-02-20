import { ExternalIcon, UsbIcon } from '@status-im/icons/20'
import { Metadata } from '~/app/_metadata'
import { buildLocaleAlternates } from '~/app/_utils/metadata'
import { ButtonLink } from '~components/button-link'
import { DownloadStatusForDesktop } from '~components/download-status-for-desktop'
import { Link } from '~components/link'
import { Tooltip } from '~components/tooltip'
import Image from 'next/image'

type MetadataProps = {
  params?: Promise<{
    locale?: string
  }>
}

export async function generateMetadata({ params }: MetadataProps) {
  const resolvedParams = params ? await params : undefined
  const locale = resolvedParams?.locale

  return Metadata({
    title: 'Get Started — Keycard & Keycard Shell',
    description:
      'Set up your Keycard and Keycard Shell, pair supported wallets, and learn best practices for backups and recovery.',
    alternates: buildLocaleAlternates(locale, '/start/keycard'),
  })
}

export default function StartKeycardPage() {
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

      {/* Step 1 */}
      <div className="mt-14 grid grid-flow-row gap-3">
        <h2 className="mb-6 flex justify-start gap-3 font-lora text-32 font-400 text-white-95">
          <span className="text-orange">1</span> Find out which wallet you can
          use with Keycard
        </h2>
        <div className="flex flex-col gap-4 rounded-28 border border-white-8 bg-white-4 p-6">
          <p className="font-inter text-16 font-300 text-white-80">
            Keycard works directly with compatible software wallets — on mobile
            via NFC, and on desktop using a USB card reader. Check out our{' '}
            <Link
              href="/help/use-keycard-directly-with-a-software-wallet"
              className="text-white-95 underline underline-offset-2 hover:text-white-60"
            >
              help article
            </Link>{' '}
            for setup instructions, or browse the{' '}
            <a
              href="https://keycard.tech/en/wallets"
              className="text-white-95 underline underline-offset-2 hover:text-white-60"
              target="_blank"
              rel="noopener noreferrer"
            >
              list of compatible wallets
            </a>
            .
          </p>
          <div className="flex items-center gap-1 rounded-16 border border-dashed border-white-12 bg-white-4 px-4 py-[14px]">
            <UsbIcon className="shrink-0 text-white-60" />
            <p className="text-14 font-300 text-white-60">
              Using a desktop wallet requires a USB card reader
            </p>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="mt-10 grid grid-flow-row gap-3">
        <h2 className="mb-2 flex items-center justify-start gap-3 font-lora text-32 font-400 text-white-95">
          <span className="text-orange">2</span> If you choose to use
          <Image
            src="/assets/status-logo.png"
            alt="Status"
            width={120}
            height={32}
          />
        </h2>
        <p className="mb-6 font-inter text-16 font-300 text-white-80">
          Currently, only Status Desktop supports Keycard. Keycard support is
          coming back soon to{' '}
          <Tooltip label="Keycard is still supported on Status Mobile with 'Status Legacy app.">
            <span className="cursor-help border-b border-dashed border-white-40 text-white-80">
              Status Mobile
            </span>
          </Tooltip>
          .
        </p>

        {/* Sub-step 2.1 */}
        <h3 className="mb-4 flex items-center justify-start gap-3 font-lora text-24 font-400 text-white-95">
          <span className="text-orange">2.1</span> Download Status
        </h3>
        <div className="mb-6">
          <DownloadStatusForDesktop />
        </div>

        {/* Sub-step 2.2 */}
        <h3 className="mb-4 flex justify-start gap-3 font-lora text-24 font-400 text-white-95">
          <span className="text-orange">2.2</span> Follow our guides
        </h3>
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex flex-1 flex-col rounded-28 border border-white-8 bg-white-4 p-6 pt-5">
            <h4 className="mb-1 font-lora text-24 font-400 text-white-95">
              If you never used Status
            </h4>
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
            <h4 className="mb-1 font-lora text-24 font-400 text-white-95">
              If you already have a Status profile
            </h4>
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
    </div>
  )
}
