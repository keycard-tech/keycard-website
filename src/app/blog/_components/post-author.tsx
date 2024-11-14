'use client'

import type { PostOrPage } from '@tryghost/content-api'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { Avatar } from './avatar'

export const PostAuthor = (props: {
  author: NonNullable<PostOrPage['primary_author']>
}) => {
  const { author } = props
  const router = useRouter()

  const handleNavigation = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    ) => {
      if (
        e.type === 'click' ||
        (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter')
      ) {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/blog/author/${author.slug}`)
      }
    },
    [router, author.slug],
  )

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleNavigation}
      onKeyDown={handleNavigation}
      className="flex cursor-pointer gap-2 text-white-95 hover:text-orange"
    >
      <Avatar
        size="20"
        name={author.name ?? author.slug}
        src={author.profile_image ?? undefined}
      />
      <span className="text-16 font-500">{author.name ?? author.slug}</span>
    </div>
  )
}
