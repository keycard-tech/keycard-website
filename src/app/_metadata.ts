import type { Metadata } from 'next'

type Input = Omit<Metadata, 'openGraph'> & {
  title: NonNullable<Metadata['title']>
  description?: string
  openGraph?: Metadata['openGraph'] | null
}

export function Metadata(input: Input): Metadata {
  const { openGraph, ...rest } = input

  const outputOg: Record<string, unknown> = { ...(openGraph ?? {}) }

  if (outputOg['title'] == null) outputOg['title'] = input.title
  if (outputOg['description'] == null && input.description) {
    outputOg['description'] = input.description
  }
  if (outputOg['images'] == null) {
    outputOg['images'] = ['/opengraph-image.png?v=2']
  }

  return {
    ...rest,
    openGraph: outputOg as NonNullable<Metadata['openGraph']>,
  }
}
