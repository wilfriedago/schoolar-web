import { Frame } from '@shopify/polaris'
import type { ComponentProps, ReactNode } from 'react'

import { Logo, Meta } from '@/components'

type GuestLayoutProps = ComponentProps<typeof Meta> & {
  children: ReactNode
}

export const GuestLayout = ({ children, ...props }: GuestLayoutProps) => {
  return (
    <Frame key="guest-layout" logo={Logo}>
      <Meta {...props} />
      <main>{children}</main>
    </Frame>
  )
}
