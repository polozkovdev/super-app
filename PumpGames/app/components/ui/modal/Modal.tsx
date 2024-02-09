import Button from "@/components/ui/button/Button"
import TextComponent from "@/components/ui/text/TextComponent"
import { IModalContent } from "@/context/ModalContext"
import { Ionicons } from "@expo/vector-icons"
import React, { FC, PropsWithChildren } from "react"
import { Modal as RNModal, TouchableOpacity, View } from "react-native"

interface ModalProps {
	content?: IModalContent
	children?: React.ReactNode
	handler?: () => void

	onClose(): void
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
	handler,
	content,
	onClose,
	children
}) => {
	return (
		<RNModal visible={true} transparent animationType='fade'>
			<View className='w-full h-full items-center justify-center bg-primaryBackground/70'>
				<View className='items-center bg-white rounded-2xl p-[32px] relative min-w-[300px] min-h-[300px] justify-center'>
					<TouchableOpacity
						onPress={() => onClose()}
						className='absolute top-[8px] right-[8px] p-[4px] rounded-full bg-primaryBackground transition'
					>
						<Ionicons name='close' size={24} color='#3F1210' />
					</TouchableOpacity>
					{content?.title && (
						<TextComponent type='title' className='mb-[24px]'>
							{content?.title}
						</TextComponent>
					)}
					{content?.text && (
						<TextComponent className='mb-[12px]'>{content?.text}</TextComponent>
					)}
					{content?.successHandler && (
						<Button
							className='mt-[24px]'
							children={content?.successText}
							iconLeftPath='@/assets/ui/unlock.png'
							onPress={() => {
								content.successHandler?.()
								onClose()
							}}
						/>
					)}
				</View>
			</View>
		</RNModal>
	)
}

export default Modal
