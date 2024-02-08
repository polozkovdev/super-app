import Modal from "@/components/ui/modal/Modal"
import { ModalContext } from "@/context/ModalContext"
import React, { useState } from "react"

interface IModalProviderProps {
	children: React.ReactNode
}

export const ModalProvider: React.FC<IModalProviderProps> = ({ children }) => {
	const [visible, setVisible] = useState<boolean>(false)
	const [content, setContent] = useState()
	const showModal = (props: any) => {
		props && setContent(props)
		setVisible(true)
	}
	const hideModal = () => setVisible(false)
	return (
		<ModalContext.Provider value={{ showModal, hideModal }}>
			{children}
			{visible && <Modal onClose={hideModal} content={content} />}
		</ModalContext.Provider>
	)
}
