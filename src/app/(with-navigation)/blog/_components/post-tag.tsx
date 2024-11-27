'use client'

import { Tag } from '@tryghost/content-api'
import { cva } from 'cva'
import type { VariantProps } from 'cva'
import { useRouter } from 'next/navigation'
import { forwardRef } from 'react'
import type { Ref } from 'react'

type Variants = VariantProps<typeof styles>

type Props = {
  size?: Variants['size']
  tag: Tag
}

function PostTag(props: Props, ref: Ref<HTMLButtonElement | HTMLDivElement>) {
  const { size = '32', tag, ...rest } = props
  const router = useRouter()

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    router.push(`/blog/tag/${tag.slug}`)
  }

  return (
    <button
      {...rest}
      onClick={handleOnClick}
      ref={ref as Ref<HTMLButtonElement>}
      className={styles({
        size,
      })}
    >
      {<span className="flex-1 whitespace-nowrap">{tag.name ?? tag.slug}</span>}
    </button>
  )
}

const styles = cva({
  base: [
    'inline-flex shrink-0 items-center justify-center gap-1 border border-white-8 bg-white-4 font-500 transition-all hover:border-white-12 hover:bg-white-8 text-white-95',
    'outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2',
    'disabled:cursor-default disabled:opacity-[.3]',
  ],
  variants: {
    size: {
      '32': 'h-8 rounded-16 px-3 text-16',
      '24': 'h-6 rounded-16 px-2 text-14',
    },
  },
})

const _Tag = forwardRef(PostTag)

export { _Tag as PostTag }
export type { Props as PostTagProps }
