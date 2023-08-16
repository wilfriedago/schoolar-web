import { Box, HorizontalGrid, Image } from '@shopify/polaris'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { SignInForm, type SignInFormData, type SignInFormErrors } from '@/features/auth'
import { AuthLayout } from '@/layouts'
import { AppConstants } from '@/shared/constants'
import type { NextPageWithLayout } from '@/shared/types'

const LoginPage: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [customErrors, setCustomErrors] = useState<SignInFormErrors>()

  const handleSubmit = async (formData: SignInFormData) => {
    try {
      setIsLoading(true)

      const res = await signIn('credentials', {
        ...formData,
        redirect: false,
        callbackUrl: AppConstants.pages.protected.profile
      })

      if (res?.error) throw new Error(res.error)
    } catch (error) {
      setCustomErrors({ server: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <HorizontalGrid columns={2} alignItems="center">
      <Box padding="12">
        <Image source="/assets/icons/logo.webp" alt="Logo" width={200} />
        <SignInForm onSubmit={handleSubmit} loading={isLoading} errors={customErrors} />
      </Box>
      <Image
        style={{
          height: '100vh',
          width: '100%'
        }}
        source="/assets/images/graduates.jpg"
        alt="Students in graduation gowns throwing their caps in the air"
      />
    </HorizontalGrid>
  )
}

LoginPage.layout = (page) => <AuthLayout>{page}</AuthLayout>

export default LoginPage
