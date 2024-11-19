'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import type { PostOrPage, PostsOrPages } from '@tryghost/content-api'
import { useMemo } from 'react'
import { match } from 'ts-pattern'
import { useInfiniteLoading } from '../_hooks/use-infinite-loading'
import {
  getPosts,
  getPostsByAuthorSlug,
  getPostsByTagSlug,
} from '../../_lib/ghost'
import { PostGrid } from './post-grid'

type Props = {
  type: 'posts' | 'author' | 'tag'
  initialPosts: PostOrPage[]
  meta: PostsOrPages['meta']
  queryKey: string
  skip?: number
}

export const InfinitePostGrid = (props: Props) => {
  const { initialPosts, type, meta, queryKey, skip = 0 } = props

  const {
    data,
    // error,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    isFetchingNextPage,
    // status,
    // isFetched,
  } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: queryKey ? ['posts', queryKey] : ['posts'],
    queryFn: async ({ pageParam: page, queryKey }) => {
      const [, tag] = queryKey

      const response = await match(type)
        .with('posts', () => getPosts({ page }))
        .with('author', () => getPostsByAuthorSlug(tag, page))
        .with('tag', () => getPostsByTagSlug(tag, page))
        .exhaustive()

      return response!
    },
    getNextPageParam: ({ meta }) => meta.pagination.next,
    initialData: { pages: [{ posts: initialPosts, meta }], pageParams: [1] },
    initialPageParam: 1,
    staleTime: Infinity,
  })

  const { endOfPageRef, isLoading } = useInfiniteLoading({
    rootMargin: '-100px',
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  })

  const allPosts = useMemo(() => {
    return data.pages.flatMap(posts => posts?.posts ?? []).slice(skip)
  }, [data.pages, skip])

  return (
    <>
      <PostGrid
        posts={allPosts}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
      />
      <div ref={endOfPageRef} />
    </>
  )
}
