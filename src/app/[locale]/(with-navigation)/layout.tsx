'use client'

import { BuyShellDialog } from '~components/buy-shell-dialog'
import { Footer } from '~components/footer'
import { NavBar } from '~components/nav-bar'
import { NavBarMobile } from '~components/nav-bar-mobile'
import { useTranslations } from 'next-intl'

type Props = {
  children: React.ReactNode
}

export default function WithNavigationLayout({ children }: Props) {
  const t = useTranslations()

  return (
    <>
      <div className="fixed left-0 top-0 z-30 flex h-[70px] w-full flex-col items-center justify-center bg-orange text-center text-white-100 sm:h-12 sm:flex-row">
        {t('top_banner.pre_sale_started.translation')} &nbsp;
        <div>
          <BuyShellDialog>
            <button
              className="underline"
              data-umami-event="preorder-shell"
              data-umami-event-page="global"
              data-umami-event-section="topbanner"
              data-umami-event-element="button"
            >
              {t('top_banner.pre_order_now.translation')}
            </button>
          </BuyShellDialog>
          &nbsp;{t('top_banner.exclusive_benefits.translation')}
        </div>
      </div>
      <NavBar />
      <NavBarMobile />
      <div className="pt-[70px] sm:pt-12">{children}</div>
      <Footer />
    </>
  )
}
