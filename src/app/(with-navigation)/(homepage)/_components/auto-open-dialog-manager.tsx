'use client'

import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import { BuyShellDialog } from '~components/buy-shell-dialog'
import { useEffect, useState } from 'react'

const AutoOpenDialogManager = () => {
  const [openKeycard, setOpenKeycard] = useState(false)
  const [openShell, setOpenShell] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const buyKeycard = params.get('buyKeycard')
    const buyShell = params.get('buyShell')

    if (buyKeycard === 'true') {
      setOpenKeycard(true)
    } else if (buyShell === 'true') {
      setOpenShell(true)
    }
  }, [])

  const handleKeycardOpenChange = (isOpen: boolean) => {
    setOpenKeycard(isOpen)
  }

  const handleShellOpenChange = (isOpen: boolean) => {
    setOpenShell(isOpen)
  }

  return (
    <>
      <BuyKeycardDialog
        open={openKeycard}
        onOpenChange={handleKeycardOpenChange}
      />
      <BuyShellDialog open={openShell} onOpenChange={handleShellOpenChange} />
    </>
  )
}

export { AutoOpenDialogManager }
