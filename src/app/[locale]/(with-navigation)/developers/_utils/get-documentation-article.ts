import fs from 'fs/promises'
import path from 'path'
import { baseComponents } from '~/app/_components/content'
import { slug as slugify } from 'github-slugger'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { Literal, Node, Parent } from 'unist'
import { visit } from 'unist-util-visit'
import { z } from 'zod'

interface HeadingNode extends Parent {
  type: 'heading'
  depth: number
  children: Array<TextNode>
}

interface TextNode extends Literal {
  type: 'text'
  value: string
}

type Heading = {
  level: 1 | 2
  value: string
  slug: string
}

const frontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
})

export async function getDocumentationArticle(slug: string[]) {
  const basePath = path.resolve(`content/developers/${slug.join('/')}`)
  let filePath = `${basePath}.mdx`

  try {
    const stat = await fs.stat(basePath)
    if (stat.isDirectory()) {
      filePath = path.join(basePath, 'index.mdx')
    }
  } catch {
    // not an error, just undetected index file
  }

  try {
    const fileContent = await fs.readFile(filePath, 'utf8')
    // Use build time as the last edited date
    const lastEdited = new Date()

    let extractedHeadings: Heading[] = []

    const { content, frontmatter } = await compileMDX<
      z.infer<typeof frontmatterSchema>
    >({
      source: fileContent,
      components: baseComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: 'github-dark',
                keepBackground: false,
              },
            ],
          ],
          remarkPlugins: [
            () => (tree: Node) => {
              const headings: Heading[] = []

              visit(tree, 'heading', (node: HeadingNode) => {
                if (node.depth === 2) {
                  const text = node.children
                    .filter((child): child is TextNode => child.type === 'text')
                    .map(child => child.value)
                    .join('')
                  const slug = slugify(text)
                  headings.push({
                    level: node.depth,
                    value: text,
                    slug,
                  })
                }
              })

              extractedHeadings = headings
            },
          ],
        },
      },
    })

    const result = frontmatterSchema.safeParse(frontmatter)

    if (!result.success) {
      const errorMessage = result.error.issues
        .map(issue => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ')

      throw new Error(`Invalid metadata: ${errorMessage}`)
    }

    return {
      meta: {
        ...result.data,
        lastEdited,
        headings: extractedHeadings,
      },
      content: content,
    }
  } catch (error) {
    console.error(
      `Error fetching documentation article for slug ${slug.join('/')}:`,
      error,
    )
    throw error
  }
}
