'use client'

import { GetNotifiedDialog } from '~components/get-notified-dialog'
import { useState } from 'react'
import * as Dialog from '../../_components/dialog'

export const ThankYouDialog = () => {
  const [open, setOpen] = useState(false)

  // TODO - Check on load for some parameter in the URL from shopify in order to open the dialog
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content>
        <Dialog.Success
          title="Thanks for choosing Keycard!"
          description="You have successfully purchased a Keycard set. It will arrive shortly!"
          image="/assets/sign-up-success.png"
          onClose={() => setOpen(false)}
          footer={{
            title: 'Want to up your game?',
            description: 'Keycard Shell is coming 2025',
            Dialog: GetNotifiedDialog,
            buttonText: 'Get notified',
          }}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}
