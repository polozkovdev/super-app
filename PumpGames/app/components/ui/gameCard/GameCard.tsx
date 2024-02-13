import TextComponent from "@/components/ui/text/TextComponent"
import React from "react"
import { Image, TouchableOpacity, View } from "react-native"

interface IGameCardProps {
	source: any
	name: string
	category: string
	route: string
	navigation: any
	isOverview?: boolean
}

const GameCard = ({
	source,
	name,
	category,
	route,
	navigation,
	isOverview = true
}: IGameCardProps) => {
	return (
		<TouchableOpacity
			style={{
				flex: 1
			}}
			onPress={() =>
				isOverview
					? navigation.navigate("GameOverview", { route })
					: navigation.navigate(route)
			}
		>
			<Image
				className='mb-[20] w-[200px] h-[200px]'
				resizeMode='contain'
				source={source}
			/>
			<View className='mb-[4]'>
				<TextComponent
					type='title'
					className='text-[30px] text-primary md:text-[40px]'
				>
					{name}
				</TextComponent>
			</View>
			<View>
				<TextComponent className='text-accent'>{category}</TextComponent>
			</View>
		</TouchableOpacity>
	)
}

export default GameCard
