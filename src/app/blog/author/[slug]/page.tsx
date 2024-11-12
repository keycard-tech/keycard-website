import { Breadcrumbs } from '~/app/docs/_components/breadcrumbs'
import { notFound } from 'next/navigation'
import { Avatar } from '../../_components/avatar'
import { InfinitePostGrid } from '../../_components/infinite-post-grid'
import { getAuthorSlugs, getPostsByAuthorSlug } from '../../../_lib/ghost'

export const revalidate = 3600 // 1 hour
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAuthorSlugs()

  return slugs.map(slug => ({ slug })) satisfies Array<Awaited<Props['params']>>
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogAuthorPage(props: Props) {
  const { params } = props

  const response = await getPostsByAuthorSlug((await params).slug)
  if (!response) {
    return notFound()
  }

  const { posts, author, meta } = response

  const breadcrumbs = [
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: author.name ?? author.slug,
      href: `/blog/author/${author.slug}`,
    },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="mx-auto max-w-[1184px] px-5 py-8 lg:py-12">
        <div className="mb-4">
          <Avatar
            size="56"
            name={author.name ?? author.slug}
            src={author.profile_image ?? undefined}
          />
        </div>
        <div className="mb-12 grid gap-2">
          <h1 className="font-lora text-32 font-600 lg:text-48">
            {author.name}
          </h1>
          {author.meta_description && (
            <p className="text-24 font-600 text-white-95">
              {author.meta_description}
            </p>
          )}
        </div>

        <InfinitePostGrid
          type="author"
          initialPosts={posts}
          meta={meta}
          queryKey={author.slug}
        />
      </div>
    </>
  )
}
