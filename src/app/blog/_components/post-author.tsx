'use client'

import type { PostOrPage } from '@tryghost/content-api'
import { useRouter } from 'next/navigation'
import { Avatar } from './avatar'

export const PostAuthor = (props: {
  author: NonNullable<PostOrPage['primary_author']>
}) => {
  const { author } = props

  const router = useRouter()

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/blog/author/${author.slug}`)
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault()
          e.stopPropagation()
          router.push(`/blog/author/${author.slug}`)
        }
      }}
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
