import { cva, cx } from 'cva'
import { Link } from './link'

type Props = {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  active?: boolean
} & React.ComponentProps<typeof Link>

const buttonStyles = cva({
  base: 'flex cursor-pointer select-none items-center rounded-12 border text-white-95  px-[14px] pb-[10px] pt-2 backdrop-blur-[20px] transition-colors',
  variants: {
    variant: {
      primary: 'bg-orange border-[transparent] hover:bg-orange-dark',
      secondary: 'bg-white-6 border-white-6 hover:bg-white-12',
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
