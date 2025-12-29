'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@status-im/icons/20'
import { TwitterIcon } from '@status-im/icons/social'
import { ButtonLink } from '~components/button-link'
import { Image } from '~components/image'
import { JsonLd } from '~components/json-ld'
import { Link } from '~components/link'
import { cx } from 'cva'
import { useTranslations } from 'next-intl'

const getFaqs = (t: ReturnType<typeof useTranslations>) => [
  {
    question: t('faqs.what_is_keycard.question.translation'),
    answer: t('faqs.what_is_keycard.answer.translation'),
  },
  {
    question: t('faqs.which_assets.question.translation'),
    answer: (
      <>
        {t('faqs.which_assets.answer.translation')}{' '}
        <Link
          href="https://tokenlists.org/token-list?url=https://ipfs.io/ipns/tokens.uniswap.org"
          className="underline decoration-1 underline-offset-2 transition-colors hover:text-orange"
        >
          {t('faqs.which_assets.link_text.translation')}
        </Link>
        .
      </>
    ),
    answerText: t('faqs.which_assets.answer_text.translation'),
  },
  {
    question: t('faqs.funds_safe.question.translation'),
    answer: t('faqs.funds_safe.answer.translation'),
  },
  {
    question: t('faqs.wallets_support.question.translation'),
    answer: t('faqs.wallets_support.answer.translation'),
  },
  {
    question: t('faqs.why_get_keycard.question.translation'),
    answer: t('faqs.why_get_keycard.answer.translation'),
  },
]

const Faqs = () => {
  const t = useTranslations()
  const faqs = getFaqs(t)

  return (
    <section className="mx-auto max-w-[1352px] pt-[144px]">
      <div className="flex flex-col items-start justify-between px-3 lg:flex-row lg:items-end min-[1512px]:px-0">
        <div className="flex w-full flex-1 flex-col lg:w-auto">
          <div className="flex translate-x-5 justify-center lg:hidden">
            <Image
              src="/assets/faqs.png"
              alt="FAQ Background"
              width={540}
              height={540}
              className="w-[80vw] max-w-[420px]"
              sizes="(max-width:1023px) 80vw, 420px"
            />
          </div>
          <h2 className="mt-14 font-lora text-32 text-white-95 lg:mt-0">
            {t('faqs.title.translation')}
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
                    <div className="rounded-10 border border-white-12 bg-white-8 p-[6px] hover:border-white-20 hover:bg-white-12">
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
        <div className="flex flex-1 flex-col lg:w-auto lg:items-end">
          <div className="relative hidden lg:block">
            <Image
              src="/assets/faqs.png"
              alt="FAQ Background"
              height={360}
              width={540}
              className="relative right-[-80px] top-[-10px] w-[540px] max-w-[540px]"
              sizes="540px"
            />
          </div>

          <div className="mt-14 flex flex-1 flex-col gap-6 rounded-28 border border-white-8 bg-white-4 p-6 pt-5 lg:mt-10 lg:max-w-[320px]">
            <div className="flex flex-col gap-[6px]">
              <p className="font-lora text-24 font-400 text-white-95">
                {t('faqs.still_have_questions.translation')}
              </p>
              <p className="text-16 font-300 text-white-80">
                {t('faqs.reach_out.translation')}
              </p>
            </div>
            <div className="flex gap-3">
              <ButtonLink
                href="mailto:support@keycard.tech"
                variant="secondary"
              >
                {t('faqs.get_in_touch.translation')}
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
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                (f as { answerText?: string }).answerText ||
                (f.answer as string),
            },
          })),
        }}
      />
    </section>
  )
}

export { Faqs }
