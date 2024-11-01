import React from 'react'

const allDocs = [
  {
    slug: ['get-started'],
    title: 'Get Started',
  },
]

type Props = {
  params: {
    slug: string[]
  }
}

const page = (props: Props) => {
  const { params } = props

  const doc = allDocs.find(d => d.slug.join('/') === params!.slug.join('/'))

  return <div>{doc?.title}</div>
}

export default page
