import { createContext } from "react"

interface ModalContextType {
	showModal: () => void
	hideModal: () => void
}

export const ModalContext = createContext<ModalContextType>({
	showModal: () => {},
	hideModal: () => {}
})
