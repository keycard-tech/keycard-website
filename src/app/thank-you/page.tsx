import { Background } from '~components/3d/background'
import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import { BuyShellDialog } from '~components/buy-shell-dialog'
import { Link } from '~components/link'
import { Logo } from '~components/logo'
import { cx } from 'cva'
import Image from 'next/image'
import { match } from 'ts-pattern'
import { CheckoutUrlLink } from './_components/checkout-url-link'

type Product = 'keycard' | 'shell'

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

const productConfig = {
  keycard: {
    title: 'Thanks for choosing Keycard!',
    description: 'You will be redirected to the checkout experience.',
    buttonText: 'Take me home',
    promptText: 'Want to up your game?',
    promptDescription: 'Keycard Shell is coming in 2025',
    promptImage: '/assets/pre-order-shell.png',
    promptImageAlt: 'Pre-order Shell',
    promptButtonText: 'Pre-order',
    dialog: BuyShellDialog,
  },
  shell: {
    title: 'Thanks for choosing Keycard!',
    description: 'You will be redirected to complete your pre-order.',
    buttonText: 'Continue exploring',
    promptText: "Don't want to wait?",
    promptDescription: 'Get started with Keycard today',
    promptImage: '/assets/sign-up-teaser.png',
    promptImageAlt: 'Buy Keycard',
    promptButtonText: 'Buy Keycard',
    dialog: BuyKeycardDialog,
  },
}

export default async function ThankyouPage(props: Props) {
  const searchParams = await props.searchParams

  const product = match(searchParams['product'])
    .with('keycard', 'shell', p => p as Product)
    .otherwise(() => 'keycard' as Product)

  const config = productConfig[product]

  return (
    <div className="relative flex min-h-[calc(100svh-16px)] flex-col justify-center">
      <Link
        href="/"
        aria-label="Homepage"
        className="fixed left-5 top-5 z-40 lg:left-8 lg:top-6"
      >
        <Logo />
      </Link>

      <div className="z-20 flex flex-col items-center justify-center">
        {product === 'shell' && (
          <Image
            alt="Thank you"
            src="/assets/thank-you-shell.png"
            width="549"
            height="549"
            priority
            className="z-10 -my-14 min-w-[459px] lg:mt-0 lg:min-w-[549px]"
          />
        )}
        <div className="z-10 flex w-fit self-center">
          <div className="relative px-5">
            <div className="z-10 flex select-none flex-col items-center">
              <h3 className="mb-3 text-center font-lora text-32 text-white-95">
                {config.title}
              </h3>

              <p className="max-w-[490px] pb-8 text-center text-20 font-300 text-white-80">
                {config.description}
                <br />
                If not, please <CheckoutUrlLink />
              </p>
              <ButtonLink variant="secondary" href="/">
                {config.buttonText}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {product === 'shell' ? (
        <div>
          <div className="absolute top-0 z-10 h-full bg-dark-60 full-view-port" />
          <div
            style={{
              backgroundImage: `url('/assets/bg-shell-blurred.png')`,
            }}
            className="absolute inset-0 z-0 bg-cover bg-center full-view-port"
          />
        </div>
      ) : (
        <Background variant="thank-you" />
      )}

      <div
        className={cx(
          'absolute bottom-0 left-1/2 z-40 flex -translate-x-1/2 flex-col items-start justify-between gap-2 bg-white-8 p-1 backdrop-blur-[20px] md:bottom-10',
          'rounded-16 border border-white-12 md:rounded-20',
          'mx-auto w-full md:w-[570px] md:flex-row md:items-center md:gap-4 md:py-1 md:pl-1 md:pr-4',
        )}
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex size-16 items-center justify-center rounded-16 bg-dark-100">
            <Image
              src={config.promptImage}
              alt={config.promptImageAlt}
              width={48}
              height={48}
            />
          </div>
          <div className="flex flex-1 flex-col gap-0.5 md:py-2">
            <div className="font-lora text-20 text-white-95">
              {config.promptText}
            </div>
            <div className="text-16 font-300 text-white-80">
              {config.promptDescription}
            </div>
          </div>
        </div>

        <config.dialog>
          <Button className="w-full justify-center md:w-fit md:justify-start">
            {config.promptButtonText}
          </Button>
        </config.dialog>
      </div>
    </div>
  )
}
