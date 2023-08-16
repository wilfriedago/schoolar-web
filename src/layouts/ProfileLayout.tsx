import { Frame } from '@shopify/polaris'
import { type ComponentProps, type ReactNode, useCallback, useState } from 'react'

import { Header, Logo, Meta } from '@/components'
import { Navigation } from '@/components/Navigation'
import { ToastProvider } from '@/contexts'

type ProfileLayoutProps = ComponentProps<typeof Meta> & {
  children: ReactNode
}

export const ProfileLayout = ({ children, ...props }: ProfileLayoutProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false)

  const toggleMobileNavigationActive = useCallback(() => setMobileNavigationActive((val) => !val), [])

  return (
    <Frame
      logo={Logo}
      topBar={<Header onNavigationToggle={toggleMobileNavigationActive} />}
      navigation={<Navigation />}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      <Meta {...props} />
      <ToastProvider>{children}</ToastProvider>
    </Frame>
  )
}
