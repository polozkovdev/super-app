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
		<View className='md:flex-row flex-wrap items-stretch justify-center mb-[140px] md:items-start gap-[60px]'>
			{filteredGames.length > 0 ? (
				filteredGames.map(
					({ name, categories, source, route, description }, index) => {
						return (
							<TouchableOpacity
								key={name}
								className={`items-center md:mb-0 md:w-[300px]`}
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
										className='text-[30px] text-primary font-subtitle md:text-[40px] md:leading-[40px]'
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
