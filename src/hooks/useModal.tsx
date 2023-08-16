import { type ReactNode } from 'react'
import { useCallback, useContext } from 'react'

import { ModalContext, type MProps } from '@/contexts'

export const useModal = () => {
  const { modalRef } = useContext(ModalContext)

  return {
    show: useCallback((props: MProps, content: ReactNode) => modalRef.current(props, content), [modalRef]),
    dismiss: useCallback(() => modalRef.current({} as MProps, null, false), [modalRef])
  }
}
