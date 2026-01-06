import { getPosts } from '~/app/_lib/ghost'
import { getTranslations } from 'next-intl/server'
import { HighlightedPostCard } from './_components/highlighted-post-card'
import { InfinitePostGrid } from './_components/infinite-post-grid'

export const revalidate = 3600 // 1 hour

export default async function BlogPage() {
  const t = await getTranslations()
  const { posts: initialPosts, meta } = await getPosts()

  const highlightedPost = initialPosts[0]

  return (
    <div className="mx-auto max-w-[1184px] px-5 py-12 xl:py-24">
      <div className="mb-10 grid gap-2">
        <h1 className="font-lora text-48 font-600">
          {t('blog.title.translation')}
        </h1>
        <h2 className="text-20 font-300 text-white-95">
          {t('blog.subtitle.translation')}
        </h2>
      </div>

      {initialPosts.length > 0 ? (
        <div>
          <h2 className="mb-4 font-lora text-24 font-400 text-white-95">
            Latest updates
          </h2>
          {highlightedPost && (
            <>
              <h2 className="mb-4 font-lora text-24 font-400 text-white-95">
                Featured article
              </h2>
              <div className="mb-[44px] 2xl:mb-12">
                <HighlightedPostCard post={highlightedPost} />
              </div>
            </>
          )}

          <h2 className="mb-4 font-lora text-24 font-400 text-white-95">
            All Keycard blog posts
          </h2>
          <InfinitePostGrid
            type="posts"
            initialPosts={initialPosts}
            meta={meta}
            queryKey="all"
            skip={1}
          />
        </div>
      ) : (
        <div className="my-12 text-20">{t('blog.no_posts.translation')}</div>
      )}
    </div>
  )
}
