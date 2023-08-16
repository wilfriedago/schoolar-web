import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, ExceptionList, Form, FormLayout, Text, TextField } from '@shopify/polaris'
import { DiamondAlertMajor, EnterMajor } from '@shopify/polaris-icons'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { AppConstants } from '@/shared/constants'
import type { ErrorType } from '@/shared/types'

const schema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional()
})

export type SignInFormData = z.infer<typeof schema>

export type SignInFormErrors = Partial<Record<keyof SignInFormData | ErrorType, string>>

type SignInFormProps = {
  loading: boolean
  errors?: SignInFormErrors
  onSubmit: (data: SignInFormData) => void
}

export const SignInForm = ({ onSubmit, loading, errors }: SignInFormProps) => {
  const { control, handleSubmit, formState } = useForm<SignInFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema)
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} preventDefault>
      <FormLayout>
        <Text as="h1" variant="heading3xl" fontWeight="semibold">
          Welcome back !
        </Text>

        {errors?.server || errors?.client ? (
          <ExceptionList
            items={[
              {
                status: 'critical',
                title: 'Error',
                icon: DiamondAlertMajor,
                description: errors?.server ?? errors?.client
              }
            ]}
          />
        ) : null}

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextField
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              type="email"
              label="Email"
              autoComplete="email"
              error={formState.errors.email?.message ?? errors?.email}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextField
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              type="password"
              label="Password"
              autoComplete="current-password"
              error={(formState.errors.password?.message as string) || errors?.password}
            />
          )}
        />

        <FormLayout.Group>
          <Controller
            name="rememberMe"
            control={control}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <Checkbox label="Stay connected ?" name={name} checked={value} onChange={onChange} onBlur={onBlur} />
            )}
          />

          <Link href={AppConstants.pages.auth.forgotPassword}>Forgot password ?</Link>
        </FormLayout.Group>

        <Button submit size="large" icon={EnterMajor} loading={loading} fullWidth primary>
          Login
        </Button>

        <Text as="p" variant="bodyMd">
          Don&apos;t have an account ? <Link href={AppConstants.pages.auth.signup}>Sign up</Link>
        </Text>
      </FormLayout>
    </Form>
  )
}
