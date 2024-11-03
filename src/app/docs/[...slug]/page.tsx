import { Metadata } from '~/app/_metadata'
import { Link } from '~components/link'
import { allDocuments } from '~content'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import React from 'react'
import { Breadcrumbs } from '../_components/breadcrumbs'
import { baseComponents } from '../_components/content'
import { generateBreadcrumbs } from '../_utils/generate-breadcrumbs'

export function generateMetadata({ params }: Props) {
  const doc = allDocuments.find(
    d => (d.slug as unknown as string[]).join('/') === params.slug.join('/'),
  )!

  return Metadata({
    title: doc.title,
    description: 'Technical guides for Keycard.',
  })
}

type Props = {
  params: {
    slug: string[]
  }
}

const page = (props: Props) => {
  const { params } = props

  const doc = allDocuments.find(
    d => d.slug.join('/') === params!.slug.join('/'),
  )

  if (!doc) {
    return notFound()
  }

  const DocContent = getMDXComponent(doc.body.code)

  const breadcrumbs = generateBreadcrumbs(doc)

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-1 justify-center gap-[139px] px-5 py-20 lg:pl-[250px] xl:pr-[140px]">
        <div className="max-w-[664px]">
          <DocContent components={baseComponents} />
        </div>

        <div className="hidden w-[190px] 2xl:block">
          <div className="sticky top-[100px]">
            <div className="flex flex-col gap-3">
              <div className="font-inter text-12 font-400 uppercase text-white-80">
                In this document
              </div>
              <div className="flex flex-col gap-[6px]">
                {doc.headings.map((heading, index) => (
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

export default page
