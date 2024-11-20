import { Footer } from '~components/footer'
import { NavBar } from '~components/nav-bar'
import { NavBarMobile } from '~components/nav-bar-mobile'

type Props = {
  children: React.ReactNode
}

export default function WithNavigationLayout({ children }: Props) {
  return (
    <div className="overflow-clip">
      <NavBar />
      <NavBarMobile />
      {children}
      <Footer />
    </div>
  )
}
