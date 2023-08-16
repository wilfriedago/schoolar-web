import { useCallback, useContext } from 'react'

import { ToastContext, type TProps } from '@/contexts'

export const useToast = () => {
  const { toastRef } = useContext(ToastContext)

  return {
    show: useCallback((props: TProps) => toastRef.current(props), [toastRef]),
    error: useCallback((props: Omit<TProps, 'error'>) => toastRef.current({ error: true, ...props }), [toastRef])
  }
}
