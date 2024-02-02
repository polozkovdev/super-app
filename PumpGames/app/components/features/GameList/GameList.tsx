import TextComponent from "@/components/ui/text/TextComponent"
import { GAMES } from "@/constants/app.constants"
import React, { useEffect, useState } from "react"
import { Image, TouchableOpacity, View } from "react-native"

const GameList = ({ navigation, category }: any) => {
	const [filteredGames, setFilteredGames] = useState(GAMES)
	useEffect(() => {
		setFilteredGames(GAMES.filter(i => i.categories.some(c => c === category)))
	}, [category])
	return (
		<View className='flex-row flex-wrap items-center justify-center mb-[140px]'>
			{filteredGames.length > 0 ? (
				filteredGames.map(
					({ name, categories, source, route, description }, index) => {
						return (
							<TouchableOpacity
								key={name}
								className={`${index + 1 !== filteredGames.length && "mb-[60px]"} items-center`}
								onPress={() => navigation.navigate(route)}
							>
								<Image
									className='mb-[20] w-[200px] h-[200px]'
									resizeMode='contain'
									source={source}
								/>
								<View className='mb-[10]'>
									<TextComponent
										type='title'
										className='text-[30px] text-primary font-subtitle md:text-[40px]'
									>
										{name}
									</TextComponent>
								</View>
								<View>
									<TextComponent className='text-accent'>
										{description}
									</TextComponent>
								</View>
							</TouchableOpacity>
						)
					}
				)
			) : (
				<TextComponent type='title'>
					No games were found that fit this category
				</TextComponent>
			)}
		</View>
	)
}

export default GameList
