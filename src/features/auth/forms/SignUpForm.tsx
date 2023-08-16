import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, FormLayout, Text, TextField } from '@shopify/polaris'
import { EnterMajor } from '@shopify/polaris-icons'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { AppConstants } from '@/shared/constants'

const schema = z.object({
  firstName: z.string({ required_error: 'First name is required' }).min(2, 'First name must be at least 2 characters'),
  lastName: z.string({ required_error: 'Last name is required' }).min(2, 'Last name must be at least 2 characters'),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters'),
  confirmPassword: z
    .string({ required_error: 'Confirm password is required' })
    .min(8, 'Password must be at least 8 characters') // TODO: Add check to make both passwords match
})

export type SignUpFormData = z.infer<typeof schema>

export type SignUpFormErrors = Partial<SignUpFormData>

type SignUpFormProps = {
  loading: boolean
  errors?: SignUpFormErrors
  onSubmit: (data: SignUpFormData) => void
}

export const SignUpForm = ({ onSubmit, loading, errors }: SignUpFormProps) => {
  const { control, handleSubmit, formState } = useForm<SignUpFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema)
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout>
        <Text as="h1" variant="heading3xl" fontWeight="semibold">
          Create an account
        </Text>

        <FormLayout.Group>
          <Controller
            name="firstName"
            control={control}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <TextField
                type="text"
                label="First name"
                autoComplete="given-name"
                error={formState.errors.firstName?.message || errors?.firstName}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <TextField
                type="text"
                label="Last name"
                autoComplete="family-name"
                error={formState.errors.lastName?.message || errors?.lastName}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
              />
            )}
          />
        </FormLayout.Group>

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextField
              type="email"
              label="Email"
              autoComplete="email"
              error={formState.errors.email?.message || errors?.email}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              name={name}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextField
              type="password"
              label="Password"
              autoComplete="new-password"
              error={formState.errors.password?.message || errors?.password}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              name={name}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextField
              type="password"
              label="Confirm password"
              autoComplete="new-password"
              error={formState.errors.confirmPassword?.message || errors?.confirmPassword}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              name={name}
            />
          )}
        />

        <Button submit size="large" icon={EnterMajor} loading={loading} fullWidth primary>
          Create an account
        </Button>

        <Text as="p" variant="bodyMd">
          Already have an account ? <Link href={AppConstants.pages.auth.signin}>Sign in</Link>
        </Text>
      </FormLayout>
    </Form>
  )
}
