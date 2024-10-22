'use client'

import { useState } from 'react'

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
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="z-20 w-full px-6 py-16">
      <h2 className="mb-12 text-center text-48 font-500">
        Something about faqs
      </h2>
      <div className="mx-auto max-w-3xl">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              className="flex w-full items-center justify-between rounded-12 bg-white-6 p-4"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-16 font-500">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="size-6" />
              ) : (
                <ChevronDown className="size-6" />
              )}
            </button>
            {openIndex === index && (
              <div className="mt-1 rounded-b-12 bg-white-3 p-4">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

type Props = {
  className?: string
}

const ChevronDown = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const ChevronUp = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
)
