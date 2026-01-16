import config from '~/config/developers.json'

type Breadcrumb = {
  label: string
  href: string
}

export const generateBreadcrumbs = (
  slug: string[],
  title: string,
): Breadcrumb[] => {
  const breadcrumbs: Breadcrumb[] = [
    {
      label: 'Developers',
      href: '/developers/overview',
    },
  ]

  let accumulatedPath = '/developers'

  slug.forEach((part, index) => {
    accumulatedPath += `/${part}`
    const configItem = config.find(c => c.link === accumulatedPath)

    if (configItem) {
      breadcrumbs.push({
        label: configItem.title,
        href: accumulatedPath,
      })
    } else if (index === slug.length - 1) {
      breadcrumbs.push({
        label: title,
        href: accumulatedPath,
      })
    } else {
      breadcrumbs.push({
        label: 'Not found',
        href: accumulatedPath,
      })
    }
  })

  return breadcrumbs
}
