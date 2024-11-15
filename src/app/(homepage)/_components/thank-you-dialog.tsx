'use client'

import { Success } from '~components/success'
import { useState } from 'react'
import * as Dialog from '../../_components/dialog'

export const ThankYouDialog = () => {
  const [open, setOpen] = useState(false)

  // TODO - Check on load for some parameter in the URL from shopify in order to open the dialog
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content>
        <Success variant="buy-keycard" onClose={() => setOpen(false)} />
      </Dialog.Content>
    </Dialog.Root>
  )
}
