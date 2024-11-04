import { cva, cx } from 'cva'

type Props = {
  children: React.ReactNode
  gradient?: boolean
  icon?: React.ReactNode
  size?: 'small' | 'medium'
}

const styles = cva({
  base: 'flex w-fit items-center gap-[6px] rounded-[32px] text-16 font-300 text-white-95 outline outline-1 outline-white-12',
  variants: {
    size: {
      small: 'py-[5px] pl-3 pr-2',
      medium: 'py-[9px] pl-[14px] pr-4',
    },
  },
})
const Tag = (props: Props) => {
  const { children, icon, gradient, size = 'medium' } = props
  return (
    <div
      className={cx([
        styles({ size }),
        gradient && 'bg-gradient-to-b from-[transparent] to-white-12',
      ])}
    >
      {icon}
      <span>{children}</span>
    </div>
  )
}
export { Tag }
