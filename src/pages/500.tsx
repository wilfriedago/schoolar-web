import { EmptyState, Text } from '@shopify/polaris'
import { useRouter } from 'next/router'

import { InfoLayout } from '@/layouts/InfoLayout'
import type { NextPageWithLayout } from '@/shared/types'

const ServerErrorPage: NextPageWithLayout = () => {
  const { back } = useRouter()

  return (
    <EmptyState
      heading="Something went wrong."
      image="/assets/icons/500.svg"
      largeImage="/assets/icons/500.svg"
      imageContained
      action={{ content: 'Go back', onAction: back }}
      secondaryAction={{ content: 'Report a problem', url: '/contact' }}
    >
      <Text as="p">We&apos;re sorry. We&apos;ve encountered an error. Please try again later.</Text>
    </EmptyState>
  )
}

ServerErrorPage.layout = (page) => (
  <InfoLayout title="Internal Server error" description="Sorry, we've encountered an error. Please try again later.">
    {page}
  </InfoLayout>
)

export default ServerErrorPage
