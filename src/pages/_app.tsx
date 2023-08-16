import '@shopify/polaris/build/esm/styles.css'
import '@/styles/global.css'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

import { AppProvider, ModalProvider, StoreProvider } from '@/contexts'
import type { AppPropsWithLayout } from '@/shared/types'

// eslint-disable-next-line global-require
if (process.env.NEXT_PUBLIC_API_MOCKING_ENABLED === 'true') require('@/shared/mocks')

const MyApp = ({ Component, pageProps, session }: AppPropsWithLayout) => {
  const getLayout = Component.layout ?? ((page) => page)

  return (
    <AppProvider>
      <ThemeProvider>
        <ModalProvider>
          <StoreProvider>
            <SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
          </StoreProvider>
        </ModalProvider>
      </ThemeProvider>
    </AppProvider>
  )
}

export default MyApp
