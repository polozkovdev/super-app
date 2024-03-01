import TextComponent from "@/components/ui/text/TextComponent"
import { GAMES } from "@/constants/app.constants"
import { coreStore } from "@/store"
import React, { useEffect, useState } from "react"
import {
	Image,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View
} from "react-native"

const GameList = ({ navigation, category, time }: any) => {
	const [filteredGames, setFilteredGames] = useState(GAMES)
	const [hoveredGame, setHoveredGame] = useState<string | null>(null)
	useEffect(() => {
		setFilteredGames(GAMES.filter(i => i.categories.some(c => c === category)))
	}, [category])
	const handleMouseEnter = (name: string) => {
		setHoveredGame(name)
	}

	const handleMouseLeave = () => {
		setHoveredGame(null)
	}
	return (
		<View className='md:flex-row flex-wrap items-stretch justify-center mb-[140px] md:items-start gap-[60px]'>
			{filteredGames.length > 0 ? (
				filteredGames.map(
					({ name, categories, source, route, description }, index) => {
						const isHovered = hoveredGame === name
						const touchableProps =
							Platform.OS === "web"
								? {
										onMouseEnter: () => handleMouseEnter(name),
										onMouseLeave: handleMouseLeave
									}
								: {}
						return (
							<TouchableOpacity
								key={name}
								className={`items-center md:mb-0 md:w-[300px]`}
								{...touchableProps}
								onPress={() => {
									coreStore.updatePreviousRoute("Games")
									navigation.navigate("GameOverview", { route })
								}}
							>
								<Image
									className='mb-[20] w-[200px] h-[200px] shadow-[black] shadow-sm rounded-[24px] border-[1px] border-accent/30'
									resizeMode='cover'
									style={[styles.image, isHovered && styles.imageHovered]}
									source={source}
								/>
								<View className='mb-[10]'>
									<TextComponent
										type='title'
										className='text-[30px] text-primary md:text-[40px] md:leading-[40px] hover:text-accent'
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
					No games were found{"\n"} that fit this category
				</TextComponent>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		marginBottom: 20,
		padding: 6,
		width: 200,
		height: 200,
		...Platform.select({
			web: {
				shadowColor: "#000",
				shadowOpacity: 0.1,
				shadowOffset: {
					width: 0,
					height: 2
				},
				shadowRadius: 3
			},
			default: {
				elevation: 4
			}
		})
	},
	imageHovered: {
		shadowColor: "rgba(0,0,0.1)" // Customize shadow color when hovered
	}
})

export default GameList
