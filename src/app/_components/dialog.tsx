import * as BaseDialog from '@radix-ui/react-dialog'
import { cx } from 'cva'
import { forwardRef } from 'react'

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
    className={cx(
      'fixed inset-0 z-[70] bg-dark-60 backdrop-blur-2xl',
      className,
    )}
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

export { Content, Close, Description, Root, Title, Trigger }
