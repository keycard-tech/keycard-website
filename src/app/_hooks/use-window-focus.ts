import { useEffect, useState } from 'react'

export const useWindowFocus = () => {
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden)
    }

    const handleFocus = () => {
      setIsActive(true)
    }

    const handleBlur = () => {
      setIsActive(false)
    }

    if (typeof window !== 'undefined') {
      document.addEventListener(
        'visibilitychange',
        handleVisibilityChange,
        false,
      )
      window.addEventListener('focus', handleFocus, false)
      window.addEventListener('blur', handleBlur, false)
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        window.removeEventListener('focus', handleFocus)
        window.removeEventListener('blur', handleBlur)
      }
    }
  }, [])

  return isActive
}
