import { createContext } from "react"

export interface IModalContent {
	title?: string
	text?: string
	successText?: string
	successHandler?: (props?: any) => any
}

interface ModalContextType {
	content?: IModalContent
	showModal: (content?: IModalContent) => void
	hideModal: () => void
}

export const ModalContext = createContext<ModalContextType>({
	showModal: () => {},
	hideModal: () => {}
})
