'use client'

import { getShopifyUrl } from '~/config/routes'
import { ButtonLink } from '~components/button-link'
import { Image } from '~components/image'
import { JsonLd } from '~components/json-ld'
import { motion, useReducedMotion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'

const KeycardShell = () => {
  const t = useTranslations()
  const locale = useLocale()
  const shellUrl = getShopifyUrl(locale, '/pages/keycard-shell')
  const learnMoreLabel = t('common.learn_more.translation')
  const shellLearnMoreLabel = `${learnMoreLabel} ${t(
    'navigation.keycard_shell.translation',
  )}`
  const reduceMotion = useReducedMotion()
  const floatAnimation = reduceMotion ? { y: 0 } : { y: [0, -8, 0] }
  return (
    <section className="relative flex flex-col overflow-hidden rounded-t-28 border border-white-8 bg-white-4 backdrop-blur-[20px] full-view-port lg:h-auto lg:flex-row-reverse lg:items-center lg:justify-normal lg:py-10 lg:remove-full-view-port">
      <motion.div
        className="hidden flex-1 items-center justify-center overflow-hidden lg:flex"
        animate={floatAnimation}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/assets/keycard-shell.webp"
          alt="Keycard Shell Hardware Wallet"
          width="510"
          height="758"
          className="max-h-[510px] w-auto object-contain lg:translate-y-1 xl:translate-y-2"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute inset-y-0 left-[60%] h-full max-h-full -translate-x-1/2 lg:hidden"
        animate={floatAnimation}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/assets/keycard-shell.webp"
          alt="Keycard Shell Hardware Wallet"
          width="510"
          height="785"
          className="size-full object-contain"
          priority
          sizes="(max-width:1023px) 85vw"
        />
      </motion.div>

      <div className="relative z-10 flex max-w-[434px] flex-col px-5 py-6 lg:ml-[72px] lg:p-0">
        <p className="pb-2 text-24 font-600 text-white-95">
          {t('hero.keycard_shell_title.translation')}
        </p>
        <h1 className="pb-8 font-lora text-32 font-400 lg:pb-4 lg:text-48">
          {t('hero.keycard_shell_subtitle.translation')
            .split('\n')
            .map((line, index) => (
              <span key={index}>
                {line}
                {index === 0 && <br />}
              </span>
            ))}
        </h1>
        <h2 className="pb-8 text-20 font-300 text-white-80">
          {t('hero.keycard_shell_description.translation')}
        </h2>
        <div className="flex gap-4">
          <ButtonLink
            href={shellUrl}
            target="_self"
            aria-label={shellLearnMoreLabel}
          >
            {t('hero.discover_shell.translation')}
          </ButtonLink>
        </div>
        <p className="flex items-center gap-2 pt-6 text-16 font-300 text-white-60">
          {t('common.coming_2025.translation')}{' '}
          <span className="size-1 rounded-full bg-white-40" />{' '}
          {t('common.bundled_with_keycard.translation')}
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
          image: ['https://docs.keycard.tech/assets/keycard-shell.webp'],
          sku: 'SHELL-001',
          offers: {
            '@type': 'Offer',
            url: shellUrl,
            availability: 'https://schema.org/InStock',
            priceCurrency: 'EUR',
            price: '109',
          },
        }}
      />
    </section>
  )
}

export { KeycardShell }
