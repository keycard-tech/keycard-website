import { getPosts } from '~/app/_lib/ghost'
import { HighlightedPostCard } from './_components/highlighted-post-card'
import { InfinitePostGrid } from './_components/infinite-post-grid'

export const revalidate = 3600 // 1 hour

export default async function BlogPage() {
  const { posts: initialPosts, meta } = await getPosts()

  const highlightedPost = initialPosts[0]

  return (
    <div className="mx-auto max-w-[1184px] px-5 pb-24 pt-12 xl:pb-32 xl:pt-20">
      <div className="mb-10 grid gap-2">
        <h1 className="font-lora text-48 font-600">Keycard News</h1>
        <div className="text-20">Thoughts, stories and ideas.</div>
      </div>

      <div>
        <div className="mb-[44px] 2xl:mb-12">
          {highlightedPost && <HighlightedPostCard post={highlightedPost} />}
        </div>

        <InfinitePostGrid
          type="posts"
          initialPosts={initialPosts}
          meta={meta}
          queryKey="all"
          skip={1}
        />
      </div>
    </div>
  )
}
