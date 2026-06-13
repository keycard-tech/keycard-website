import { baseComponents } from '~/app/_components/content'
import { createElement, Fragment } from 'react'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import rehypeSanitize, { defaultSchema, type Options } from 'rehype-sanitize'
import { unified } from 'unified'

const ghostHtmlSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'iframe', 'figcaption'],
  attributes: {
    ...defaultSchema.attributes,
    iframe: [
      ['src', /^https:\/\//],
      'width',
      'height',
      'title',
      'allow',
      'allowFullScreen',
      'frameBorder',
    ],
  },
} satisfies Options

export async function renderGhostHtml(html: string) {
  const { result } = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize, ghostHtmlSchema)
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: baseComponents,
    })
    .process(html)

  return result
}
