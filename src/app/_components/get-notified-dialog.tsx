'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { cx } from 'cva'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { Close, Confetti } from '../_icons'
import { signUpSchema, type SignUp } from '../api/validation/sign-up'
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
  const [showSuccess, setShowSuccess] = useState(true)

  const onSubmit: SubmitHandler<SignUp> = async data => {
    console.log('submitted', data)
    // try {
    //   const response = await fetch('/api/sign-up', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data satisfies Input),
    //   })
    //   if (!response.ok) {
    //     const { error } = await response.json()
    //     // we don't want to show the error if the user is already signed up
    //     // if (error.code !== 'duplicated') {
    //     throw new Error(error.message)
    //     // }
    //   }
    //   setShowSuccess(true)
    // } catch (error) {
    //   // ideally we should use some service to catch these errors
    //   console.error(error)
    // }
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
        <Dialog.Content className="fixed inset-0 top-24 z-50 overflow-y-auto focus:outline-none md:left-1/2 md:!max-w-[1190px] md:-translate-x-1/2">
          {showSuccess ? (
            <>
              <div className="relative grid place-items-center px-5">
                <Image
                  src="/assets/sign-up-success.png"
                  alt="Sign up teaser"
                  width={549}
                  height={623}
                  className="absolute left-1/2 top-0 z-0 -translate-x-1/2"
                />
                <div className="z-10 flex flex-col items-center pt-72">
                  <h3 className="mb-3 font-lora text-32 text-white-95">
                    We&apos;ll notify you!
                  </h3>
                  <p className="mb-10 max-w-[490px] text-center text-20 font-300 text-white-80">
                    You have successfully signed up to be notified when Keycard
                    Pro becomes available to buy next year.
                  </p>
                  <Button variant="secondary" onClick={handleClose}>
                    Continue exploring
                  </Button>
                </div>
              </div>
              <div className="mt-32 flex items-center justify-evenly gap-4 rounded-20 border border-white-12 bg-white-8 p-1 pr-4">
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
                <ButtonLink variant="primary" href="/keycard">
                  Buy Keycard
                </ButtonLink>
              </div>
            </>
          ) : (
            <>
              <Dialog.Close asChild>
                <div className="absolute right-6 top-7 z-50">
                  <button
                    onClick={handleClose}
                    className="rounded-12 border border-white-12 bg-white-3 p-[10px] text-white-100 hover:bg-white-8"
                  >
                    <Close />
                  </button>
                </div>
              </Dialog.Close>
              <SignUpForm onSubmit={onSubmit} />
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type SignUpFormProps = {
  onSubmit: SubmitHandler<SignUp>
}

const SignUpForm = (props: SignUpFormProps) => {
  const { onSubmit } = props

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
    <div className="grid max-w-[570px] overflow-hidden rounded-28 border border-white-12 bg-white-3">
      <div className="p-5 px-6 pb-6">
        <h3 className="mb-10 font-lora text-32">Get notified</h3>

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

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                className="absolute right-1 top-8 h-10 border border-white-20"
              >
                Notify me
              </Button>
            </Field>
          </div>
        </Form>
      </div>
      <div className="flex items-center justify-start gap-2 border-t border-dashed border-white-12 bg-white-3 px-6 py-[14px] text-14 font-300 text-white-60">
        <Confetti className="size-4" /> Keycard Pro is launching in 2025
      </div>
    </div>
  )
}
