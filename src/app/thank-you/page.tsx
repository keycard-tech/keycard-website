import { Background } from '~components/3d/background'
import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { Link } from '~components/link'
import { Logo } from '~components/logo'
import { PreOrderDialog } from '~components/pre-order-dialog'
import { cx } from 'cva'
import Image from 'next/image'
import { CheckoutUrlLink } from './_components/checkout-url-link'

export default function ThankyouPage() {
  return (
    <div className="relative flex min-h-[calc(100svh-16px)] flex-col justify-center overflow-clip">
      <Link
        href="/"
        aria-label="Homepage"
        className="fixed left-5 top-5 z-40 lg:left-8 lg:top-6"
      >
        <Logo />
      </Link>

      <div className="z-10 flex w-fit self-center">
        <div className="relative px-5">
          <div className="z-10 flex select-none flex-col items-center">
            <h3 className="mb-3 text-center font-lora text-32 text-white-95">
              Thanks for choosing Keycard!
            </h3>

            <p className="max-w-[490px] pb-8 text-center text-20 font-300 text-white-80">
              You will be redirected to the checkout experience.
              <br />
              If not, please <CheckoutUrlLink />.
            </p>
            <ButtonLink variant="secondary" href="/">
              Take me home
            </ButtonLink>
          </div>
        </div>
      </div>

      <Background variant="thank-you" />

      <div
        className={cx(
          'absolute bottom-0 left-1/2 z-40 flex -translate-x-1/2 flex-col items-start justify-between gap-2 bg-white-8 p-1 pt-3 backdrop-blur-[20px] md:bottom-10',
          'rounded-16 border border-white-12 md:rounded-20',
          'mx-auto w-full md:w-[570px] md:flex-row md:items-center md:gap-4 md:py-1 md:pl-1 md:pr-4',
        )}
      >
        <div className="flex items-center gap-4 px-4 pb-4 md:px-0 md:pb-0">
          <div className="flex size-16 items-center justify-center rounded-16 bg-dark-100">
            <Image
              src="/assets/pre-order-shell.png"
              alt="Pre-order Shell"
              width={48}
              height={48}
            />
          </div>
          <div className="flex flex-1 flex-col gap-0.5 py-2">
            <div className="font-lora text-20 text-white-95">
              Want to up your game?
            </div>
            <div className="text-16 font-300 text-white-80">
              Keycard Shell is coming in 2025
            </div>
          </div>
        </div>

        <PreOrderDialog>
          <Button className="w-full justify-center md:w-fit md:justify-start">
            Pre-order
          </Button>
        </PreOrderDialog>
      </div>
    </div>
  )
}
