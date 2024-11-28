'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  CloseIcon,
  ConfettiColorfulIcon,
  LoadingIcon,
} from '@status-im/icons/20'
import { cx } from 'cva'
import { useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { signUpSchema, type SignUp } from '../_lib/google/validation'
import { handleSignUp } from '../actions'
import { Button } from './button'
import { BuyKeycardDialog } from './buy-keycard-dialog'
import * as Dialog from './dialog'
import { Field } from './form/field'
import { Form } from './form/form'

type Props = {
  children: React.ReactElement
}

export const GetNotifiedDialog = (props: Props) => {
  const { children } = props

  const [open, setOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<SignUp> = async data => {
    try {
      const response = await handleSignUp(data)

      if (response.success) {
        setShowSuccess(true)
      } else {
        setError(response.message ?? 'An unknown error occurred')
        console.error(response.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) {
      setShowSuccess(false)
    }
  }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        {showSuccess ? (
          <Dialog.Success
            title="We'll notify you!"
            description="You have successfully signed up to be notified when Keycard Shell becomes available to buy next year."
            image="/assets/sign-up-success.png"
            onClose={() => setOpen(false)}
            footer={{
              title: "Don't want to wait?",
              description: 'Get started with Keycard',
              Dialog: BuyKeycardDialog,
              buttonText: 'Buy Keycard',
            }}
          />
        ) : (
          <div
            className={cx(
              'fixed inset-0 z-50 h-full overflow-y-auto focus:outline-none',
              'md:left-1/2 md:top-1/2 md:h-fit md:w-[570px] md:-translate-x-1/2 md:-translate-y-1/2',
            )}
          >
            <Dialog.Close asChild>
              <div className="absolute right-5 top-5 z-50 md:right-6 md:top-7">
                <button
                  onClick={handleClose}
                  className="rounded-12 border border-white-12 bg-white-4 p-[10px] text-white-100 hover:bg-white-8"
                >
                  <CloseIcon />
                </button>
              </div>
            </Dialog.Close>
            <div
              className={cx(
                'grid max-w-[570px] overflow-hidden border-0 border-white-12 bg-[transparent]',
                'md:rounded-28 md:border md:bg-white-4',
              )}
            >
              <div className="p-5 pb-6 md:px-6">
                <Dialog.Title asChild>
                  <h3 className="mb-[60px] font-lora text-32 md:mb-10">
                    Get notified
                  </h3>
                </Dialog.Title>
                <SignUpForm onSubmit={onSubmit} error={error} />
              </div>
              <div
                className={cx(
                  'mx-5 flex items-center justify-center gap-2 bg-white-4 px-4 py-[14px] text-14 font-300 text-white-60',
                  'rounded-16 border border-dashed border-white-12',
                  'md:mx-0 md:justify-start md:rounded-0 md:border-x-0 md:border-b-0 md:px-6',
                )}
              >
                <ConfettiColorfulIcon className="size-5" /> Keycard Shell is
                launching in 2025
              </div>
            </div>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

type SignUpFormProps = {
  onSubmit: SubmitHandler<SignUp>
  error: string | null
}

const SignUpForm = (props: SignUpFormProps) => {
  const { onSubmit, error } = props

  const form = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  })

  const {
    formState: { isSubmitting },
  } = form

  const submitHandler: SubmitHandler<SignUp> = async data => {
    return onSubmit(data)
  }

  const { field, fieldState } = useController({
    control: form.control,
    name: 'email',
  })

  const invalid = fieldState.invalid

  return (
    <Form {...form} onSubmit={submitHandler}>
      <div className="grid gap-4">
        <Field label="Email address" error={fieldState.error?.message}>
          <input
            {...field}
            placeholder="hello@email.com"
            data-invalid={invalid}
            autoComplete="off"
            className={cx(
              // input has to have at least 16px font size to prevent from "zooming in" on mobile
              'h-12 w-full border border-solid px-4 py-1 text-16 font-300 text-white-95 placeholder-white-40 caret-orange max-sm:text-[1rem]',
              'rounded-16 border-white-12 bg-white-4 hover:bg-white-8 focus:border-white-20',
              'disabled:cursor-not-allowed disabled:border-0 disabled:bg-white-8 disabled:text-white-40',
            )}
          />
          {error && (
            <div role="alert" className="mb-0.5 text-14 font-300 text-red">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            className="absolute right-1 top-8 h-10 min-w-[101px] justify-center border border-white-20"
          >
            {isSubmitting ? (
              <LoadingIcon className="my-px animate-spin text-white-100" />
            ) : (
              'Notify me'
            )}
          </Button>
        </Field>
      </div>
    </Form>
  )
}
