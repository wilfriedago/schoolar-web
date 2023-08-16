import { useDispatch as useReduxDispatch } from 'react-redux'

import type { AppDispatch } from '@/shared/store'

export const useDispatch = () => useReduxDispatch<AppDispatch>()
