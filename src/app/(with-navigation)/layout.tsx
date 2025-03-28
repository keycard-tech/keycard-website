import { Footer } from '~components/footer'
import { NavBar } from '~components/nav-bar'
import { NavBarMobile } from '~components/nav-bar-mobile'
import { PreOrderDialog } from '~components/pre-order-dialog'

type Props = {
  children: React.ReactNode
}

export default function WithNavigationLayout({ children }: Props) {
  return (
    <>
      <div className="fixed left-0 top-0 z-30 flex h-[70px] w-full flex-col items-center justify-center bg-orange text-center text-white-100 sm:h-12 sm:flex-row">
        🎉 Keycard Shell pre-sale has started! &nbsp;
        <div>
          <PreOrderDialog>
            <button className="underline">Pre-order</button>
          </PreOrderDialog>
          &nbsp;now for exclusive benefits! 👀
        </div>
      </div>
      <NavBar />
      <NavBarMobile />
      <div className="pt-[70px] sm:pt-12">{children}</div>
      <Footer />
    </>
  )
}
