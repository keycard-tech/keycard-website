import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { BuyShellDialog } from '~components/buy-shell-dialog'
import { Image } from '~components/image'
import { JsonLd } from '~components/json-ld'

const KeycardShell = () => {
  return (
    <section className="relative flex h-[calc(100svh-300px)] flex-col justify-center overflow-hidden rounded-t-28 border border-white-8 bg-white-4 backdrop-blur-[20px] full-view-port lg:h-auto lg:flex-row-reverse lg:items-center lg:justify-normal lg:remove-full-view-port">
      <div className="hidden flex-1 items-center justify-center overflow-hidden lg:flex">
        <Image
          src="/assets/keycard-shell.gif"
          alt="Keycard Shell Hardware Wallet"
          width="864"
          height="1184"
          className="max-h-[510px] w-auto object-contain lg:translate-y-1 xl:translate-y-2"
          priority
        />
      </div>

      <Image
        src="/assets/keycard-shell.gif"
        alt="Keycard Shell Hardware Wallet"
        width="864"
        height="1184"
        className="mt-4 h-auto w-[clamp(300px,85vw,420px)] self-center object-contain lg:hidden"
        priority
        sizes="(max-width:1023px) 85vw"
      />

      <div className="relative z-10 flex max-w-[434px] flex-col px-5 pb-5 lg:ml-[72px] lg:p-0">
        <h1 className="sr-only">
          Keycard Shell - Modular, Air-Gapped Hardware Wallet
        </h1>
        <p className="pb-2 text-24 font-600 text-white-95">
          keycard <span className="font-200">shell</span>
        </p>
        <p className="flex pb-8 font-lora text-32 font-400 lg:pb-4 lg:text-48">
          One secure device,
          <br />
          infinite backups
        </p>
        <p className="pb-8 text-20 font-300 text-white-80">
          Unrivalled security with an infinite number of removable Keycards,
          each with their own key.
        </p>
        <div className="flex gap-4">
          <ButtonLink
            href="https://get.keycard.tech/pages/keycard-shell"
            target="_self"
          >
            Discover Shell
          </ButtonLink>
          <BuyShellDialog>
            <Button
              data-umami-event="preorder-shell"
              data-umami-event-page="homepage"
              data-umami-event-section="hero"
              data-umami-event-element="button"
              variant="secondary"
            >
              Pre-order Now
            </Button>
          </BuyShellDialog>
        </div>
        <p className="flex items-center gap-2 pt-6 text-16 font-300 text-white-60">
          Coming 2025 <span className="size-1 rounded-full bg-white-40" />{' '}
          Bundled with Keycard
        </p>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Keycard Shell',
          brand: { '@type': 'Brand', name: 'Keycard' },
          description:
            'A modular, air-gapped hardware wallet that uses Keycard as the secure element.',
          image: ['https://keycard.tech/assets/keycard-shell.png'],
          sku: 'SHELL-001',
          offers: {
            '@type': 'Offer',
            url: 'https://get.keycard.tech/pages/keycard-shell',
            availability: 'https://schema.org/PreOrder',
            priceCurrency: 'EUR',
            price: '99',
          },
        }}
      />
    </section>
  )
}

export { KeycardShell }
