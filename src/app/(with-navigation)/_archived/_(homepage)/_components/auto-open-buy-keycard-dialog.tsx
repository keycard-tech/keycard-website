'use client'

import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import { useEffect, useState } from 'react'

export const AutoOpenBuyKeycardDialog = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const buyKeycard = new URLSearchParams(window.location.search).get(
      'buyKeycard',
    )

    if (!buyKeycard || buyKeycard !== 'true') {
      return
    }

    setOpen(true)
  }, [])

  return <BuyKeycardDialog open={open} onOpenChange={setOpen} />
}
