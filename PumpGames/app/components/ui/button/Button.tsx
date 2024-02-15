import { IButton } from "@/components/ui/button/menu.interface"
import TextComponent from "@/components/ui/text/TextComponent"
import { SHADOW } from "@/constants/app.constants"
import { cn } from "@/helpers/cn"
import { FC, PropsWithChildren } from "react"
import { Image, TouchableOpacity, View } from "react-native"

const Button: FC<PropsWithChildren<IButton>> = ({
	isArrow,
	onPress,
	iconLeftPath,
	iconRightPath,
	className,
	children,
	...props
}) => {
	return (
		<View className={cn("flex-row justify-center", className)} {...props}>
			<TouchableOpacity
				className={`
				flex-row items-center justify-center gap-x-2
				 bg-white max-w-[300px] w-full h-[55px] rounded-3xl
				 md:flex md:w-60
				  border-[1px] border-[black]/10 shadow-[black]/10 shadow-sm md:shadow-none
				`}
				onPress={onPress}
				style={SHADOW}
			>
				{iconLeftPath && (
					<Image
						className='w-4 h-4'
						resizeMode='contain'
						source={require("@/assets/ui/unlock.png")}
					/>
				)}
				<TextComponent className='text-primary text-[20px] font-subtitle'>
					{children}
				</TextComponent>
				{isArrow && (
					<Image
						className='w-4 h-4'
						resizeMode='contain'
						source={require("@/assets/ui/arrow_orange.png")}
					/>
				)}
				{iconLeftPath && (
					<Image
						className='w-4 h-4'
						resizeMode='contain'
						source={iconRightPath}
					/>
				)}
			</TouchableOpacity>
		</View>
	)
}

export default Button
