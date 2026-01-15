import { Breadcrumbs } from '~/app/_components/docs/breadcrumbs'
import { getPostsByTagSlug, getTagSlugs } from '~/app/_lib/ghost'
import { Metadata } from '~/app/_metadata'
import { buildLocaleAlternates } from '~/app/_utils/metadata'
import { SUPPORTED_LOCALES } from '~/i18n/constants'
import { notFound } from 'next/navigation'
import { InfinitePostGrid } from '../../_components/infinite-post-grid'

export const revalidate = 3600 // 1 hour
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getTagSlugs()

  return slugs.flatMap(slug =>
    SUPPORTED_LOCALES.map(locale => ({ slug, locale })),
  ) satisfies Array<Awaited<Props['params']>>
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params
  const response = await getPostsByTagSlug(resolvedParams.slug)
  if (!response) {
    return notFound()
  }

  return Metadata({
    title: `${response.tag.name ?? response.tag.slug} — Keycard Blog`,
    alternates: buildLocaleAlternates(
      resolvedParams.locale,
      `/blog/tag/${response.tag.slug}`,
    ),
  })
}

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export default async function BlogTagPage(props: Props) {
  const { params } = props

  const response = await getPostsByTagSlug((await params).slug)

  if (!response) {
    return notFound()
  }

  const { posts, tag, meta } = response

  const breadcrumbs = [
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: tag.name ?? tag.slug,
      href: `/blog/tag/${tag.slug}`,
    },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="mx-auto max-w-[1184px] px-5 py-8 lg:py-12">
        <div className="mb-12 grid gap-2">
          <h1 className="font-lora text-32 font-600 lg:text-48">{tag.name}</h1>
          <h2 className="text-16 font-300 text-white-95">Keycard blog tag</h2>
          <h2 className="sr-only">Keycard blog updates</h2>
          {tag.description && (
            <p className="text-16 text-white-90">{tag.description}</p>
          )}
        </div>

        <h2 className="mb-4 font-lora text-24 font-400 text-white-95">
          Articles tagged {tag.name}
        </h2>
        <h2 className="sr-only">More posts from Keycard</h2>
        <InfinitePostGrid
          type="tag"
          initialPosts={posts}
          meta={meta}
          queryKey={tag.slug}
        />
      </div>
    </>
  )
}
