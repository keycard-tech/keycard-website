'use client'

import { BuyShellDialog } from '~components/buy-shell-dialog'
import { useEffect, useState } from 'react'

export const AutoOpenBuyShellDialog = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const buyShell = new URLSearchParams(window.location.search).get('buyShell')

    if (!buyShell || buyShell !== 'true') {
      return
    }

    setOpen(true)
  }, [])

  return <BuyShellDialog open={open} onOpenChange={setOpen} />
}
