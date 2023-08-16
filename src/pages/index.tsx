import { GuestLayout } from '@/layouts/GuestLayout'
import type { NextPageWithLayout } from '@/shared/types'

const HomePage: NextPageWithLayout = () => {
  return <>ccc</>
}

HomePage.layout = (page) => <GuestLayout title="Home">{page}</GuestLayout>

export default HomePage
