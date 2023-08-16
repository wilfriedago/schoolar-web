import { Modal, type ModalProps } from '@shopify/polaris'
import { createContext, type PropsWithChildren, type ReactNode, useContext, useMemo, useRef, useState } from 'react'

export type MProps = Omit<ModalProps, 'open' | 'onClose'>

const defaultFunction = (_props: MProps, _content?: ReactNode, _open?: boolean) => Promise.resolve(true)

export const ModalContext = createContext({
  modalRef: { current: defaultFunction }
})

export const ModalWithContext = () => {
  const [open, setOpen] = useState(false)
  const [props, setProps] = useState<MProps>({} as MProps)
  const [content, setContent] = useState<ReactNode>()

  const resolveRef = useRef((_v: boolean) => {})

  const { modalRef } = useContext(ModalContext)

  const handleClose = () => {
    resolveRef.current(true)
    setOpen(false)
  }

  modalRef.current = (_props, _content, _open) =>
    new Promise((resolve) => {
      setProps(_props)
      setContent(_content)
      setOpen(_open ?? true)

      resolveRef.current = resolve
    })

  return (
    <Modal {...props} open={open} onClose={handleClose}>
      <Modal.Section>{content}</Modal.Section>
    </Modal>
  )
}

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const modalRef = useRef(defaultFunction)
  const modalContextValue = useMemo(() => ({ modalRef }), [modalRef])

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
      <ModalWithContext />
    </ModalContext.Provider>
  )
}
