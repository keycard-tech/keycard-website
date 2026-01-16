import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@status-im/icons/20'
import { DiscordIcon, TwitterIcon } from '@status-im/icons/social'
import { Metadata } from '~/app/_metadata'
import { buildLocaleAlternates } from '~/app/_utils/metadata'
import { ButtonLink } from '~components/button-link'
import { Link } from '~components/link'
import { cx } from 'cva'
import Image from 'next/image'
import { BuyCards } from '../../(homepage)/_components/buy-cards-client'

const STEPS = [
  {
    title: '1. Prepare devices',
    description:
      'Inside the box, there is one Shell and two Keycards.',
    subSteps: [
      {
        title: 'a. Open back cover',
        description:
          'Gently press the back cover on its upper part and slide it downward to remove.',
        image: {
          src: '/assets/start/part-1-a.png',
          width: 280,
          height: 280,
        },
      },
      {
        title: 'b. Insert battery',
        description:
          'Insert the battery into its slot. Slide the back cover upward to close.',
        image: {
          src: '/assets/start/part-1-b.png',
          width: 280,
          height: 280,
        },
      },
      {
        title: 'c. Insert Keycard',
        description:
          'Insert the Keycard with the chip facing up and push it in all the way. The Shell powers on automatically.',
        image: {
          src: '/assets/start/part-1-c.png',
          width: 280,
          height: 280,
        },
      },
    ],
    secondaryDescription: (
      <>
        If the screen stays off, first make sure your card is pushed all the way. If it is, charge the Shell with a USB-C cable and try
        again later. Check out{' '}
        <Link className="underline" href="/help/faq">
          FAQ
        </Link>{' '}
        for more tips.
      </>
    ),
  },
  {
    title: '2. Create PIN',
    description:
      'If Shell prompts you to create a PIN, it means your Keycard is new, uninitialized, and contains no existing secrets.',
    subSteps: [
      {
        title: 'a. Create Keycard PIN',
        description:
          'Choose a PIN for your Keycard. Keep it secure and never share it.',
        image: {
          src: '/assets/start/part-2-a.png',
          width: 280,
          height: 210,
        },
      },
      {
        title: 'b. Set duress PIN',
        description: 'Optionally set your duress PIN and export it to confirm.',
        image: {
          src: '/assets/start/part-2-b.png',
          width: 280,
          height: 210,
        },
      },
    ],
    secondaryDescription: (
      <>
        The duress PIN enhances your wallet security. Choose a duress PIN
        different from your Keycard PIN to avoid confusion. Check out{' '}
        <Link
          className="underline"
          href="/help/about-your-keycard-pin-and-duress-pin"
        >
          About the duress PIN
        </Link>{' '}
        to learn more about it.
      </>
    ),
  },
  {
    title: '3-I. Generate a new key pair',
    description:
      'If you want to begin with new addresses, select Generate new key pair on Shell.',
    subSteps: [
      {
        title: 'a. Choose length',
        description:
          'A shorter phrase is convenient, while a longer phrase is most secure.',
        image: {
          src: '/assets/start/part-3-I-a.png',
          width: 280,
          height: 210,
        },
      },
      {
        title: 'b. Backup recovery phrase',
        description: 'Write down your recovery phrase and keep it safe.',
        image: {
          src: '/assets/start/part-3-I-b.png',
          width: 280,
          height: 210,
        },
      },
      {
        title: 'c. Confirm recovery phrase',
        description: 'Select words from your recovery phrase to confirm.',
        image: {
          src: '/assets/start/part-3-I-c.png',
          width: 280,
          height: 210,
        },
      },
    ],
    secondaryDescription:
      "Your recovery phrase represents access to your wallet and funds. Keep it safe and never share it with anyone. Don't take a photo.",
  },
  {
    title: '3-II. Import an existing key pair',
    description:
      'Alternatively, select Import recovery phrase to add an existing key pair to your Keycard.',
    subSteps: [
      {
        title: 'a. Select length',
        description:
          'Keycard supports importing recovery phrases with 12, 18 or 24 words.',
        image: {
          src: '/assets/start/part-3-II-a.png',
          width: 280,
          height: 210,
        },
      },
      {
        title: 'b. Type each word',
        description:
          'Press Up/Down and Left/Right to select and confirm each word.',
        image: {
          src: '/assets/start/part-3-II-b.png',
          width: 280,
          height: 210,
        },
      },
      {
        title: 'c. Confirm words',
        description:
          'Press and hold OK to confirm the suggested or typed word.',
        image: {
          src: '/assets/start/part-3-II-c.png',
          width: 280,
          height: 210,
        },
      },
    ],
    secondaryDescription:
      "The Keycard and Shell don't store or have access to your recovery phrase.",
  },
  {
    title: '4. Verify Shell (optional)',
    description: (
      <>
        Verification checks that your Shell is authentic and runs a verified
        firmware. You need your phone or a computer with a camera to complete this process.
        Check out{' '}
        <Link className="underline" href="https://shell.keycard.tech/verify/">
          Verify your Shell Authenticity
        </Link>{' '}
        for details.
      </>
    ),
    subSteps: [
      {
        title: 'a. Open verification web app',
        description:
          'On the Shell, go to Settings > Security > Verification. Open the web app with your phone or computer.',
        image: {
          src: '/assets/start/part-4-a.png',
          width: 280,
          height: 210,
        },
      },
      {
        title: 'b. Scan QR on web app',
        description:
          "Use the Shell to scan the QR code from the camera. Scan the web app's QR code.",
        image: {
          src: '/assets/start/part-4-b.png',
          width: 280,
          height: 210,
        },
      },
      {
        title: 'c. Scan code on Shell',
        description:
          'Scan the QR on the Shell with your phone or computer to confirm the web app is authentic.',
        image: {
          src: '/assets/start/part-4-c.png',
          width: 280,
          height: 210,
        },
      },
    ],
    secondaryDescription: (
      <>
        If your device isn&apos;t authentic, don&apos;t use it. Contact the
        Keycard team on{' '}
        <Link className="underline" href="https://discord.gg/uJAXk7jFhZ">
          Discord
        </Link>
        .
      </>
    ),
  },
  {
    title: '5. Connect to a software wallet',
    description: (
      <>
        Connect Shell to a compatible{' '}
        <Link className="underline" href="/wallets">
          software wallet
        </Link>{' '}
        and use it as an interface for managing funds. Check out{' '}
        <Link
          className="underline"
          href="/help/connect-keycard-shell-to-a-wallet-app"
        >
         this article
        </Link>{' '}
        for more info.
      </>
    ),
    subSteps: [
      {
        title: 'a. Set up in a software wallet',
        description:
          'In your software wallet, select the option to add a hardware wallet. Tap "Continue" and follow instruction.',
        image: {
          src: '/assets/start/part-5-a.png',
          width: 280,
          height: 210,
        },
      },
      {
        title: 'b. Select your wallet type',
        description:
          'On Shell go to Connect software wallet and select a wallet type, then use the QR function.',
        image: {
          src: '/assets/start/part-5-b.png',
          width: 280,
          height: 210,
        },
      },
      {
        title: 'c. Select the accounts to connect',
        description:
          'In your software wallet, select the Keycard accounts and set up.',
        image: {
          src: '/assets/start/part-5-c.png',
          width: 280,
          height: 210,
        },
      },
    ],
    secondaryDescription: (
      <>
        If you don&apos;t see &quot;Keycard&quot; or &quot;Shell&quot; listed in
        your software wallet, they may still be compatible. Check out a list of{' '}
        <Link className="underline" href="/wallets/">
          compatible software wallets
        </Link>{' '}
        for the full list.
      </>
    ),
  },
]

