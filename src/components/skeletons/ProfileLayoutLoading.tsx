import { Card, Layout, SkeletonBodyText, SkeletonDisplayText, SkeletonPage } from '@shopify/polaris'

export const ProfileLayoutLoading = () => {
  return (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <Card>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText lines={9} />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  )
}
