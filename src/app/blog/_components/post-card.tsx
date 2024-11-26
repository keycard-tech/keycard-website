import type { PostOrPage } from '@tryghost/content-api'
import Image from 'next/image'
import { Link } from '../../_components/link'
import { formatDate } from '../../_utils/format-date'
import { PostAuthor } from './post-author'
import { PostTag } from './post-tag'

type PostCardProps = {
  post: PostOrPage
  showTag?: boolean
  showAuthor?: boolean
}

export const PostCard = (props: PostCardProps) => {
  const { post, showTag = true, showAuthor = true } = props
  const author = post.primary_author!
  const tag = post.primary_tag

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col rounded-16 border border-white-8 bg-white-4 transition-all hover:scale-[101%]"
    >
      <div className="flex grow flex-col gap-4 p-4">
        {showTag && (
          <div className="h-8 overflow-hidden">
            {tag && <PostTag tag={tag} />}
          </div>
        )}

        <div>
          <span className="font-lora text-20 font-600">{post.title}</span>
        </div>

        {showAuthor ? (
          <div className="mt-auto flex h-5 gap-1">
            <PostAuthor author={author} />
            <span className="text-16 text-white-95">
              on {formatDate(post.published_at!)}
            </span>
          </div>
        ) : (
          <div className="mt-auto h-5">
            <span className="text-16 text-white-95">
              on {formatDate(post.published_at!)}
            </span>
          </div>
        )}
      </div>

      <div className="w-full px-2 pb-2">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          className="aspect-[350/190] size-full rounded-12 object-cover"
          width={350}
          height={190}
          src={post.feature_image!}
          alt={post.feature_image_alt! ?? post.title}
        />
      </div>
    </Link>
  )
}

export const PostCardSkeleton = () => (
  <div className="flex flex-col rounded-16 border border-white-8 bg-white-4 transition-all hover:scale-[101%]">
    <div className="flex grow flex-col gap-[13px] p-4">Loading...</div>
  </div>
)
