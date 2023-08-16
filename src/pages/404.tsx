import { EmptyState } from '@shopify/polaris'
import { useRouter } from 'next/router'

import { InfoLayout } from '@/layouts/InfoLayout'
import type { NextPageWithLayout } from '@/shared/types'

const NotFoundPage: NextPageWithLayout = () => {
  const { back } = useRouter()

  return (
    <EmptyState
      heading="It seems that you are lost."
      image="/assets/icons/404.svg"
      largeImage="/assets/icons/404.svg"
      imageContained
      action={{ content: 'Go back', onAction: back }}
      secondaryAction={{ content: 'Report a problem', url: '/contact' }}
    >
      <p>The page you are looking for doesn&apos;t exist or has been moved.</p>
    </EmptyState>
  )
}

NotFoundPage.layout = (page) => <InfoLayout title="Page not found">{page}</InfoLayout>

export default NotFoundPage
