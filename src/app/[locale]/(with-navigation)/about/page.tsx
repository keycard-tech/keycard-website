import { Metadata } from '~/app/_metadata'
import { Link } from '~components/link'
import { getTranslations } from 'next-intl/server'

export const metadata = Metadata({
  title: 'About Keycard',
  description:
    'Open-source signing hardware from the Institute of Free Technology. Keycards are secure-element signers; Keycard Shell is an air-gapped wallet with QR confirmation.',
  openGraph: { url: '/about' },
})

const PRESS: {
  name: string
  href: string
  kind: 'press-release' | 'coverage'
  date?: string
}[] = [
  {
    name: 'Decrypt — “Keycard launches Shell”',
    href: 'https://decrypt.co/315924/keycard-launches-pre-sale-for-shell-the-most-open-modular-hardware-wallet-to-date',
    kind: 'press-release',
    date: '2025-04-23',
  },
  {
    name: 'The Daily Hodl — Keycard Shell pre-sale',
    href: 'https://dailyhodl.com/2025/04/23/keycard-launches-pre-sale-for-shell-the-most-open-modular-hardware-wallet-to-date/',
    kind: 'press-release',
    date: '2025-04-23',
  },
  {
    name: 'Unchained — Keycard Shell pre-sale',
    href: 'https://unchainedcrypto.com/press-release/keycard-launches-pre-sale-for-shell-the-most-open-modular-hardware-wallet-to-date/',
    kind: 'press-release',
    date: '2025-04-23',
  },
]

const CERTS_SECURITY = [
  {
    name: 'EAL6+ secure element (chip-level)',
    href: 'https://keycard.tech/',
    note: 'As stated on keycard.tech',
  },
  {
    name: 'Security & vulnerability disclosure (IFT)',
    href: 'https://free.technology/security',
    note: 'Central security reporting & bounty',
  },
]

const PARTNERS = [
  {
    name: 'Status — Use Keycard with Status',
    href: 'https://status.app/keycard',
  },
  {
    name: 'Institute of Free Technology',
    href: 'https://free.technology/',
  },
  {
    name: 'GitHub — keycard-tech',
    href: 'https://github.com/keycard-tech',
  },
  {
    name: 'Devcon 5 — Keycard workshop',
    href: 'https://archive.devcon.org/devcon-5/keycard-an-open-source-smartcard-hardware-wallet-framework/',
  },
  {
    name: 'Docs',
    href: 'https://keycard.tech/docs',
  },
]

const STANDARDS = [
  {
    name: 'ERC-4527 — QR protocol for offline signers',
    href: 'https://eips.ethereum.org/EIPS/eip-4527',
  },
  {
    name: 'MetaMask on ERC-4527 ecosystem integrations',
    href: 'https://metamask.io/news/going-beyond-the-secret-recovery-phrase-in-metamask-with-account-management',
  },
  {
    name: 'imToken — QR (ERC-4527) hardware wallet connection',
    href: 'https://support.token.im/hc/en-us/articles/25985632007193-imToken-and-Hardware-Wallets-Uncompromised-Protection-Unparalleled-Convenience',
  },
]

