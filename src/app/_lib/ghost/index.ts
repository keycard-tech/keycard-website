import { clientEnv } from '~/config/env.client.mjs'
import { GhostContentAPI } from './client'

/** @see https://ghost.org/docs/content-api# */
const ghost = GhostContentAPI({
  url: clientEnv.NEXT_PUBLIC_GHOST_API_URL,
  key: clientEnv.NEXT_PUBLIC_GHOST_API_KEY,
  version: 'v5.0',
})

type Params = { page?: number; limit?: number; tag?: string }

const defaultResponse = {
  posts: [],
  meta: {
    pagination: {
      page: 1,
      limit: 0,
      pages: 0,
      total: 0,
      next: null,
      prev: null,
    },
  },
}

export const getPosts = async (params: Params = {}) => {
  const { page = 1, limit = 7, tag } = params

  try {
    const response = await ghost.posts.browse({
      include: ['tags', 'authors'],
      order: 'published_at DESC',
      limit,
      page,
      ...(tag
        ? { filter: `tag:${tag}+visibility:public` }
        : { filter: 'visibility:public' }),
    })

    return { posts: [...response], meta: response.meta }
  } catch (error) {
    console.error('Error fetching getPosts: ', error)
    return defaultResponse
  }
}

export const getPostBySlug = async (slug: string) => {
  try {
    return await ghost.posts.read(
      { slug },
      {
        include: ['tags', 'authors'],
      },
    )
  } catch (error) {
    console.error('Error fetching getPostBySlug: ', error)
    return
  }
}

export const getPostsByTagSlug = async (slug: string, page = 1) => {
  try {
    const response = await ghost.posts.browse({
      filter: `tag:${slug}+visibility:public`,
      include: ['tags', 'authors'],
      limit: 6,
      order: 'published_at DESC',
      page,
    })

    return {
      posts: [...response],
      tag: response[0].tags!.find(tag => tag.slug === slug)!,
      meta: response.meta,
    }
  } catch (error) {
    console.error('Error fetching getPostsByTagSlug: ', error)
    return
  }
}

export const getPostsByAuthorSlug = async (slug: string, page = 1) => {
  try {
    const response = await ghost.posts.browse({
      filter: `author:${slug}+visibility:public`,
      include: ['tags', 'authors'],
      limit: 6,
      order: 'published_at DESC',
      page,
    })

    return {
      posts: [...response],
      author: response[0].authors!.find(author => author.slug === slug)!,
      meta: response.meta,
    }
  } catch (error) {
    console.error('Error fetching getPostsByAuthorSlug: ', error)
    return
  }
}

export const getPostSlugs = async (): Promise<string[]> => {
  try {
    const posts = await ghost.posts.browse({
      limit: 7,
      fields: 'slug',
      filter: 'visibility:public',
    })

    return posts.map(post => post.slug)
  } catch (error) {
    console.error('Error fetching getPostSlugs: ', error)
    return []
  }
}

export const getTagSlugs = async (): Promise<string[]> => {
  try {
    const tags = await ghost.tags.browse({
      limit: clientEnv.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'all' : 6,
      fields: 'slug',
      filter: 'visibility:public',
    })

    return tags.map(tag => tag.slug)
  } catch (error) {
    console.error('Error fetching getTagSlugs: ', error)
    return []
  }
}

export const getAuthorSlugs = async (): Promise<string[]> => {
  try {
    const authors = await ghost.authors.browse({
      limit: clientEnv.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'all' : 6,
      fields: 'slug',
      filter: 'visibility:public',
    })

    return authors.map(author => author.slug)
  } catch (error) {
    console.error('Error fetching getAuthorSlugs: ', error)
    return []
  }
}

export const getAllPostsForSitemap = async () => {
  try {
    const posts = await ghost.posts.browse({
      limit: 'all',
      fields: ['slug', 'updated_at', 'published_at'],
      filter: 'visibility:public',
      order: 'published_at DESC',
    })
    return posts
  } catch (e) {
    console.error('Error fetching posts for sitemap', e)
    return []
  }
}
