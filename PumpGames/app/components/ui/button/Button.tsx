import { IButton } from "@/components/ui/button/menu.interface"
import TextComponent from "@/components/ui/text/TextComponent"
import { cn } from "@/helpers/cn"
import { FC, PropsWithChildren } from "react"
import { Image, TouchableOpacity, View } from "react-native"

const Button: FC<PropsWithChildren<IButton>> = ({
	isArrow,
	onPress,
	iconLeftPath,
	className,
	children,
	...props
}) => {
	return (
		<View className={cn("flex-row justify-center", className)} {...props}>
			<TouchableOpacity
				className={`
				flex-row items-center justify-center gap-x-2
				 bg-white max-w-[340] w-full h-[55] rounded-3xl
				 md:flex md:w-60
				  border-[1px] border-[black]/10 shadow-[black]/10 shadow-sm md:shadow-none
				`}
				onPress={onPress}
			>
				{iconLeftPath && (
					<Image
						className='w-4 h-4'
						resizeMode='contain'
						source={require("@/assets/ui/unlock.png")}
					/>
				)}
				<TextComponent className='text-primary text-[18px] font-subtitle'>
					{children}
				</TextComponent>
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
