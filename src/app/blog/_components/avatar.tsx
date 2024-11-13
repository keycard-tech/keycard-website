import { cva } from 'cva'
import Image from 'next/image'

type Props = {
  size: '56' | '32' | '20'
  name: string
  src?: string
}

const Avatar = (props: Props) => {
  const { size, name, src } = props
  return (
    <div
      className={baseStyles({
        size,
      })}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          className="size-full rounded-full object-cover"
          height={Number(size)}
          width={Number(size)}
        />
      ) : (
        <div className="flex size-full select-none items-center justify-center rounded-full bg-white-95">
          {name ? name.slice(0, Number(size) < 28 ? 1 : 2).toUpperCase() : '?'}
        </div>
      )}
    </div>
  )
}

export { Avatar }
export type { Props }

const baseStyles = cva({
  base: 'relative flex items-center justify-center overflow-hidden rounded-full',
  variants: {
    size: {
      '56': 'size-14 text-32',
      '32': 'size-8 text-20',
      '20': 'size-5 text-14',
    },
    padding: {
      '56': 'p-0.5',
      '32': 'p-0.5',
      '20': 'p-0',
    },
  },
})
