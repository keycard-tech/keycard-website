import { FormProvider } from 'react-hook-form'
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'

type Props<Values extends FieldValues> = UseFormReturn<Values> & {
  children: React.ReactNode
  className?: string
  onSubmit?: SubmitHandler<Values>
}

const Form = <Values extends FieldValues>(props: Props<Values>) => {
  const { children, onSubmit, className, ...form } = props
  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
          className={className}
        >
          {children}
        </form>
      </FormProvider>
    </>
  )
}

export { Form }
