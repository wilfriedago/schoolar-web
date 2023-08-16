import type { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { AppStore } from '@/shared/store'

export type StoreProviderProps = PropsWithChildren

export const StoreProvider = ({ children }: StoreProviderProps) => <Provider store={AppStore}>{children}</Provider>
