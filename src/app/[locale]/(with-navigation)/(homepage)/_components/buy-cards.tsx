'use client'

import { KEYCARD_PRODUCTS } from '~/app/_constants/shopify/products'
import { formatPrice } from '~/app/_utils/format-price'
import { getShopifyUrl } from '~/config/routes'
import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import { BuyShellDialog } from '~components/buy-shell-dialog'
import { Image } from '~components/image'
import { cx } from 'cva'
import { useLocale, useTranslations } from 'next-intl'

type Props = {
  image: string
  imageClassName?: string
  name: string
  secondName?: string
  title: React.ReactNode
  description: string
  buttons: React.ReactNode
  info: string
}

const Section = (props: Props) => {
  const {
    image,
    name,
    title,
    description,
    buttons,
    info,
    imageClassName,
    secondName,
  } = props
  return (
    <div className="relative w-full overflow-clip">
      <div className="absolute inset-0 z-10 h-1/2 w-full bg-gradient-to-b from-dark-100 to-[transparent]" />
      <Image
        src={image}
        alt={name}
        width={900}
        height={600}
        draggable={false}
        className={cx([
          'pointer-events-none absolute left-1/2 z-20 max-w-[549px] -translate-x-1/2 select-none lg:top-6',
          imageClassName,
        ])}
      />
      <div className="flex size-full flex-col items-center justify-end rounded-28 border border-white-8 bg-white-4 px-5 pb-20 pt-[300px] lg:px-10 lg:pb-[120px] xl:px-[98px]">
        <div className="container relative z-10 flex max-w-[434px] flex-col items-center justify-center px-2">
          <p className="pb-2 text-24 font-600 text-white-95">
            {name} <span className="font-200">{secondName}</span>
          </p>
          <h2 className="pb-4 text-center font-lora text-32 font-400 lg:text-48">
            {title}
          </h2>
          <p className="pb-8 text-center text-20 font-300 text-white-80">
            {description}
          </p>
          <div className="flex space-x-4">{buttons}</div>
          <p className="pt-6 text-16 font-300 text-white-60">{info}</p>
        </div>
      </div>
    </div>
  )
}

const BuyCards = () => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section className="grid grid-cols-1 gap-10 overflow-clip pb-2 pt-[160px] full-view-port lg:grid-cols-2 lg:flex-row lg:gap-2 lg:pt-[200px] lg:remove-full-view-port">
      <Section
        image="/assets/bottom-keycard.png"
        name="keycard"
        title={
          <>
            {t('buy_cards.keycard_title.translation')
              .split('\n')
              .map((line, index) => (
                <span key={index}>
                  {line}
                  {index === 0 && <br />}
                </span>
              ))}
          </>
        }
        description={t('buy_cards.keycard_description.translation')}
        buttons={
          <>
            <BuyKeycardDialog>
              <Button
                variant="primary"
                data-umami-event="buy-keycard"
                data-umami-event-page="homepage"
                data-umami-event-section="cards"
                data-umami-event-element="button"
              >
                {t('common.buy_keycard.translation')}
              </Button>
            </BuyKeycardDialog>
            <ButtonLink
              href={getShopifyUrl(locale, '/pages/keycard')}
              variant="secondary"
            >
              {t('common.learn_more.translation')}
            </ButtonLink>
          </>
        }
        info={`${t('common.from.translation')} ${formatPrice({
          amount: KEYCARD_PRODUCTS.ONE_CARD_SET.price,
        })}`}
      />
      <Section
        image="/assets/bottom-keycard-shell.png"
        imageClassName="pt-10 lg:pt-0 lg:-mb-20 lg:w-full"
        name="keycard"
        secondName="shell"
        title={
          <>
            {t('buy_cards.shell_title.translation')
              .split('\n')
              .map((line, index) => (
                <span key={index}>
                  {line}
                  {index === 0 && <br />}
                </span>
              ))}
          </>
        }
        description={t('buy_cards.shell_description.translation')}
        buttons={
          <>
            <BuyShellDialog>
              <Button
                data-umami-event="buy-shell"
                data-umami-event-page="homepage"
                data-umami-event-section="cards"
                data-umami-event-element="button"
              >
                {t('common.pre_order.translation')}
              </Button>
            </BuyShellDialog>
            <ButtonLink
              href={getShopifyUrl(locale, '/pages/keycard-shell')}
              variant="secondary"
            >
              {t('common.learn_more.translation')}
            </ButtonLink>
          </>
        }
        info={t('buy_cards.shell_info.translation')}
      />
    </section>
  )
}

export { BuyCards }
