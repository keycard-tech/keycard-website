import * as Accordion from '@radix-ui/react-accordion'
import { ButtonLink } from '~components/button-link'
import { ChevronDown, Discord, X } from '~icons'
import { cx } from 'cva'
import Image from 'next/image'

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

const Faqs = () => {
  return (
    <section className="mx-auto max-w-[1352px]">
      <div className="flex flex-col items-start justify-between px-3 lg:flex-row lg:items-end min-[1512px]:px-0">
        <div className="flex w-full flex-col lg:pt-[200px]">
          <div className="block pt-[120px] lg:hidden">
            <Image
              src="/assets/faqs-mobile.png"
              alt="FAQ Background"
              width={736}
              height={736}
              className="w-full"
            />
          </div>
          <h2 className="font-lora text-32 text-white-95">
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
                      <ChevronDown className="text-white-95 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                  className={cx(
                    'overflow-hidden text-16 font-300 text-white-80 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
                  )}
                >
                  <span className="flex pt-4">{faq.answer}</span>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
        <div className="flex flex-col items-end">
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

          <div className="mt-14 flex w-full flex-col gap-6 rounded-28 border border-white-8 bg-white-3 p-6 pt-5 lg:mt-0 lg:max-w-[320px]">
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
              <ButtonLink href="/" variant="secondary">
                Get in touch
              </ButtonLink>
              <ButtonLink
                href="https://discord.com" // TODO: fix this link
                variant="secondary"
                className="px-[9px]"
                aria-label="Keycard on Discord"
              >
                <Discord />
              </ButtonLink>
              <ButtonLink
                href="https://x.com/keycard_"
                variant="secondary"
                className="px-[9px]"
                aria-label="Keycard on X"
              >
                <X />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Faqs }
