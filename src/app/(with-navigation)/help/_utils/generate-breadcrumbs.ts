import config from '~/config/help.json'

type Breadcrumb = {
  label: string
  href: string
}

type ConfigItem = {
  title: string
  link?: string
  subItems?: Array<{ title: string; link?: string }>
}

export const generateBreadcrumbs = (
  slug: string[],
  title: string,
): Breadcrumb[] => {
  const breadcrumbs: Breadcrumb[] = [
    {
      label: 'Help',
      href: '/help',
    },
  ]

  let accumulatedPath = '/help'

  slug.forEach((part, index) => {
    accumulatedPath += `/${part}`

    const configItem = (config as ConfigItem[]).find(
      c => c.link && c.link === accumulatedPath,
    )
    let itemTitle = configItem?.title

    if (!configItem) {
      for (const c of config as ConfigItem[]) {
        if (c.subItems) {
          const subItem = c.subItems.find(sub => sub.link === accumulatedPath)
          if (subItem) {
            itemTitle = subItem.title
            break
          }
        }
      }
    }

    if (itemTitle) {
      breadcrumbs.push({
        label: itemTitle,
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
