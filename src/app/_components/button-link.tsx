import { cva, cx } from 'cva'
import { Link } from './link'

type Props = {
  variant?: 'primary' | 'secondary' | 'white'
  backdropFilter?: boolean
  size?: 'small' | 'medium'
  children: React.ReactNode
  active?: boolean
} & React.ComponentProps<typeof Link>

const buttonStyles = cva({
  base: 'inline-flex cursor-pointer gap-[6px] py-2 text-16 select-none items-center rounded-12 border transition-colors w-fit',
  variants: {
    variant: {
      primary:
        'bg-orange border-[transparent] hover:bg-orange-dark text-white-95',
      secondary: 'bg-white-8 border-white-12 hover:bg-white-12 text-white-95',
      white: 'bg-white-100 border-dark-8 hover:bg-white-dark text-dark-100',
    },
    active: {
      true: '',
      false: '',
    },
    backdropFilter: {
      true: 'backdrop-blur-[20px]',
      false: '',
    },
    size: {
      small: 'px-[12px]',
      medium: 'px-[14px]',
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
    backdropFilter,
    ...rest
  } = props
  return (
    <Link
      className={cx([
        buttonStyles({ variant, active, size, backdropFilter }),
        className,
      ])}
      {...rest}
    >
      {children}
    </Link>
  )
}

export { ButtonLink }
