import TextComponent from "@/components/ui/text/TextComponent"
import { CATEGORIES, CATEGORIES_LIST } from "@/constants/app.constants"
import React from "react"
import { TouchableOpacity, View } from "react-native"

const GameCategories = ({ category, setCategory }: any) => {
	const onPress = (value: CATEGORIES) => {
		setCategory(value)
	}
	return (
		<View className='flex-row space-x-[10px] flex-wrap items-center justify-center shrink md:space-y-0 gap-[10px]'>
			{CATEGORIES_LIST.map(i => {
				const isActive = i === category
				return (
					<TouchableOpacity
						key={i}
						className={`${isActive ? "bg-primary" : "bg-[#3F1210]/10"} rounded-[100px] m-0 items-center flex-row justify-center px-[22px] py-[4px] md:h-[55px] `}
						onPress={() => onPress(i)}
					>
						<TextComponent
							className={`text-[18px] md:text-[20px] font-subtitle ${isActive ? "text-[#EFEBE4]" : "text-primary/40"}`}
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
