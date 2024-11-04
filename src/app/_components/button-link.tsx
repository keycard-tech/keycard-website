import { cva, cx } from 'cva'
import { Link } from './link'

type Props = {
  variant?: 'primary' | 'secondary' | 'white'
  children: React.ReactNode
  active?: boolean
} & React.ComponentProps<typeof Link>

const buttonStyles = cva({
  base: 'inline-flex cursor-pointer gap-[6px] select-none items-center rounded-12 border px-4 py-2 pb-[10px] transition-colors',
  variants: {
    variant: {
      primary:
        'bg-orange border-[transparent] hover:bg-orange-dark backdrop-blur-[20px] text-white-95',
      secondary:
        'bg-white-8 border-white-12 hover:bg-white-12 backdrop-blur-[20px] text-white-95',
      white: 'bg-white-100 hover:bg-white-dark text-dark-100',
    },
    active: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'secondary',
      active: true,
      className: 'bg-dark-60 ',
    },
  ],
})
const ButtonLink = (props: Props) => {
  const { children, variant = 'primary', className, active, ...rest } = props
  return (
    <Link
      className={cx([buttonStyles({ variant, active }), className])}
      {...rest}
    >
      {children}
    </Link>
  )
}

export { ButtonLink }
