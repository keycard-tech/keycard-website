import config from '~/config/docs.json'

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
      label: 'Documentation',
      href: '/docs/overview',
    },
  ]

  let accumulatedPath = '/docs'

  slug.forEach((part, index) => {
    accumulatedPath += `/${part}`
    const configItem = config.find(c => c.link === accumulatedPath)

    if (configItem) {
      breadcrumbs.push({
        label: configItem.title,
        href: accumulatedPath,
      })
    } else if (index === slug.length - 1) {
      // Poslední část slugu, pokusíme se získat titulek aktuálního dokumentu
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
