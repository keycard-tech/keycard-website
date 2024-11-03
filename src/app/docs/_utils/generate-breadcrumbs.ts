import config from '~/config/docs.json'
import { Doc } from '~content'

export const generateBreadcrumbs = (doc: Doc) => {
  const breadcrumbs = [
    {
      label: 'Documentation',
      href: '/docs',
    },
  ]

  for (const parentSlug of doc.slug.slice(0, -1)) {
    breadcrumbs.push({
      label:
        config.find(c => c.link === `/docs/${parentSlug}`)?.title ??
        'Not found',
      href: `/docs/${parentSlug}`,
    })
  }

  breadcrumbs.push({
    label: doc.title,
    href: doc.url,
  })

  return breadcrumbs
}
