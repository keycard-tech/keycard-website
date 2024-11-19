import type { PostOrPage } from '@tryghost/content-api'
import { formatDate } from '~/app/_utils/format-date'
import { Link } from '~components/link'
import { PostAuthor } from './post-author'
import { PostTag } from './post-tag'

type Props = {
  post: PostOrPage
}

export const HighlightedPostCard = (props: Props) => {
  const { post } = props
  const author = post.primary_author!
  const tag = post.primary_tag

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="grid grid-cols-1 gap-5 2xl:grid-cols-3 2xl:gap-7"
    >
      <div className="col-span-2 w-full flex-[2] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="aspect-[366/206] size-full rounded-16 object-cover"
          src={post.feature_image!}
          alt={post.feature_image_alt!}
        />
      </div>

      <div className="flex flex-[1] flex-col gap-2 xl:py-5 xl:pr-5">
        <div className="h-8 overflow-hidden">
          {tag && <PostTag tag={tag} />}
        </div>

        <div>
          <span className="font-lora text-32 font-600">{post.title}</span>
        </div>

        <div>
          <div className="text-20 font-300">{post.excerpt}</div>
        </div>

        <div className="mt-4 flex h-5 items-center gap-1">
          <PostAuthor author={author} />
          <div className="text-14 text-white-95">
            on {formatDate(new Date(post.published_at!))}
          </div>
        </div>
      </div>
    </Link>
  )
}
