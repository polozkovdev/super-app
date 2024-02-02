import TextComponent from "@/components/ui/text/TextComponent"
import { CATEGORIES_LIST } from "@/constants/app.constants"
import React, { useState } from "react"
import { TouchableOpacity, View } from "react-native"

const GamesList = () => {
	const [isActive, setIsActive] = useState(CATEGORIES_LIST[0])
	const onPress = (value: string) => {
		setIsActive(value)
	}
	return (
		<View className='flex-row space-x-2 space-y-2 flex-wrap items-center justify-center'>
			{CATEGORIES_LIST.map(i => {
				const isActiveItem = i === isActive
				return (
					<TouchableOpacity
						key={i}
						className={`pt-1 pb-1 pl-4 pr-4 ${isActiveItem ? "bg-primary" : "bg-[#3F1210]/10"} rounded-full`}
						onPress={() => onPress(i)}
					>
						<TextComponent
							className={`text-[18px] font-subtitle ${isActiveItem ? "text-[#EFEBE4]" : "text-primary/40"}`}
						>
							{i}
						</TextComponent>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

export default GamesList
