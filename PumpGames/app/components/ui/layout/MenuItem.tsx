import { IMenuInterface, TypeNav } from "@/components/ui/layout/menu.interface"
import { AppConstants } from "@/constants/app.constants"
import React from "react"
import { Pressable, Text, View } from "react-native"
import Svg, { Path } from "react-native-svg"

interface IMenuItemProps {
	item: IMenuInterface
	nav: TypeNav
	currentRoute?: string
}

const MenuItem = ({ item, nav, currentRoute }: IMenuItemProps) => {
	const isActive = currentRoute === item.path
	return (
		<Pressable onPress={() => nav(item.path)}>
			<View className='items-center justify-center gap-2'>
				<Svg
					width={item.icon.width}
					height={item.icon.height}
					viewBox={item.icon.viewBox}
					fill={isActive ? AppConstants.orange : AppConstants.secondary}
				>
					<Path d={item.icon.path} />
				</Svg>
				<Text className={isActive ? "text-orange" : "text-secondary"}>
					{item.text}
				</Text>
			</View>
		</Pressable>
	)
}

export default MenuItem
