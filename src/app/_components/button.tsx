import { cva, cx } from 'cva'

type Props = {
  variant?: 'primary' | 'secondary' | 'white' | 'dark'
  size?: 'small' | 'medium'
  children: React.ReactNode
  active?: boolean
} & React.ComponentProps<'button'>

const buttonStyles = cva({
  base: 'inline-flex cursor-pointer gap-[6px] text-16 select-none items-center rounded-12 border transition-colors w-fit',
  variants: {
    variant: {
      primary:
        'bg-orange border-[transparent] hover:bg-orange-dark backdrop-blur-[20px] text-white-95',
      secondary:
        'bg-white-8 border-white-12 hover:bg-white-12 backdrop-blur-[20px] text-white-95',
      white: 'bg-white-100 hover:bg-white-dark text-dark-100',
      dark: 'border-[transparent] bg-white-3 hover:border-white-8 hover:bg-white-8 text-white-95',
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
const Button = (props: Props) => {
  const {
    children,
    variant = 'primary',
    className,
    active,
    size = 'medium',
    ...rest
  } = props
  return (
    <button
      className={cx([buttonStyles({ variant, active, size }), className])}
      {...rest}
    >
      {children}
    </button>
  )
}

export { Button }
