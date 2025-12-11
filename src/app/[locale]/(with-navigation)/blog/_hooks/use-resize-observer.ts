import { RefObject, useEffect, useState } from 'react'

export function useResizeObserver(elementRef: RefObject<Element | null>) {
  const [columnCount, setColumnCount] = useState(1)

  useEffect(() => {
    const ref = elementRef.current
    if (!ref) return

    const resizeObserver = new ResizeObserver(() => {
      const gridSize = ref.clientWidth
      const firstChild = ref.firstElementChild as HTMLElement | null
      if (!firstChild) return

      const itemSize = parseFloat(window.getComputedStyle(firstChild).width)
      const gapSize = parseFloat(window.getComputedStyle(ref).gap)

      const gapCount = Math.floor(
        (gridSize - itemSize * Math.floor(gridSize / itemSize)) / gapSize,
      )
      const columnCount = gapCount + 1

      setColumnCount(columnCount)
    })

    resizeObserver.observe(ref)

    return () => {
      resizeObserver.unobserve(ref)
    }
  }, [elementRef])

  return columnCount
}
