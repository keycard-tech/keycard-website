import { cx } from 'cva'

type Props = {
  value: number
}

const Step = (props: Props) => {
  const { value } = props

  return (
    <span
      className={cx(
        'inline-flex basis-[fit-content] items-center justify-center rounded-6 text-12 font-400',
        'min-w-[20px] bg-orange p-0 text-white-95',
      )}
    >
      {value}
    </span>
  )
}

export { Step }
export type { Props as StepProps }
