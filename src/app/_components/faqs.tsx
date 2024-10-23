import * as Accordion from '@radix-ui/react-accordion'
import { cx } from 'cva'
import Image from 'next/image'
import { ButtonLink } from './button-link'

type IconProps = {
  className?: string
}

const ChevronDownIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      aria-hidden
      className={props.className}
    >
      <path
        stroke="#fff"
        stroke-opacity=".95"
        stroke-width="1.2"
        d="m5.5 8 4.5 4.5L14.5 8"
      />
    </svg>
  )
}

const DiscordIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
      <path
        fill="#fff"
        fill-opacity=".95"
        d="M16.248 3.839a14.66 14.66 0 0 0-3.714-1.167c-.16.29-.347.678-.476.988a13.635 13.635 0 0 0-4.115 0c-.129-.31-.32-.699-.481-.988a14.611 14.611 0 0 0-3.717 1.17C1.395 7.393.758 10.856 1.076 14.27a14.845 14.845 0 0 0 4.555 2.334c.367-.505.694-1.04.975-1.606a9.592 9.592 0 0 1-1.536-.748c.13-.095.255-.195.377-.298 2.962 1.386 6.18 1.386 9.106 0 .123.103.25.203.377.298a9.566 9.566 0 0 1-1.54.75c.282.563.608 1.101.976 1.606a14.818 14.818 0 0 0 4.558-2.336c.373-3.957-.639-7.389-2.676-10.431ZM7.01 12.17c-.89 0-1.618-.83-1.618-1.841 0-1.01.713-1.842 1.618-1.842.905 0 1.634.83 1.618 1.842.002 1.01-.713 1.84-1.618 1.84Zm5.98 0c-.889 0-1.618-.83-1.618-1.841 0-1.01.713-1.842 1.618-1.842.905 0 1.634.83 1.618 1.842 0 1.01-.713 1.84-1.618 1.84Z"
      />
    </svg>
  )
}

const XIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
      <path
        fill="#fff"
        fill-opacity=".95"
        fill-rule="evenodd"
        d="M8.428 10.797 3.02 3h4.183L17 16.984h-4.28l-3.673-5.295L4.407 17H3l5.428-6.203Zm4.785 5.256L4.804 3.93h1.909l8.492 12.122h-1.992Z"
        clip-rule="evenodd"
      />
      <path
        fill="#fff"
        fill-opacity=".95"
        d="m16.625 3.014-5.223 5.98-.62-.887 4.456-5.094 1.387.001Z"
      />
    </svg>
  )
}

const faqs = [
  {
    question: 'What is Keycard for?',
    answer:
      'Keycard is a secure hardware wallet for storing and managing your cryptocurrencies.',
  },
  {
    question: 'Which assets does Keycard support?',
    answer:
      'Keycard supports a wide range of cryptocurrencies including Bitcoin, Ethereum, and many ERC-20 tokens.',
  },
  {
    question: 'Are my funds safe if I lose my Keycard?',
    answer:
      'Yes, your funds are safe. You can recover your assets using your backup seed phrase.',
  },
  {
    question: 'What wallets support Keycard?',
    answer:
      'Keycard is compatible with various software wallets. Please check our documentation for a full list.',
  },
  {
    question: 'What happens if I lose access to my Keycard?',
    answer: 'You can recover your assets using your backup seed phrase.',
  },
]

export default function FAQSection() {
  return (
    <section className="mx-auto max-w-[1352px]">
      <div className="flex items-start justify-between pt-[200px]">
        <div>
          <h1 className="font-lora text-32 text-white-95">
            Something about faqs
          </h1>
          <Accordion.Root
            className="max-w-[549px] flex-1 pt-14"
            type="single"
            defaultValue="item-1"
            collapsible
          >
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                className={cx(
                  'overflow-hidden border-b border-dashed border-white-20 py-6 first:mt-0 last:border-b-0',
                )}
                value={`item-${index + 1}`}
              >
                <Accordion.Header className="flex">
                  <Accordion.Trigger
                    className={cx(
                      'group flex flex-1 cursor-default justify-between text-left font-lora text-24 leading-none text-white-95 outline-none',
                    )}
                  >
                    {faq.question}
                    <div className="rounded-[10px] border border-white-12 bg-white-6 p-[6px]">
                      <ChevronDownIcon className="text-white-95 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                  className={cx(
                    'overflow-hidden text-16 font-300 text-white-80 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
                  )}
                >
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
        <div className="flex flex-col items-end">
          <Image
            src="/assets/faqs.png"
            alt="FAQ Background"
            width="516"
            height="516"
          />

          <div className="flex max-w-[320px] flex-col gap-6 rounded-12 border border-white-6 bg-white-3 p-6 pt-5">
            <div>
              <p className="font-lora text-24 font-400 text-white-95">
                Still have questions?
              </p>
              <p className="text-16 text-white-80">
                Reach out to our team or engage with our community on Discord or
                X.
              </p>
            </div>
            <div className="flex gap-1">
              <ButtonLink href="/" variant="secondary">
                Get in touch
              </ButtonLink>
              <ButtonLink
                href="https://discord.com"
                variant="secondary"
                className="inline-flex"
              >
                <DiscordIcon />
              </ButtonLink>
              <ButtonLink
                href="https://x.com"
                variant="secondary"
                className="inline-flex"
              >
                <XIcon />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
