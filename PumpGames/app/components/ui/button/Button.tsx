import { IButton } from "@/components/ui/button/menu.interface"
import { FC, PropsWithChildren } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

const Button: FC<PropsWithChildren<IButton>> = ({
	isArrow,
	onPress,
	iconLeftPath,
	children
}) => {
	return (
		<View className='flex-row justify-center'>
			<TouchableOpacity
				className={`flex-row items-center justify-center gap-x-2 bg-white max-w-[340] w-full h-[55] rounded-3xl border-[1px] border-[black]/10 shadow-[black]/10 shadow-sm`}
				onPress={onPress}
			>
				{iconLeftPath && (
					<Image
						className='w-4 h-4'
						resizeMode='contain'
						source={require("@/assets/ui/unlock.png")}
					/>
				)}
				<Text className='font-semibold text-primary text-lg'>{children}</Text>
				{isArrow && (
					<Image
						className='w-4 h-4'
						resizeMode='contain'
						source={require("@/assets/ui/arrow_orange.png")}
					/>
				)}
			</TouchableOpacity>
		</View>
	)
}

export default Button
