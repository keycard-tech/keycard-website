'use client'

import { Button } from '~components/button'
import Image from 'next/image'
import { useState } from 'react'
import * as Dialog from '../../_components/dialog'

export const ThankYouDialog = () => {
  const [open, setOpen] = useState(false)

  // TODO - Check on load for some parameter in the URL from shopify in order to open the dialog
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content>
        <Dialog.Description className="sr-only">Thank you</Dialog.Description>
        <div className="flex max-w-[568px] flex-col items-center justify-center place-self-center text-center">
          <div className="size-[244px] rounded-full border border-white-100" />
          <h2 className="pt-14 font-lora text-32 text-white-95">
            Thanks for choosing Keycard!
          </h2>
          <p className="max-w-[520px] pt-3 text-20 font-300 text-white-60">
            You have successfully purchased a Keycard set. It will arrive
            shortly!
          </p>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            className="mt-8"
          >
            Continue exploring
          </Button>
          <div className="mt-[120px] flex w-full items-center rounded-[20px] border-white-12 bg-white-8 backdrop-blur-[20px]">
            <div className="mr-4 shrink-0 p-1">
              <Image
                src="/assets/buy/3-card.png"
                alt="Three Keycards"
                width={64}
                height={64}
                className="size-16 rounded-16"
              />
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <h3 className="font-lora text-20">Want to up your game?</h3>
              <p className="text-16 font-300 text-white-80">
                Keycard Pro is coming 2025
              </p>
            </div>
            {/* TODO trigger get dialog when available */}
            <Button variant="primary" className="ml-auto mr-4">
              Get Notified
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
