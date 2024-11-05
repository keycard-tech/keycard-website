import fs from 'fs/promises'
import path from 'path'
// import { Metadata } from '~/app/_metadata'
import { Link } from '~components/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { Breadcrumbs } from '../_components/breadcrumbs'
import { generateBreadcrumbs } from '../_utils/generate-breadcrumbs'
import { getDocumentationArticle } from '../_utils/get-documentation-article'

async function getAllSlugs(
  dir: string,
  parentSlug: string[] = [],
): Promise<string[][]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  let slugs: string[][] = []

  // Zkontrolujte, zda složka obsahuje index soubor
  const hasIndex = entries.some(
    entry => entry.isFile() && /^index\.mdx?$/.test(entry.name),
  )

  if (hasIndex) {
    // Přidejte slug bez 'index'
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
  const docsPath = path.resolve('content/docs')
  const slugs = await getAllSlugs(docsPath)
  return slugs.map(slug => {
    console.log(`Slug: ${slug}`)

    return { slug }
  })
}

type Props = {
  params: {
    slug: string[]
  }
}

const Page = async (props: Props) => {
  const { params } = props

  let article
  try {
    article = await getDocumentationArticle(params.slug)
  } catch (err) {
    console.error(`Error fetching documentation article: ${err}`)
    notFound()
  }

  const { meta, content } = article

  const breadcrumbs = generateBreadcrumbs(params.slug, meta.title)

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-1 justify-center gap-[139px] px-5 py-20 lg:pl-[250px] xl:pr-[140px]">
        <div className="w-full max-w-[664px]">{content}</div>

        <div className="hidden w-[190px] 2xl:block">
          <div className="sticky top-[100px]">
            <div className="flex flex-col gap-3">
              <div className="font-inter text-12 font-400 uppercase text-white-80">
                V tomto dokumentu
              </div>
              <div className="flex flex-col gap-[6px]">
                {meta.headings.map((heading, index) => (
                  <Link
                    key={heading.value + index}
                    href={{ hash: heading.slug }}
                  >
                    <div className="text-14 font-500 text-white-95 hover:text-orange">
                      {heading.value}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
