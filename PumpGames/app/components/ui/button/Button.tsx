import TextComponent from "@/components/ui/text/TextComponent"
import { SHADOW } from "@/constants/app.constants"
import { cn } from "@/helpers/cn"
import { FC, PropsWithChildren } from "react"
import { Image, TouchableOpacity, View, ViewProps } from "react-native"

interface IButton extends ViewProps {
	size?: "md" | "sm"
	className?: string
	isArrow?: boolean
	iconLeftPath?: string
	iconRightPath?: any
	styleButton?: any
	icon?: {
		path: string
		position: "left" | "right"
	}
	onPress: () => void
}

const Button: FC<PropsWithChildren<IButton>> = ({
	isArrow,
	onPress,
	iconLeftPath,
	iconRightPath,
	className,
	children,
	styleButton,
	...props
}) => {
	return (
		<View className={cn("flex-row justify-center", className)} {...props}>
			<TouchableOpacity
				className={`
				flex-row items-center justify-center gap-x-2 inline-flex
				 bg-white h-[55px] rounded-3xl
				 px-[20px] md:min-w-[60px]
				 md:flex md:max-w-[300px]
				  border-[1px] border-[black]/10 shadow-[black]/10 shadow-sm md:shadow-none
				`}
				onPress={onPress}
				style={{ ...SHADOW, ...styleButton }}
			>
				{iconLeftPath && (
					<Image
						className='w-[28px]] h-[26px]'
						resizeMode='contain'
						source={require("@/assets/ui/unlock.png")}
					/>
				)}
				<TextComponent
					className='text-primary text-[20px] font-subtitle whitespace-nowrap'
					numberOfLines={1}
				>
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
