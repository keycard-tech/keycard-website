import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@status-im/icons/20'
import { TwitterIcon } from '@status-im/icons/social'
import { ButtonLink } from '~components/button-link'
import { Image } from '~components/image'
import { Link } from '~components/link'
import { cx } from 'cva'

const faqs = [
  {
    question: 'What is Keycard for?',
    answer:
      'Keycard is a secure hardware wallet for storing and managing your cryptocurrencies.',
  },
  {
    question: 'Which assets does Keycard support?',
    answer: (
      <>
        Keycard works seamlessly with Ethereum and EVM based assets. It supports
        all assets on{' '}
        <Link
          href="https://tokenlists.org/token-list?url=https://ipfs.io/ipns/tokens.uniswap.org"
          className="underline decoration-1 underline-offset-2 transition-colors hover:text-orange"
        >
          Uniswap Labs default token list
        </Link>
        .
      </>
    ),
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
    question: 'Why should I get a Keycard?',
    answer:
      'Keycard is a secure, pocket-sized hardware wallet with a provably genuine, immutable chip to protect your digital assets.',
  },
]

const Faqs = () => {
  return (
    <section className="mx-auto max-w-[1352px] pt-[144px]">
      <div className="flex flex-col items-start justify-between px-3 lg:flex-row lg:items-end min-[1512px]:px-0">
        <div className="flex w-full flex-1 flex-col lg:w-auto">
          <div className="flex justify-center pt-[120px] lg:hidden">
            <Image
              src="/assets/faqs-mobile.png"
              alt="FAQ Background"
              width={736}
              height={736}
              className="w-full"
            />
          </div>
          <h2 className="mt-14 font-lora text-32 text-white-95 lg:mt-0">
            Frequently asked questions
          </h2>
          <Accordion.Root
            className="flex-1 pt-8 lg:max-w-[549px] lg:pt-14"
            type="single"
            defaultValue="item-1"
            collapsible
          >
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                className={cx(
                  'overflow-hidden border-b border-dashed border-white-20 py-6 first:mt-0',
                )}
                value={`item-${index + 1}`}
              >
                <Accordion.Header className="flex">
                  <Accordion.Trigger
                    className={cx(
                      'group flex flex-1 cursor-pointer items-center justify-between gap-6 text-left font-lora text-24 leading-none text-white-95 outline-none',
                    )}
                  >
                    {faq.question}
                    <div className="rounded-[10px] border border-white-12 bg-white-8 p-[6px]">
                      <ChevronDownIcon className="text-white-95 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                  className={cx(
                    'overflow-hidden pr-14 text-16 font-300 text-white-80 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
                  )}
                >
                  <div className="pt-4">{faq.answer}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
        <div className="flex flex-1 flex-col lg:w-auto lg:items-center">
          <div className="relative hidden lg:block">
            <div className="absolute right-[-100px] top-[-20px] z-10 h-[380px] w-full bg-gradient-to-tr from-[transparent] via-dark-100 via-[83%] to-dark-100" />
            <Image
              src="/assets/faqs.png"
              alt="FAQ Background"
              height={790}
              width={1010}
              className="relative right-[-95px] top-[-40px]"
            />
          </div>

          <div className="mt-14 flex flex-1 flex-col gap-6 rounded-28 border border-white-8 bg-white-4 p-6 pt-5 lg:mt-10 lg:max-w-[320px]">
            <div className="flex flex-col gap-[6px]">
              <p className="font-lora text-24 font-400 text-white-95">
                Still have questions?
              </p>
              <p className="text-16 font-300 text-white-80">
                Reach out to our team or engage with our community on Discord or
                X.
              </p>
            </div>
            <div className="flex gap-3">
              <ButtonLink
                href="mailto:support@keycard.tech"
                variant="secondary"
              >
                Get in touch
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
        </div>
      </div>
    </section>
  )
}

export { Faqs }
