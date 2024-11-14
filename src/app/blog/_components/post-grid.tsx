'use client'

import type { PostOrPage } from '@tryghost/content-api'
import { useRef } from 'react'
import { useResizeObserver } from '../_hooks/use-resize-observer'
import { PostCard, PostCardSkeleton } from './post-card'

export function PostGrid({
  posts,
  isLoading,
  hasNextPage,
}: {
  posts: PostOrPage[]
  isLoading: boolean
  hasNextPage?: boolean
}) {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const columnCount = useResizeObserver(gridRef)

  let visiblePosts
  if (hasNextPage) {
    const wrappedPostCount = posts.length - (posts.length % columnCount)
    visiblePosts = posts.slice(0, wrappedPostCount)
  } else {
    visiblePosts = posts
  }

  return (
    <div
      ref={gridRef}
      className="grid auto-rows-[1fr] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-5"
    >
      {visiblePosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      {isLoading && (
        <>
          {Array.from({ length: columnCount }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </>
      )}
    </div>
  )
}
