import { defineDocumentType, makeSource } from '@contentlayer/source-files'
import remarkHeadings from '@vcarl/remark-headings'
import { slug as slugify } from 'github-slugger'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { VFile } from 'vfile'

const CONTENT_DIR_PATH = 'src'

export type DocHeading = {
  level: 1 | 2
  value: string
}

export type DocIndex = {
  path: string
  title: string
  content: {
    [key in string]: string[]
  }
}

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: 'docs/**/*.mdx',
  contentType: 'mdx',

  fields: {
    id: { type: 'string', required: true },
    title: { type: 'string', required: true },
  },

  computedFields: {
    slug: {
      // @ts-expect-error TODO
      type: 'string[]',
      resolve: doc => doc._raw.flattenedPath.replace('docs/', '').split('/'),
    },
    url: {
      type: 'string',
      resolve: doc => '/' + doc._raw.flattenedPath,
    },
    pathSegments: {
      // @ts-expect-error TODO
      type: '{ order: number; pathName: string }[]',
      resolve: doc => getPathSegments(doc._raw.flattenedPath),
    },
    headings: {
      // @ts-expect-error TODO
      type: '{ level: 1 | 2; value: string, slug: string }[]',
      resolve: async doc => {
        // @ts-expect-error TODO
        const processor = unified().use(remarkParse).use(remarkHeadings)
        const tree = await processor.parse(doc.body.raw)
        const file = await new Promise<VFile | undefined>(resolve => {
          processor.run(tree, (_error, _tree, file) => {
            resolve(file)
          })
        })

        return (file!.data['headings'] as { depth: number; value: string }[])
          .filter(({ depth }) => [2].includes(depth))
          .map<DocHeading>(({ depth, value }) => ({
            level: depth as 2,
            value,
            slug: slugify(value),
          }))
      },
    },
  },
}))

function getPathSegments(filePath: string) {
  return filePath.split('/').map(fileName => {
    const re = /^((\d+)-)?(.*)$/
    const [, , orderStr, pathName] = fileName.match(re) ?? []
    const order = orderStr ? parseInt(orderStr) : 0
    return { order, pathName }
  })
}

export function resolvePathname(
  relativePath: string,
  fromPathname: string,
): string {
  const segments = fromPathname.replace(/\/+$/, '').split('/')
  const relativeSegments = relativePath.split('/')

  relativeSegments.forEach(segment => {
    if (segment === '..') {
      // Keep the root "" segment so the pathname starts at /
      if (segments.length > 1) segments.pop()
    } else if (segment !== '.') {
      segments.push(segment)
    }
  })

  return segments.length > 1 ? segments.join('/') : '/'
}

export default makeSource({
  onMissingOrIncompatibleData: 'fail',
  contentDirPath: CONTENT_DIR_PATH,
  contentDirInclude: ['docs'],
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [remarkGfm, remarkDirective],
    rehypePlugins: [
      rehypeSlug,
      [
        // @ts-expect-error TODO
        rehypePrettyCode,
        {
          theme: 'github-dark',
          keepBackground: false,
        },
      ],
    ],
  },
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
})
