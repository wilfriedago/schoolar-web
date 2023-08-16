import { Toast, type ToastProps } from '@shopify/polaris'
import { createContext, type PropsWithChildren, useCallback, useContext, useMemo, useRef, useState } from 'react'

export type TProps = Omit<ToastProps, 'onDismiss'>

export const defaultFunction = (_props: TProps) => Promise.resolve(true)

export const ToastContext = createContext({ toastRef: { current: defaultFunction } })

export const ToastWithContext = () => {
  const [active, setActive] = useState(false)
  const [props, setProps] = useState<TProps>({} as TProps)

  const resolveRef = useRef((_v: boolean) => {})

  const { toastRef } = useContext(ToastContext)

  const handleDismiss = useCallback(() => setActive((val) => !val), [])

  toastRef.current = (_props) =>
    new Promise((resolve) => {
      setProps(_props)
      setActive(true)

      resolveRef.current = resolve
    })

  return active ? <Toast {...props} onDismiss={handleDismiss} /> : null
}

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const toastRef = useRef(defaultFunction)
  const toastContextValue = useMemo(() => ({ toastRef }), [toastRef])

  return (
    <ToastContext.Provider value={toastContextValue}>
      {children}
      <ToastWithContext />
    </ToastContext.Provider>
  )
}
