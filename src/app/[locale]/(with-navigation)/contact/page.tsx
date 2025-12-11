import { Metadata } from '~/app/_metadata'
import { Link } from '~components/link'
import { getLocale, getTranslations } from 'next-intl/server'

export const metadata = Metadata({
  title: 'Contact Keycard',
  description:
    'Reach product support or partnerships/BD. We reply within 1 business day.',
  openGraph: { url: '/contact' },
})

export default async function ContactPage() {
  const t = await getTranslations()
  const locale = await getLocale()
  return (
    <div className="px-3 pb-[120px] pt-12 md:px-8 lg:px-20 lg:pt-20">
      <header className="mb-8 grid gap-3">
        <h1 className="font-lora text-32 font-500 text-white-95 xl:text-48">
          {t('contact.title.translation')}
        </h1>
        <p className="text-white-90 md:text-20">
          {t('contact.subtitle.translation')}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="bg-dark-80 rounded-20 border border-white-10 p-6">
          <h2 className="mb-1 font-500 text-white-95">
            {t('contact.product_support.title.translation')}
          </h2>
          <p className="text-white-90">
            {t('contact.product_support.description.translation')}
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

        <div className="bg-dark-80 rounded-20 border border-white-10 p-6">
          <h2 className="mb-1 font-500 text-white-95">
            {t('contact.partnerships.title.translation')}
          </h2>
          <p className="text-white-90">
            {t('contact.partnerships.description.translation')}
          </p>
          <a
            className="mt-3 inline-block underline"
            href="mailto:get@keycard.tech"
          >
            get@keycard.tech
          </a>
        </div>

        <div className="bg-dark-80 rounded-20 border border-white-10 p-6">
          <h2 className="mb-1 font-500 text-white-95">
            {t('contact.orders.title.translation')}
          </h2>
          <p className="text-white-90">
            {t('contact.orders.description.translation')}
          </p>
          <a
            className="mt-3 inline-block underline"
            href={`https://get.keycard.tech/${locale}/pages/support`}
          >
            {t('contact.orders.help_link.translation')}
          </a>
        </div>

        <div className="bg-dark-80 rounded-20 border border-white-10 p-6">
          <h2 className="mb-1 font-500 text-white-95">
            {t('contact.get_involved.title.translation')}
          </h2>
          <p className="text-white-90">
            {t('contact.get_involved.description.translation')}
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <Link className="underline" href="/docs/overview">
              {t('contact.get_involved.docs_link.translation')}
            </Link>
            <Link className="underline" href="/blog">
              {t('contact.get_involved.blog_link.translation')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
