import TextComponent from "@/components/ui/text/TextComponent"
import React from "react"
import { Button, Modal as RNModal, View } from "react-native"

interface ModalProps {
	children?: React.ReactNode
	handler?: () => void

	onClose(): void
}

const Modal: React.FC<ModalProps> = ({ handler, onClose }) => {
	return (
		<RNModal visible={true} transparent animationType='fade'>
			<View className='w-full h-full items-center justify-center bg-primaryBackground/70'>
				<View className='items-center bg-white rounded-2xl p-6'>
					<TextComponent>This is a custom modal</TextComponent>
					<Button onPress={onClose} title='Close' />
				</View>
			</View>
		</RNModal>
	)
}

export default Modal
