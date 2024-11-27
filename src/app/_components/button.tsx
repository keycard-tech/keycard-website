import { cva, cx } from 'cva'
import React, { forwardRef } from 'react'

type Props = {
  variant?: 'primary' | 'secondary' | 'white' | 'dark'
  backdropFilter?: boolean
  children: React.ReactNode
  active?: boolean
  icon?: React.ReactNode
} & React.ComponentProps<'button'>

const buttonStyles = cva({
  base: 'inline-flex font-500 cursor-pointer gap-1 text-16 select-none items-center rounded-12 border transition-all w-fit disabled:opacity-[0.3] disabled:cursor-default',
  variants: {
    variant: {
      primary:
        'bg-orange border-white-12 hover:enabled:bg-orange-dark text-white-95',
      secondary:
        'bg-white-8 border-white-12 hover:enabled:bg-white-12 text-white-95',
      white: 'bg-white-100 hover:bg-white-dark text-dark-100',
      dark: 'border-[transparent] bg-white-4 hover:enabled:border-white-8 hover:enabled:bg-white-8 text-white-95',
    },
    withIcon: {
      true: 'pl-[14px] pr-[10px] py-2',
      false: 'px-[14px] py-2',
    },
    backdropFilter: {
      true: 'backdrop-blur-[20px]',
      false: '',
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

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    variant = 'primary',
    className,
    active,
    icon,
    backdropFilter,
    children,
    ...rest
  } = props
  return (
    <button
      ref={ref}
      className={cx([
        buttonStyles({ variant, active, withIcon: !!icon, backdropFilter }),
        className,
      ])}
      {...rest}
    >
      {children}
      {icon}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }
