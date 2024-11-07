import { useId } from 'react'

type Props = {
  label: string
  children: React.ReactNode
  error?: string
}

const Field = (props: Props) => {
  const { label, children, error } = props

  const id = useId()

  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="mb-2 block text-12 font-400 uppercase tracking-[0.24px] text-white-80"
      >
        {label}
      </label>
      <div className="grid gap-3">
        {children}
        {error && (
          <p role="alert" className="text-16 font-300 text-red">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

export { Field }
