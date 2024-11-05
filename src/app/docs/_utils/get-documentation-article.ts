import fs from 'fs/promises'
import path from 'path'
import { slug as slugify } from 'github-slugger'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { Literal, Node, Parent } from 'unist'
import { visit } from 'unist-util-visit'
import { z } from 'zod'
import { baseComponents } from '../_components/content'

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
  const basePath = path.resolve(`content/docs/${slug.join('/')}`)
  let filePath = `${basePath}.mdx`

  try {
    const stat = await fs.stat(basePath)
    console.log(`Stat: ${stat}`)
    if (stat.isDirectory()) {
      console.log(`Directory found, generating ${slug}/index.mdx file`)
      filePath = path.join(basePath, 'index.mdx')
    }
  } catch (err) {
    console.log(`Not an index file, generating ${slug}.mdx file`, err)
  }

  try {
    const [fileContent, { mtime: lastEdited }] = await Promise.all([
      fs.readFile(filePath, 'utf8'),
      fs.stat(filePath),
    ])

    let extractedHeadings: Heading[] = []

    const { content, frontmatter } = await compileMDX<
      z.infer<typeof frontmatterSchema>
    >({
      source: fileContent,
      components: baseComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [rehypeSlug, rehypePrettyCode],
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
