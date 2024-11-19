import { baseComponents } from '~/app/_components/content'
import { getPostBySlug, getPostSlugs } from '~/app/_lib/ghost'
import { Metadata } from '~/app/_metadata'
import { formatDate } from '~/app/_utils/format-date'
import { Breadcrumbs } from '~/app/(with-navigation)/docs/_components/breadcrumbs'
import { notFound } from 'next/navigation'
import { createElement, Fragment } from 'react'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'
import { PostAuthor } from '../_components/post-author'
import { PostTag } from '../_components/post-tag'

export const revalidate = 3600 // 1 hour
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map(slug => ({ slug })) satisfies Array<Awaited<Props['params']>>
}

export async function generateMetadata({ params }: Props) {
  const post = (await getPostBySlug((await params).slug))!

  return Metadata({
    title: post.title!,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.og_title ?? undefined,
      description: post.og_description ?? undefined,
      images: [post.og_image ?? post.feature_image!],
    },
  })
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogDetailPage(props: Props) {
  const { params } = props

  const post = await getPostBySlug((await params).slug)

  if (!post) {
    return notFound()
  }

  const { result } = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: baseComponents,
    })
    .process(post.html!)

  // root
  const breadcrumbs = [
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: post.title!,
      href: `/blog/${post.slug}`,
    },
  ]

  if (post.primary_tag) {
    breadcrumbs.splice(1, 0, {
      label: post.primary_tag.name ?? post.primary_tag.slug,
      href: `/blog/tag/${post.primary_tag.slug}`,
    })
  }

  const author = post.primary_author!
  const tag = post.primary_tag

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="m-auto max-w-[664px] px-5 py-8 xl:py-12">
        <div className="gap-3">
          {tag && <PostTag size="32" tag={tag} />}

          <h1 className="my-4 font-lora text-32 font-600 xl:text-48">
            {post.title!}
          </h1>

          <div className="mt-auto flex h-5 items-center gap-1">
            <PostAuthor author={author} />
            <div className="text-14 text-white-95">
              on {formatDate(new Date(post.published_at!))}
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1504px] px-0 py-6 xl:py-10">
          <img
            src={post.feature_image!}
            className="aspect-[374/182] size-full rounded-28 object-cover xl:aspect-[1456/470]"
            alt={post.feature_image_alt!}
          />
        </div>

        <div className="py-6">{result}</div>
      </div>
    </>
  )
}