type MetadataProps = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: MetadataProps) {
  const { locale } = await params

  return Metadata({
    title: 'Get Started — Keycard & Keycard Shell',
    description:
      'Set up your Keycard and Keycard Shell, pair supported wallets, and learn best practices for backups and recovery.',
    alternates: buildLocaleAlternates(locale, '/start'),
  })
}

export default function StartShellPage() {
  return (
    <div className="mt-6 px-5 2xl:px-1">
      <div className="relative z-20 grid grid-flow-row gap-4 py-5">
        <h1 className="font-lora text-32 font-400 text-white-95 lg:text-48">
          Keycard Shell Quick Start Guide
        </h1>
        <h2 className="font-inter text-20 font-300 text-white-95">
          All you need to know to start using Keycard Shell
        </h2>
      </div>

      <h2 className="mt-4 font-lora text-24 font-400 text-white-95">
        Keycard Shell setup steps
      </h2>
      <Accordion.Root
        className="flex-1"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        {STEPS.map((step, index) => (
          <Accordion.Item
            key={index}
            className={cx('overflow-hidden py-5 first:mt-0')}
            value={`item-${index + 1}`}
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger
                className={cx(
                  'group flex flex-1 cursor-pointer items-center justify-between gap-6 text-left font-lora text-24 leading-none text-white-95 outline-none',
                )}
              >
                {step.title}
                <div className="rounded-10 border border-white-12 bg-white-8 p-[6px] hover:border-white-20 hover:bg-white-12">
                  <ChevronDownIcon className="text-white-95 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                </div>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content
              className={cx(
                'overflow-hidden text-16 font-300 text-white-80 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
              )}
            >
              <div className="py-5 pr-14">{step.description}</div>
              <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
                {step.subSteps.map((subStep, subStepIndex) => (
                  <div
                    key={subStepIndex}
                    className="flex min-w-[330px] max-w-[330px] flex-col justify-between gap-3 rounded-28 border border-white-8 bg-white-4 px-6 pb-6 pt-5"
                  >
                    <div className="flex flex-col gap-[6px]">
                      <h3 className="text-20 font-300 text-white-95">
                        {subStep.title}
                      </h3>
                      <p className="text-16 font-300 text-white-60">
                        {subStep.description}
                      </p>
                    </div>
                    <Image
                      src={subStep.image.src}
                      alt={subStep.title}
                      width={subStep.image.width}
                      height={subStep.image.height}
                      className="max-w-[280px] rounded-24 bg-[#181716]"
                    />
                  </div>
                ))}
              </div>
              <div className="py-5 pr-14">{step.secondaryDescription}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <div className="my-10 flex flex-1 flex-col gap-6 rounded-28 border border-white-8 bg-white-4 p-6 pt-5 sm:max-w-[350px] lg:mb-0 lg:mt-6 lg:max-w-[434px]">
        <div className="flex flex-col gap-[6px]">
          <h2 className="font-lora text-24 font-400 text-white-95">
            Have questions?{' '}
            <span className="sr-only">Keycard Shell support</span>
          </h2>
          <p className="text-16 font-300 text-white-80">
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

      <div className="-mt-20">
        <BuyCards />
      </div>
    </div>
  )
}
