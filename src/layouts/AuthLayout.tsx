import type { ComponentProps, ReactNode } from 'react'

import type { Meta } from '@/components'

type Props = ComponentProps<typeof Meta> & {
  children: ReactNode
}

export const AuthLayout = ({ children }: Props) => {
  return <div className="h-full">{children}</div>
}
