import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import type { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  session: Session
}

/**
 * Include `null` as a possible type for a given type.
 */
export type Nullable<T> = T | null

export type ErrorType = 'client' | 'server' | 'unknown'
