import fs from 'fs/promises'
import path from 'path'
import { Breadcrumbs } from '~/app/_components/docs/breadcrumbs'
import { DocsNavDrawer } from '~/app/_components/docs/docs-nav-drawer'
import { Metadata } from '~/app/_metadata'
import { formatDate } from '~/app/_utils/format-date'
import { buildLocaleAlternates } from '~/app/_utils/metadata'
import config from '~/config/developers.json'
import { SUPPORTED_LOCALES } from '~/i18n/constants'
import { notFound } from 'next/navigation'
import { generateBreadcrumbs } from '../_utils/generate-breadcrumbs'
import { getDocumentationArticle } from '../_utils/get-documentation-article'

async function getAllSlugs(
  dir: string,
  parentSlug: string[] = [],
): Promise<string[][]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  let slugs: string[][] = []

  const hasIndex = entries.some(
    entry => entry.isFile() && /^index\.mdx?$/.test(entry.name),
  )

  if (hasIndex) {
    slugs.push(parentSlug)
  }

  for (const entry of entries) {
    const entryName = entry.name
    const fullPath = path.join(dir, entryName)
    const isMdx = /\.(mdx?)$/.test(entryName)
    const nameWithoutExt = entryName.replace(/\.mdx?$/, '')
    const currentSlug = [...parentSlug, nameWithoutExt]

    if (entry.isDirectory()) {
      const nestedSlugs = await getAllSlugs(fullPath, currentSlug)
      slugs = slugs.concat(nestedSlugs)
    } else if (entry.isFile() && isMdx && nameWithoutExt !== 'index') {
      slugs.push(currentSlug)
    }
  }

  return slugs
}

export const dynamicParams = false

export async function generateStaticParams() {
  const docsPath = path.resolve('content/developers')
  const slugs = await getAllSlugs(docsPath)
  return slugs.flatMap(slug =>
    SUPPORTED_LOCALES.map(locale => ({ slug, locale })),
  )
}

export async function generateMetadata({ params }: Props) {
  const findTitle = (slug: string[], docs: typeof config): string | null => {
    for (const doc of docs) {
      if (doc.link?.split('/').slice(2).join('/') === slug.join('/')) {
        return doc.title
      }
      if (doc.subItems) {
        const title = findTitle(slug, doc.subItems)
        if (title) {
          return title
        }
      }
    }
    return null
  }

  const resolvedParams = await params
  let title = findTitle(resolvedParams.slug, config)
  if (!title) {
    try {
      const article = await getDocumentationArticle(resolvedParams.slug)
      title = article.meta.title
    } catch {
      return {
        title: 'Article Not Found',
        description: 'This developer article is not available yet.',
      }
    }
  }

  return Metadata({
    title,
    description: 'Technical documentation and API references for developers.',
    alternates: buildLocaleAlternates(
      resolvedParams.locale,
      `/developers/${resolvedParams.slug.join('/')}`,
    ),
  })
}

type Props = {
  params: Promise<{
    slug: string[]
    locale: string
  }>
}

const Page = async (props: Props) => {
  const { params } = props

  let article
  try {
    article = await getDocumentationArticle((await params).slug)
  } catch (err) {
    console.error(`Error fetching documentation article: ${err}`)
    notFound()
  }

  const { meta, content } = article

  const breadcrumbs = generateBreadcrumbs((await params).slug, meta.title)

  return (
    <div>
      <Breadcrumbs
        items={breadcrumbs}
        actionPlacement="inline"
        action={
          <DocsNavDrawer
            items={config}
            title="Developer docs"
            triggerLabel=""
            ariaLabel="Browse developer docs"
            compact
            className="lg:hidden"
          />
        }
      />
      <div className="flex flex-1 justify-center gap-[139px] px-5 py-20 lg:pl-[250px] xl:pr-[140px]">
        <div className="w-full max-w-[664px]">
          <div className="mb-1 text-16 font-300 text-white-80">
            {formatDate(meta.lastEdited)}
          </div>
          <div className="pb-5">{content}</div>
          <div className="mt-5 grid gap-1 text-16 font-300 text-white-80">
            <div className="text-12 font-400 uppercase text-white-80">
              Last edited
            </div>
            <div className="text-16 font-300 text-white-80">
              {formatDate(meta.lastEdited)}
            </div>
          </div>
        </div>

        <div className="hidden w-[190px] 2xl:block">
          <div className="sticky top-[100px]">
            {meta.headings.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="font-inter text-12 font-400 uppercase text-white-80">
                  In this document
                </div>
                <div className="flex flex-col gap-[6px]">
                  {meta.headings.map((heading, index) => (
                    <a
                      key={heading.value + index}
                      href={`#${heading.slug}`}
                      className="text-14 font-500 text-white-95 hover:text-orange"
                    >
                      {heading.value}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
