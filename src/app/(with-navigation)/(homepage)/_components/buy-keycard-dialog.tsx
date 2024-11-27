'use client'

import { BuyKeycardDialog as Dialog } from '~components/buy-keycard-dialog'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function BuyKeycardDialog() {
  const [isBuyKeycardDialogOpen, setIsBuyKeycardDialogOpen] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const buyKeycard = searchParams.get('buyKeycard')

    if (!buyKeycard || buyKeycard !== 'true') {
      return
    }

    const timer = setTimeout(() => {
      setIsBuyKeycardDialogOpen(true)
    }, 1000)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isBuyKeycardDialogOpen) {
    return null
  }

  return (
    <Dialog isOpen={isBuyKeycardDialogOpen}>
      <></>
    </Dialog>
  )
}
