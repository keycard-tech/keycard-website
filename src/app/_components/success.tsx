import { cx } from 'cva'
import Image from 'next/image'
import { match } from 'ts-pattern'
import { Button } from './button'
import { BuyKeycardDialog } from './buy-keycard-dialog'
import * as Dialog from './dialog'
import { GetNotifiedDialog } from './get-notified-dialog'

type Props = {
  variant: 'get-notified' | 'buy-keycard'
  onClose: () => void
}

const Success = (props: Props) => {
  const { onClose, variant } = props

  return (
    <>
      <div
        className={cx(
          'fixed inset-0 top-1/2 z-[70] -mt-6 h-[623px] -translate-y-1/2 overflow-y-auto focus:outline-none',
          'md:left-1/2 md:mt-0 md:w-[570px] md:-translate-x-1/2',
        )}
      >
        <div className="relative grid place-items-center px-5">
          <Image
            src={match(variant)
              .with('get-notified', () => '/assets/sign-up-success.png')
              .with('buy-keycard', () => '/assets/sign-up-success.png')
              .exhaustive()}
            alt={match(variant)
              .with('get-notified', () => 'Sign up teaser')
              .with('buy-keycard', () => 'Thank you')
              .exhaustive()}
            width={549}
            height={623}
            className="absolute left-1/2 top-0 z-0 max-w-max -translate-x-1/2 md:max-w-full"
          />
          <div className="z-10 flex flex-col items-center pt-72">
            <Dialog.Title asChild>
              <h3 className="mb-3 font-lora text-32 text-white-95">
                {match(variant)
                  .with('get-notified', () => "We'll notify you!")
                  .with('buy-keycard', () => 'Thanks for choosing Keycard!')
                  .exhaustive()}
              </h3>
            </Dialog.Title>
            <p className="mb-10 max-w-[490px] text-center text-20 font-300 text-white-80">
              {match(variant)
                .with(
                  'get-notified',
                  () =>
                    'You have successfully signed up to be notified when Keycard Pro becomes available to buy next year.',
                )
                .with(
                  'buy-keycard',
                  () =>
                    '  You have successfully purchased a Keycard set. It will arrive shortly!',
                )
                .exhaustive()}
            </p>
            <Button variant="secondary" onClick={onClose}>
              Continue exploring
            </Button>
          </div>
        </div>
      </div>
      <Footer variant={variant} />
    </>
  )
}

export { Success }

type FooterProps = {
  variant: 'get-notified' | 'buy-keycard'
}

const Footer = (props: FooterProps) => {
  const { variant } = props

  return (
    <div
      className={cx(
        'fixed inset-x-5 bottom-4 z-[70] flex flex-col items-start justify-between gap-2 bg-white-8 p-1',
        'rounded-20 border border-white-12',
        'md:bottom-12 md:left-1/2 md:w-[570px] md:-translate-x-1/2 md:flex-row md:items-center md:gap-4 md:pr-4',
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/assets/sign-up-teaser.png"
          alt="Sign up teaser"
          width={64}
          height={64}
          className=""
        />
        <div className="flex flex-1 flex-col gap-0.5">
          <div className="font-lora text-20 text-white-95">
            {match(variant)
              .with('get-notified', () => "Don't want to wait?")
              .with('buy-keycard', () => 'Want to up your game?')
              .exhaustive()}
          </div>
          <div className="text-16 font-300 text-white-80">
            {match(variant)
              .with('get-notified', () => 'Get started with Keycard')
              .with('buy-keycard', () => 'Keycard Pro is coming 2025')
              .exhaustive()}
          </div>
        </div>
      </div>
      {match(variant)
        .with('get-notified', () => (
          <BuyKeycardDialog>
            <Button
              variant="primary"
              className="w-full justify-center md:w-fit md:justify-start"
            >
              Buy Keycard
            </Button>
          </BuyKeycardDialog>
        ))
        .with('buy-keycard', () => (
          <GetNotifiedDialog>
            <Button
              variant="primary"
              className="w-full justify-center md:w-fit md:justify-start"
            >
              Get notified
            </Button>
          </GetNotifiedDialog>
        ))
        .exhaustive()}
    </div>
  )
}