export default async function AboutPage() {
  const t = await getTranslations()

  return (
    <div className="px-3 pb-[120px] pt-12 md:px-8 lg:px-20 lg:pt-20">
      {/* Organization JSON-LD for trust signals */}
      <script
        type="application/ld+json"
        // Note: avoid user PII here; this is org-level structured data.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Keycard',
            url: 'https://keycard.tech',
            parentOrganization: {
              '@type': 'Organization',
              name: 'Institute of Free Technology',
              url: 'https://free.technology',
            },
            sameAs: [
              'https://status.app/keycard',
              'https://github.com/keycard-tech',
              'https://x.com/keycard_',
            ],
            contactPoint: [
              {
                '@type': 'ContactPoint',
                contactType: 'partnerships',
                email: 'get@keycard.tech',
              },
            ],
          }),
        }}
      />

      <header className="mb-8 grid gap-3">
        <h1 className="font-lora text-32 font-500 text-white-95 xl:text-48">
          {t('about.title.translation')}
        </h1>
        <p className="text-white-90 md:text-20">
          {t('about.subtitle.translation')}{' '}
          <a className="underline" href="https://free.technology/">
            {t('about.institute_link.translation')}
          </a>
          {t('about.alongside_text.translation')}{' '}
          <a className="underline" href="https://status.app/">
            {t('about.status_link.translation')}
          </a>
          .
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-20 border border-white-10 bg-white-4 p-6">
          <h2 className="mb-2 font-500 text-white-95">
            {t('about.why_hardware.title.translation')}
          </h2>
          <p className="text-white-90">
            {t('about.why_hardware.description.translation')}
          </p>
        </div>
        <div className="rounded-20 border border-white-10 bg-white-4 p-6">
          <h2 className="mb-2 font-500 text-white-95">
            {t('about.what_keycard.title.translation')}
          </h2>
          <p className="text-white-90">
            {t('about.what_keycard.description.translation')}
          </p>
        </div>
        <div className="rounded-20 border border-white-10 bg-white-4 p-6">
          <h2 className="mb-2 font-500 text-white-95">
            {t('about.how_we_work.title.translation')}
          </h2>
          <p className="text-white-90">
            {t('about.how_we_work.description.translation')}
          </p>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-20 border border-white-10 bg-white-4 p-6">
          <h3 className="mb-2 font-500 text-white-95">
            {t('about.principles.title.translation')}
          </h3>
          <ul className="list-disc pl-5 text-white-90">
            <li>{t('about.principles.keys_never_leave.translation')}</li>
            <li>{t('about.principles.minimize_blind_signing.translation')}</li>
            <li>{t('about.principles.open_designs.translation')}</li>
            <li>{t('about.principles.building_open.translation')}</li>
          </ul>
        </div>

        <div className="rounded-20 border border-white-10 bg-white-4 p-6">
          <h3 className="mb-2 font-500 text-white-95">
            {t('about.products.title.translation')}
          </h3>
          <ul className="list-disc pl-5 text-white-90">
            <li>
              <strong>{t('about.products.keycard.name.translation')}</strong> —{' '}
              {t('about.products.keycard.description.translation')}
            </li>
            <li>
              <strong>
                {t('about.products.keycard_shell.name.translation')}
              </strong>{' '}
              — {t('about.products.keycard_shell.description.translation')}
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-20 border border-white-10 bg-white-4 p-6">
          <h3 className="mb-2 font-500 text-white-95">
            {t('about.press.title.translation')}
          </h3>
          <ul className="space-y-2 text-white-90">
            {PRESS.map(item => (
              <li key={item.href}>
                <a
                  className="underline"
                  href={item.href}
                  target="_blank"
                  rel={
                    item.kind === 'press-release'
                      ? 'nofollow sponsored noopener'
                      : 'noopener'
                  }
                >
                  {item.name}
                </a>
                {item.date ? (
                  <span className="text-white-60"> — {item.date}</span>
                ) : null}
                {item.kind === 'press-release' ? (
                  <span className="ml-2 rounded-10 border border-white-20 px-2 py-0.5 text-12 text-white-60">
                    {t('about.press.press_release.translation')}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-12 text-white-60">
            {t('about.press.media_inquiries.translation')}{' '}
            <a className="underline" href="mailto:get@keycard.tech">
              get@keycard.tech
            </a>
          </p>
        </div>

        {/* Certifications & Security */}
        <div className="rounded-20 border border-white-10 bg-white-4 p-6">
          <h3 className="mb-2 font-500 text-white-95">
            {t('about.certifications.title.translation')}
          </h3>
          <ul className="space-y-2 text-white-90">
            {CERTS_SECURITY.map(c => (
              <li key={c.href}>
                <a
                  className="underline"
                  href={c.href}
                  target="_blank"
                  rel="noopener"
                >
                  {c.name}
                </a>
                {c.note ? (
                  <span className="text-white-60"> — {c.note}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        {/* Partners & Ecosystem */}
        <div className="rounded-20 border border-white-10 bg-white-4 p-6">
          <h3 className="mb-2 font-500 text-white-95">
            {t('about.partners.title.translation')}
          </h3>
          <ul className="space-y-2 text-white-90">
            {PARTNERS.map(p => (
              <li key={p.href}>
                <a
                  className="underline"
                  href={p.href}
                  target="_blank"
                  rel="noopener"
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 rounded-12 border border-white-12 bg-white-8 p-3 text-12 text-white-80">
            <p className="mb-1">
              {t('about.partners.erc4527_description.translation')}
            </p>
            <ul className="list-disc pl-5">
              {STANDARDS.map(s => (
                <li key={s.href}>
                  <a
                    className="underline"
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/docs/overview"
          className="rounded-12 border border-white-20 px-4 py-2 text-white-95"
        >
          Read the docs
        </Link>
        <Link
          href="/blog"
          className="rounded-12 border border-white-20 px-4 py-2 text-white-95"
        >
          Visit the blog
        </Link>
        <a
          href="mailto:get@keycard.tech"
          className="rounded-12 bg-white-100 px-4 py-2 text-dark-100"
        >
          Partnerships — get@keycard.tech
        </a>
      </div>
    </div>
  )
}
