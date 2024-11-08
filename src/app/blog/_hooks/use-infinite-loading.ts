import { useEffect, useRef } from 'react'
import { useIntersectionObserver } from './use-intersection-observer'

export function useInfiniteLoading({
  rootMargin,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: {
  rootMargin: string
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  hasNextPage?: boolean
}) {
  const endOfPageRef = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(endOfPageRef, {
    rootMargin,
  })

  const isVisible = !!entry?.isIntersecting
  const isLoading = (hasNextPage && isVisible) || isFetchingNextPage

  useEffect(() => {
    if (isVisible && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isVisible])

  return {
    endOfPageRef,
    isLoading,
  }
}
