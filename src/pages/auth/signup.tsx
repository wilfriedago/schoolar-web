import { Box, HorizontalGrid, Image } from '@shopify/polaris'
import { useState } from 'react'

import { SignUpForm, type SignUpFormData, type SignUpFormErrors } from '@/features/auth'
import { AuthLayout } from '@/layouts'
import type { NextPageWithLayout } from '@/shared/types'

const SignUpPage: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [customErrors, setCustomErrors] = useState<SignUpFormErrors>()

  const handleSubmit = async (formData: SignUpFormData) => {
    try {
      console.log(formData)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <HorizontalGrid columns={2} alignItems="center">
      <Image
        style={{
          height: '100vh',
          width: '100%'
        }}
        source="/assets/images/graduates.jpg"
        alt="Students in graduation gowns throwing their caps in the air"
      />
      <Box padding="12">
        <Image source="/assets/icons/logo.webp" alt="Logo" width={200} />
        <SignUpForm loading={isLoading} errors={customErrors} onSubmit={handleSubmit} />
      </Box>
    </HorizontalGrid>
  )
}

SignUpPage.layout = (page) => <AuthLayout>{page}</AuthLayout>

export default SignUpPage
