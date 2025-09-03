import { Metadata } from '~/app/_metadata'
import Link from 'next/link'

export const metadata = Metadata({
  title: 'Contact Keycard',
  description:
    'Reach product support or partnerships/BD. We reply within 1 business day.',
  openGraph: { url: '/contact' },
})

export default function ContactPage() {
  return (
    <div className="px-3 pb-[120px] pt-12 md:px-8 lg:px-20 lg:pt-20">
      <header className="mb-8 grid gap-3">
        <h1 className="font-lora text-32 font-500 text-white-95 xl:text-48">
          Contact Keycard
        </h1>
        <p className="text-white-90 md:text-20">
          We reply within 1 business day.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="border-white-10 bg-dark-80 rounded-20 border p-6">
          <h2 className="mb-1 font-500 text-white-95">Product support</h2>
          <p className="text-white-90">
            Questions, bugs, feature requests, or security reports.
          </p>

          <div className="mt-3 flex flex-col gap-2">
            <Link className="underline" href="mailto:support@keycard.tech">
              support@keycard.tech
            </Link>
            <Link className="underline" href="https://discord.gg/uJAXk7jFhZ">
              Discord
            </Link>
          </div>
        </div>

        <div className="border-white-10 bg-dark-80 rounded-20 border p-6">
          <h2 className="mb-1 font-500 text-white-95">Partnerships &amp; BD</h2>
          <p className="text-white-90">
            Integrations, distribution, or bulk orders.
          </p>
          <a
            className="mt-3 inline-block underline"
            href="mailto:get@keycard.tech"
          >
            get@keycard.tech
          </a>
        </div>

        <div className="border-white-10 bg-dark-80 rounded-20 border p-6">
          <h2 className="mb-1 font-500 text-white-95">Orders &amp; returns</h2>
          <p className="text-white-90">For Shopify store purchases.</p>
          <a
            className="mt-3 inline-block underline"
            href="https://get.keycard.tech/pages/support"
          >
            Order &amp; Returns Help
          </a>
        </div>

        <div className="border-white-10 bg-dark-80 rounded-20 border p-6">
          <h2 className="mb-1 font-500 text-white-95">Get involved</h2>
          <p className="text-white-90">Guides, APIs, and updates.</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link className="underline" href="/docs/overview">
              Docs: Overview
            </Link>
            <Link className="underline" href="/blog">
              Keycard Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
