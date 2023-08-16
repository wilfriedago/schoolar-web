import { Layout, Page } from '@shopify/polaris'

import { ProfileLayout } from '@/layouts/ProfileLayout'
import type { NextPageWithLayout } from '@/shared/types'

type Props = {}

const ProfilePage: NextPageWithLayout = (_props: Props) => {
  return (
    <Page fullWidth title="Home">
      <Layout>ProfilePage</Layout>
    </Page>
  )
}

ProfilePage.layout = (page) => <ProfileLayout title="Home | Schoolar">{page}</ProfileLayout>

export default ProfilePage
