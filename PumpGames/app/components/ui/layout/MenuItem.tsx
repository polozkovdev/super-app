import { IMenuInterface, TypeNav } from "@/components/ui/layout/menu.interface"
import { AppConstants } from "@/constants/app.constants"
import { AntDesign } from "@expo/vector-icons"
import React from "react"
import { Pressable, Text, View } from "react-native"

interface IMenuItemProps {
	item: IMenuInterface
	nav: TypeNav
	currentRoute?: string
}

const MenuItem = ({ item, nav, currentRoute }: IMenuItemProps) => {
	const isActive = currentRoute === item.path
	return (
		<Pressable
			style={{
				width: "20%"
			}}
			onPress={() => nav(item.path)}
		>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					gap: 4
				}}
			>
				<AntDesign
					name={item.iconName}
					size={26}
					color={isActive ? AppConstants.orange : AppConstants.secondary}
				/>
				<Text>{item.text}</Text>
			</View>
		</Pressable>
	)
}

export default MenuItem
