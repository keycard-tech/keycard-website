import { cx } from 'cva'

type Props = {
  value: number
}

const Step = (props: Props) => {
  const { value } = props

  return (
    <span
      className={cx(
        'rounded-6 inline-flex basis-[fit-content] items-center justify-center text-12 font-400',
        'border-transparent min-w-[20px] bg-orange p-0 text-white-95',
      )}
    >
      {value}
    </span>
  )
}

export { Step }
export type { Props as StepProps }
