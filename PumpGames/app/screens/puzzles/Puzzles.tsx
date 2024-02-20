import GameCard from "@/components/ui/gameCard/GameCard"
import Layout from "@/components/ui/layout/Layout"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants } from "@/constants/app.constants"
import React from "react"
import { ScrollView, View } from "react-native"

const Puzzles = ({ navigation }: any) => {
	return (
		<View
			style={{
				flex: 1
			}}
		>
			<ScrollView
				style={{ flex: 1, backgroundColor: AppConstants.primaryBackground }}
				contentContainerStyle={{
					flexGrow: 1,
					position: "relative",
					justifyContent: "center",
					borderWidth: 0,
					alignItems: "center"
				}}
			>
				<Layout navigation={navigation}>
					<View
						className='items-center w-full md:pb-[100px]'
						style={{
							height: "100%"
						}}
					>
						<View className='mb-[20] w-full md:mb-[40px]'>
							<TextComponent type='title'>Puzzles</TextComponent>
						</View>
						<View className='mb-[20] w-full md:mb-[80px]'>
							<TextComponent>
								Your
								<TextComponent className='italic text-secondary opacity-80'>
									{" "}
									personal{" "}
								</TextComponent>
								selection of exercises{"\n"} for different brain areas
							</TextComponent>
						</View>
						{/* GAMES */}
						<View
							className='md:flex-row md:justify-center md:items-start'
							style={{ flex: 1 }}
						>
							<View className='items-center md:w-[300px]' style={{ flex: 1 }}>
								<GameCard
									source={require("@/assets/games/game_8.png")}
									name='Sudoku'
									route='Sudoku'
									category='Problem solving'
									navigation={navigation}
								/>
							</View>
							{/*game 1*/}
						</View>
					</View>
				</Layout>
			</ScrollView>
		</View>
	)
}
export default Puzzles
