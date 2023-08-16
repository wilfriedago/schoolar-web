import type { ComponentProps, CSSProperties, ReactNode } from 'react'

import { Meta } from '@/components'

type InfoLayoutProps = ComponentProps<typeof Meta> & {
  children: ReactNode
}

const styles: CSSProperties = {
  height: '100vh',
  padding: '0 1rem',
  display: 'grid',
  placeItems: 'center'
}

export const InfoLayout = ({ children, ...props }: InfoLayoutProps) => {
  return (
    <>
      <Meta {...props} />
      <main style={styles}>{children}</main>
    </>
  )
}
