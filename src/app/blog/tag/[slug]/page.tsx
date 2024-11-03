import { notFound } from 'next/navigation'
import { InfinitePostGrid } from '../../_components/infinite-post-grid'
import { getPostsByTagSlug, getTagSlugs } from '../../../_lib/ghost'

export const revalidate = 3600 // 1 hour
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getTagSlugs()

  return slugs.map(slug => ({ slug })) satisfies Array<Props['params']>
}

type Props = {
  params: { slug: string }
}

export default async function BlogTagPage(props: Props) {
  const { params } = props

  const response = await getPostsByTagSlug(params.slug)

  if (!response) {
    return notFound()
  }

  const { posts, tag, meta } = response

  return (
    <div className="mx-auto max-w-[1184px] px-5 pb-24 pt-12 lg:pb-32 lg:pt-20">
      <div className="mb-12 grid gap-2">
        <h1 className="font-lora text-32 font-600 lg:text-48">{tag.name}</h1>
        {tag.description && <div className="text-16">{tag.description}</div>}
      </div>

      <InfinitePostGrid
        type="tag"
        initialPosts={posts}
        meta={meta}
        queryKey={tag.slug}
      />
    </div>
  )
}
