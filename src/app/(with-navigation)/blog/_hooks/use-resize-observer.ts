import { RefObject, useEffect, useState } from 'react'

export function useResizeObserver(elementRef: RefObject<Element>) {
  const [columnCount, setColumnCount] = useState(1)

  useEffect(() => {
    const ref = elementRef.current!

    const resizeObserver = new ResizeObserver(() => {
      const gridSize = ref.clientWidth
      // @ts-expect-error TODO
      const itemSize = parseFloat(window.getComputedStyle(ref.firstChild).width)
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
  }, [])

  return columnCount
}
