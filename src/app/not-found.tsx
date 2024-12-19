import { ButtonLink } from '~components/button-link'
import { Footer } from '~components/footer'
import { NavBar } from '~components/nav-bar'
import { NavBarMobile } from '~components/nav-bar-mobile'

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full justify-center overflow-clip">
      <div className="flex min-h-screen w-full flex-col p-2 pt-0">
        <NavBar />
        <NavBarMobile />
        <div className="flex size-full items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="mb-4 flex flex-col gap-2 py-3 text-center">
              <h2 className="font-lora text-32 font-500">404</h2>
              <p className="mt-4 text-16 xl:text-20">
                The page you were looking for wasn&apos;t found
              </p>
            </div>

            <ButtonLink variant="secondary" href="/">
              Go to keycard.tech homepage
            </ButtonLink>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
