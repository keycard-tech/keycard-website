import { cva, cx } from 'cva'
import { Link } from './link'

type Props = {
  variant?: 'primary' | 'secondary' | 'white'
  size?: 'small' | 'medium'
  children: React.ReactNode
  active?: boolean
} & React.ComponentProps<typeof Link>

const buttonStyles = cva({
  base: 'inline-flex cursor-pointer gap-[6px] text-16 select-none items-center rounded-12 border  transition-colors w-fit',
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
    size: {
      small: 'px-[12px] py-[9px]',
      medium: 'px-[14px] py-2 pb-[10px]',
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
  const {
    children,
    variant = 'primary',
    className,
    active,
    size = 'medium',
    ...rest
  } = props
  return (
    <Link
      className={cx([buttonStyles({ variant, active, size }), className])}
      {...rest}
    >
      {children}
    </Link>
  )
}

export { ButtonLink }
