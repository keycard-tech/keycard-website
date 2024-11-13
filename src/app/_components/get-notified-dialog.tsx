'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { cx } from 'cva'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { Close, Confetti } from '../_icons'
import { Loading } from '../_icons/loading'
import { signUpSchema, type SignUp } from '../_lib/google/validation'
import { handleSignUp } from '../actions'
import { Button } from './button'
import { ButtonLink } from './button-link'
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
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-dark-60 backdrop-blur-2xl" />
        <Dialog.Content>
          {showSuccess ? (
            <>
              <div
                className={cx(
                  'fixed inset-0 top-1/2 z-50 -mt-6 h-[623px] -translate-y-1/2 overflow-y-auto focus:outline-none',
                  'md:left-1/2 md:mt-0 md:w-[570px] md:-translate-x-1/2',
                )}
              >
                <div className="relative grid place-items-center px-5">
                  <Image
                    src="/assets/sign-up-success.png"
                    alt="Sign up teaser"
                    width={549}
                    height={623}
                    className="absolute left-1/2 top-0 z-0 max-w-max -translate-x-1/2 md:max-w-full"
                  />
                  <div className="z-10 flex flex-col items-center pt-72">
                    <h3 className="mb-3 font-lora text-32 text-white-95">
                      We&apos;ll notify you!
                    </h3>
                    <p className="mb-10 max-w-[490px] text-center text-20 font-300 text-white-80">
                      You have successfully signed up to be notified when
                      Keycard Pro becomes available to buy next year.
                    </p>
                    <Button variant="secondary" onClick={handleClose}>
                      Continue exploring
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className={cx(
                  'fixed inset-x-5 bottom-4 z-50 flex flex-col items-start justify-between gap-2 bg-white-8 p-1',
                  'rounded-20 border border-white-12',
                  'md:bottom-12 md:left-1/2 md:w-[570px] md:-translate-x-1/2 md:flex-row md:items-center md:gap-4 md:pr-4',
                )}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/sign-up-teaser.png"
                    alt="Sign up teaser"
                    width={64}
                    height={64}
                    className=""
                  />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="font-lora text-20 text-white-95">
                      Don&apos;t want to wait?
                    </div>
                    <div className="text-16 font-300 text-white-80">
                      Get started with Keycard
                    </div>
                  </div>
                </div>
                <ButtonLink
                  variant="primary"
                  href="/keycard"
                  className="w-full justify-center md:w-fit md:justify-start"
                >
                  Buy Keycard
                </ButtonLink>
              </div>
            </>
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
                    className="rounded-12 border border-white-12 bg-white-3 p-[10px] text-white-100 hover:bg-white-8"
                  >
                    <Close />
                  </button>
                </div>
              </Dialog.Close>
              <div
                className={cx(
                  'grid max-w-[570px] overflow-hidden border-0 border-white-12 bg-[transparent]',
                  'md:rounded-28 md:border md:bg-white-3',
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
                    'mx-5 flex items-center justify-center gap-2 bg-white-3 px-4 py-[14px] text-14 font-300 text-white-60',
                    'rounded-16 border border-dashed border-white-12',
                    'md:mx-0 md:justify-start md:rounded-0 md:border-x-0 md:border-b-0 md:px-6',
                  )}
                >
                  <Confetti className="size-4" /> Keycard Pro is launching in
                  2025
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
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
              'rounded-16 border-white-12 bg-white-3 hover:bg-white-8 focus:border-white-20',
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
            className="absolute right-1 top-8 h-10 w-[101px] justify-center border border-white-20"
          >
            {isSubmitting ? (
              <Loading className="my-px animate-spin text-white-100" />
            ) : (
              'Notify me'
            )}
          </Button>
        </Field>
      </div>
    </Form>
  )
}
