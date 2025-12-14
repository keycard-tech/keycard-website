'use client'

import {
  CloseIcon,
  InfoIcon,
  KeycardCardIcon,
  LabelsIcon,
  LoadingIcon,
  WorldIcon,
} from '@status-im/icons/20'
import { Image } from '~components/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { KEYCARD_SHELL } from '../_constants/shopify/products'
import { useCart } from '../_providers/cart-provider'
import { formatPrice } from '../_utils/format-price'
import { Button } from './button'
import * as Dialog from './dialog'
import { Tooltip } from './tooltip'

type Props = {
  children?: React.ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const BuyShellDialog = (props: Props) => {
  const { children, ...rest } = props

  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} {...rest}>
      {children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}
      <Dialog.Content
        onOpenAutoFocus={event => {
          event.preventDefault()

          const element = event.target as HTMLElement
          element.focus()
        }}
        className="fixed left-1/2 top-1/2 z-50 max-h-screen w-screen max-w-[1136px] -translate-x-1/2 -translate-y-1/2 overflow-auto focus:outline-none data-[state=open]:animate-contentShow lg:w-[90vw] lg:overflow-hidden"
      >
        <Dialog.Description className="sr-only">
          Pre-order Shell
        </Dialog.Description>
        <Content onClose={() => setOpen(false)} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { BuyShellDialog }

const Content = ({ onClose }: { onClose?: () => void }) => {
  const { addItem } = useCart()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddToCart = async () => {
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const merchandiseId = `gid://shopify/ProductVariant/${KEYCARD_SHELL.variantId}`
      await addItem(merchandiseId, 1)
      onClose?.()
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Unable to update cart',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid h-svh grid-cols-1 gap-6 overflow-auto bg-white-4 p-5 backdrop-blur-[20px] lg:h-auto lg:grid-cols-2 lg:overflow-clip lg:rounded-28 lg:border lg:border-white-12 lg:p-2">
      <div className="relative hidden rounded-20 bg-[#010101] lg:block lg:max-h-[70vh] lg:p-4">
        <AnimatePresence>
          <motion.div
            key="pre-order-shell"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-full items-center justify-center overflow-hidden"
          >
            <Image
              src="/assets/keycard-shell.gif"
              alt="Pre-order Shell (animated)"
              className="h-auto max-h-[48vh] w-full max-w-[336px] object-contain lg:max-w-[448px]"
              width={1052}
              height={768}
              unoptimized
              priority
              sizes="(min-width:1024px) 448px, 90vw"
            />
          </motion.div>
        </AnimatePresence>
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-12 font-300 text-white-60">
          Final product may vary from promotional images
        </p>
      </div>

      <div className="flex flex-col justify-start lg:p-4 lg:pl-0">
        <div className="flex justify-between lg:items-center">
          <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center">
            <Dialog.Title className="font-lora text-32">
              Pre-order Shell
            </Dialog.Title>
            <div className="rounded-16 border border-dashed border-[#FF640020] bg-[#FF640010] px-[14px] py-[7px] text-14 text-orange">
              Limited time offer
            </div>
          </div>
          <Dialog.Close asChild>
            <Button
              variant="secondary"
              className="size-10 px-[9px] text-white-95"
              aria-label="Close"
            >
              <CloseIcon className="size-5" />
            </Button>
          </Dialog.Close>
        </div>

        <div className="pt-5 lg:pt-10">
          <div className="rounded-16 bg-white-4 px-4 py-3">
            <p className="pb-0.5 font-300 text-white-60">
              Pre-order exclusive price 🔥
            </p>
            <div className="flex items-center gap-2 font-lora">
              <p className="text-24 text-green">
                {formatPrice({
                  amount: 99,
                })}
              </p>
              <p className="font-lora text-24 text-white-95 line-through">
                {formatPrice({
                  amount: 149,
                })}
              </p>
            </div>
            <div className="flex items-center gap-[6px] pt-4 font-300">
              <KeycardCardIcon className="text-white-60" /> Includes 2 Keycards
            </div>
          </div>
        </div>

        <div className="py-8">
          <h3 className="mb-2 text-12 uppercase text-white-80">
            Exclusive Pre-order benefits
          </h3>
          <div className="flex items-center justify-between rounded-16 bg-white-4 px-4 py-3">
            <div className="relative flex items-center justify-start">
              <div className="flex flex-col gap-0.5 font-300 text-white-95">
                <div className="flex items-center gap-1">
                  <div className="mr-0.5 size-1 rounded-full bg-white-60" />{' '}
                  Status Network Karma
                  <Tooltip
                    label={
                      <div className="flex flex-col gap-3 font-400">
                        <p>
                          Each Keycard Shell pre-sale customer will receive a
                          Karma token airdrop on Status Network.
                        </p>
                        <p>
                          Status Network is the L2 of the Status ecosystem
                          launching later this year, and Karma plays a major
                          role in its operation and governance.
                        </p>
                        <p>
                          You&apos;ll receive further instructions on when and
                          how to receive Karma via the email you used for your
                          Shell purchase.
                        </p>
                      </div>
                    }
                  >
                    <div className="flex">
                      <InfoIcon className="flex-shrink-0 text-white-40 transition-colors hover:text-white-60" />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-16 border border-white-12 bg-white-4 p-1">
          {submitError && (
            <div className="mb-2 rounded-12 border border-[rgba(255,80,80,0.3)] bg-[rgba(255,80,80,0.1)] px-3 py-2 text-13 text-red">
              {submitError}
            </div>
          )}
          <Button
            type="button"
            className="w-full justify-center gap-2 font-500"
            data-umami-event="checkout-shell"
            data-umami-event-page="buy-shell-dialog"
            data-umami-event-section="checkout"
            data-umami-event-element="button"
            onClick={handleAddToCart}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoadingIcon className="my-px animate-spin text-white-100" />
            ) : (
              <>
                Add to cart <div className="size-1 rounded-full bg-white-40" />
                {formatPrice({
                  amount: 99,
                })}
              </>
            )}
          </Button>
        </div>

        <div className="pb-1 pt-5 lg:pb-0">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/buy/visa.png"
              alt="Visa"
              width={52}
              height={32}
            />
            <Image
              src="/assets/buy/mastercard.png"
              alt="Mastercard"
              width={52}
              height={32}
            />
            <Image
              src="/assets/buy/amex.png"
              alt="American Express"
              width={52}
              height={32}
            />
          </div>
          <div className="mt-10 flex flex-col items-center gap-[10px] rounded-16 border border-dashed border-white-12 bg-white-4 px-4 py-[14px] text-14 text-white-60 lg:flex-row lg:justify-center lg:gap-2">
            <div className="flex items-center">
              <LabelsIcon className="mr-1 shrink-0 text-white-95" /> Price
              doesn&apos;t include VAT
            </div>
            <div className="hidden size-1 rounded-full bg-white-40 lg:block" />

            <div className="flex items-center">
              <WorldIcon className="mr-1 shrink-0 text-white-95" />
              Shipping Q4 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
