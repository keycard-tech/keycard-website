import * as BaseDialog from '@radix-ui/react-dialog'
import { cx } from 'cva'
import Image from 'next/image'
import { forwardRef } from 'react'
import { Button } from './button'

const Root = BaseDialog.Root

const Trigger = BaseDialog.Trigger

const Portal = BaseDialog.Portal

const Title = BaseDialog.Title

const Description = BaseDialog.Description

const Close = BaseDialog.Close

const Overlay = forwardRef<
  React.ElementRef<typeof BaseDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Overlay>
>(({ className, ...props }, ref) => (
  <BaseDialog.Overlay
    className={cx('fixed inset-0 z-50 bg-dark-60 backdrop-blur-2xl', className)}
    {...props}
    ref={ref}
  />
))

Overlay.displayName = BaseDialog.Overlay.displayName

const Content = forwardRef<
  React.ElementRef<typeof BaseDialog.Content>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <Portal>
      <Overlay />
      <BaseDialog.Content ref={ref} className={cx([className])} {...props}>
        {children}
      </BaseDialog.Content>
    </Portal>
  )
})

Content.displayName = BaseDialog.Content.displayName

type Props = {
  title: string
  description: string
  image: string
  onClose: () => void
  footer: {
    title: string
    description: string
    Dialog: React.FC<{ children: React.ReactElement }>
    buttonText: string
  }
}

const Success = (props: Props) => {
  const { title, description, image, footer, onClose } = props

  return (
    <>
      <div
        className={cx(
          'fixed inset-0 top-1/2 z-50 -mt-6 h-[623px] -translate-y-1/2 overflow-y-auto overflow-x-clip focus:outline-none',
          'md:left-1/2 md:mt-0 md:w-[570px] md:-translate-x-1/2',
        )}
      >
        <div className="relative grid place-items-center px-5">
          <Image
            src={image}
            alt={title}
            width={549}
            height={623}
            className="absolute left-1/2 top-0 z-0 max-w-fit -translate-x-1/2 md:max-w-full"
          />
          <div className="z-10 flex flex-col items-center pt-72">
            <Title asChild>
              <h3 className="mb-3 text-center font-lora text-32 text-white-95">
                {title}
              </h3>
            </Title>
            <p className="max-w-[490px] pb-8 text-center text-20 font-300 text-white-80">
              {description}
            </p>
            <Button variant="secondary" onClick={onClose}>
              Continue exploring
            </Button>
          </div>
        </div>
      </div>
      <Footer {...footer} />
    </>
  )
}

type FooterProps = Props['footer']

const Footer = (props: FooterProps) => {
  const { title, description, Dialog, buttonText } = props

  return (
    <div
      className={cx(
        'fixed inset-x-5 bottom-4 z-50 flex flex-col items-start justify-between gap-2 bg-white-8 p-1',
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
        />
        <div className="flex flex-1 flex-col gap-0.5">
          <div className="font-lora text-20 text-white-95">{title}</div>
          <div className="text-16 font-300 text-white-80">{description}</div>
        </div>
      </div>

      <Dialog>
        <Button
          variant="primary"
          className="w-full justify-center md:w-fit md:justify-start"
        >
          {buttonText}
        </Button>
      </Dialog>
    </div>
  )
}

export { Content, Close, Description, Root, Title, Trigger, Success, Footer }
