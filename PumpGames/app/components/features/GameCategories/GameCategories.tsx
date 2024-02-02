import TextComponent from "@/components/ui/text/TextComponent"
import { CATEGORIES, CATEGORIES_LIST } from "@/constants/app.constants"
import React from "react"
import { TouchableOpacity, View } from "react-native"

const GameCategories = ({ category, setCategory }: any) => {
	const onPress = (value: CATEGORIES) => {
		setCategory(value)
	}
	return (
		<View className='flex-row space-x-2 space-y-2 flex-wrap items-center justify-center'>
			{CATEGORIES_LIST.map(i => {
				const isActive = i === category
				return (
					<TouchableOpacity
						key={i}
						className={`pt-1 pb-1 pl-4 pr-4 ${isActive ? "bg-primary" : "bg-[#3F1210]/10"} rounded-full`}
						onPress={() => onPress(i)}
					>
						<TextComponent
							className={`text-[18px] font-subtitle ${isActive ? "text-[#EFEBE4]" : "text-primary/40"}`}
						>
							{i}
						</TextComponent>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

export default GameCategories
