import { Metadata } from '~/app/_metadata'
import Link from 'next/link'

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

export default function AboutPage() {
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
          About Keycard
        </h1>
        <p className="text-white-90 md:text-20">
          We build sovereign signing tools—open hardware + software that keep
          your keys in dedicated secure elements and let you verify what you
          sign. Keycard is part of the{' '}
          <a className="underline" href="https://free.technology/">
            Institute of Free Technology
          </a>
          , alongside projects like{' '}
          <a className="underline" href="https://status.app/">
            Status
          </a>
          .
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="border-white-10 bg-dark-80 rounded-20 border p-6">
          <h2 className="mb-2 font-500 text-white-95">Why hardware signers</h2>
          <p className="text-white-90">
            Self-custody on general-purpose devices is convenient but exposed.
            Dedicated hardware reduces attack surface and gives focused
            protection.
          </p>
        </div>
        <div className="border-white-10 bg-dark-80 rounded-20 border p-6">
          <h2 className="mb-2 font-500 text-white-95">What Keycard is</h2>
          <p className="text-white-90">
            A contactless smart-card hardware wallet and signer (BIP-32 HD),
            with keys stored and used inside a secure element. Open-source,
            NFC-first. Works with Keycard Shell.
          </p>
        </div>
        <div className="border-white-10 bg-dark-80 rounded-20 border p-6">
          <h2 className="mb-2 font-500 text-white-95">How we work</h2>
          <p className="text-white-90">
            Open by default, verifiable, modular. We ship small, auditable parts
            and improve them in public through docs, forums, and community
            feedback.
          </p>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="border-white-10 bg-dark-80 rounded-20 border p-6">
          <h3 className="mb-2 font-500 text-white-95">Our principles</h3>
          <ul className="list-disc pl-5 text-white-90">
            <li>Keys never leave the secure element.</li>
            <li>Minimize blind signing; show what you sign.</li>
            <li>Prefer open designs and reproducible builds.</li>
            <li>Building in the open. Join our Discord!</li>
          </ul>
        </div>

        <div className="border-white-10 bg-dark-80 rounded-20 border p-6">
          <h3 className="mb-2 font-500 text-white-95">Products</h3>
          <ul className="list-disc pl-5 text-white-90">
            <li>
              <strong>Keycard</strong> — card-sized signer where keys never
              leave the secure element; inexpensive for backups and multi-signer
              setups.
            </li>
            <li>
              <strong>Keycard Shell</strong> — turns any Keycard into a full,
              air-gapped hardware wallet that works with many software wallets
              via QR and lets you confirm what you sign on a display.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="border-white-10 bg-dark-80 rounded-20 border p-6">
          <h3 className="mb-2 font-500 text-white-95">Press & Newsroom</h3>
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
                  <span className="rounded-8 text-white-70 ml-2 border border-white-20 px-2 py-0.5 text-12">
                    Press release
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-12 text-white-60">
            For media inquiries:{' '}
            <a className="underline" href="mailto:get@keycard.tech">
              get@keycard.tech
            </a>
          </p>
        </div>

        {/* Certifications & Security */}
        <div className="border-white-10 bg-dark-80 rounded-20 border p-6">
          <h3 className="mb-2 font-500 text-white-95">
            Certifications & Security
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
        <div className="border-white-10 bg-dark-80 rounded-20 border p-6">
          <h3 className="mb-2 font-500 text-white-95">Partners & Ecosystem</h3>
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
          <div className="border-white-15 bg-dark-70 text-white-70 mt-3 rounded-12 border p-3 text-12">
            <p className="mb-1">
              Works with wallets that support the ERC-4527 QR signing standard
              for air-gapped devices.
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
