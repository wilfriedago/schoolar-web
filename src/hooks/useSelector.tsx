import { type TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux'

import type { RootState } from '@/shared/store'

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
