import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { GetNotifiedDialog } from '~components/get-notified-dialog'
import { Image } from '~components/image'
import { Link } from '~components/link'
import { Logo } from '~components/logo'
import { cx } from 'cva'
import { Background } from './_components/background'

export default async function ThankyouPage() {
  return (
    <div
      className={cx(
        'relative flex min-h-[calc(100svh-16px)] flex-col justify-center overflow-clip',
      )}
    >
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
              You have successfully purchased a Keycard set. It will arrive
              shortly!
            </p>
            <ButtonLink variant="secondary" href="/">
              Continue exploring
            </ButtonLink>
          </div>
        </div>
      </div>

      <Background />

      <div
        className={cx(
          'absolute bottom-0 left-1/2 z-40 flex -translate-x-1/2 flex-col items-start justify-between gap-2 bg-white-8 p-1 backdrop-blur-[20px] md:bottom-10',
          'rounded-16 border border-white-12 md:rounded-20',
          'mx-auto w-full md:w-[570px] md:flex-row md:items-center md:gap-4 md:pr-4',
        )}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/assets/thank-you.png"
            alt="Thank you"
            width={64}
            height={64}
          />
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="font-lora text-20 text-white-95">
              Want to up your game?
            </div>
            <div className="text-16 font-300 text-white-80">
              Keycard Shell is coming 2025
            </div>
          </div>
        </div>

        <GetNotifiedDialog>
          <Button
            variant="primary"
            className="w-full justify-center md:w-fit md:justify-start"
          >
            Get notified
          </Button>
        </GetNotifiedDialog>
      </div>
    </div>
  )
}
