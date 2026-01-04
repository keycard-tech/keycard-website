'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { BackgroundImage } from './background-image'

type Props = {
  variant: 'thank-you' | 'homepage'
}

const BackgroundWebGL = dynamic(
  () => import('./background').then(module => module.Background),
  { ssr: false },
)

export const LazyBackground = (props: Props) => {
  const { variant } = props
  const [showWebgl, setShowWebgl] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const connection =
      'connection' in navigator
        ? (navigator as Navigator & { connection?: { saveData?: boolean } })
            .connection
        : undefined

    if (prefersReducedMotion || connection?.saveData) return

    let canceled = false
    const show = () => {
      if (!canceled) setShowWebgl(true)
    }

    if ('requestIdleCallback' in window) {
      const win = window as Window & {
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions,
        ) => number
        cancelIdleCallback?: (handle: number) => void
      }
      const id = win.requestIdleCallback?.(show, { timeout: 2000 })

      return () => {
        canceled = true
        if (id != null) {
          win.cancelIdleCallback?.(id)
        }
      }
    }

    const timeout = setTimeout(show, 500)

    return () => {
      canceled = true
      clearTimeout(timeout)
    }
  }, [])

  if (!showWebgl) {
    return <BackgroundImage variant={variant} />
  }

  return <BackgroundWebGL variant={variant} />
}
