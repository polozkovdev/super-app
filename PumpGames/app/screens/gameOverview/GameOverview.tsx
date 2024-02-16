import Levels from "@/components/features/Levels/Levels"
import Layout from "@/components/ui/layout/Layout"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants } from "@/constants/app.constants"
import Loading from "@/screens/loading/Loading"
import { useStore } from "@/store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Image, ScrollView, View } from "react-native"
import { IGame } from "types"

const GameOverview = ({ navigation, ...props }: any) => {
	const { db } = useStore()
	const [game, setGame] = useState<IGame | null>(null)
	const route = props.route.params.route
	useEffect(() => {
		const getInitialGameData = async () => {
			try {
				let gamesData = await AsyncStorage.getItem("app")
				if (gamesData) {
					const game = JSON.parse(gamesData).find(
						(i: IGame) => i.route === route
					)
					setGame(game)
				}
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		getInitialGameData()
	}, [db, route])
	if (!game) {
		return <Loading />
	}
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
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<Layout navigation={navigation}>
					<View
						className='my-[16px]'
						style={{
							flex: 1,
							alignItems: "center"
						}}
					>
						<View
							className={`flex-1 items-center md:mb-0 md:w-[300px] mb-[50px]`}
						>
							<Image
								className='mb-[20] w-[200px] h-[200px]'
								resizeMode='contain'
								source={require("@/assets/games/game_9.png")}
							/>
							<View className='mb-[10]'>
								<TextComponent
									type='title'
									className='text-[30px] text-primary md:text-[40px] md:leading-[40px]'
								>
									{game.name}
								</TextComponent>
							</View>
							<View>
								<TextComponent className='text-accent'>
									{game.categories[0]}
								</TextComponent>
							</View>
						</View>
						<Levels Game={game} navigation={navigation} />
						{/*<Benefits Game={game} />*/}
						{/*		<View className='flex-row items-center justify-center space-x-[20px] mt-[30px] md:space-x-[40px] mb-[20px] w-full'>*/}
						{/*			<TouchableOpacity*/}
						{/*				className={`*/}
						{/*				w-[150px] bg-primary/10*/}
						{/*flex-row items-center justify-center gap-x-2*/}
						{/* max-w-[340px] h-[55px] rounded-3xl*/}
						{/* md:flex md:w-full*/}
						{/*`}*/}
						{/*				onPress={() => {}}*/}
						{/*				style={SHADOW}*/}
						{/*			>*/}
						{/*				<TextComponent className='text-primary text-[20px] font-subtitle'>*/}
						{/*					Swap*/}
						{/*				</TextComponent>*/}
						{/*				<Image*/}
						{/*					className='w-4 h-4'*/}
						{/*					resizeMode='contain'*/}
						{/*					source={require("@/assets/ui/swap.png")}*/}
						{/*				/>*/}
						{/*			</TouchableOpacity>*/}
						{/*			<TouchableOpacity*/}
						{/*				style={SHADOW}*/}
						{/*				className={`*/}
						{/*				w-[150px] bg-white flex-row items-center justify-center gap-x-2*/}
						{/* max-w-[340px] h-[55px] rounded-3xl*/}
						{/* md:flex md:w-full*/}
						{/*`}*/}
						{/*				onPress={() => navigation.navigate(route)}*/}
						{/*			>*/}
						{/*				<TextComponent className='text-primary text-[20px] font-subtitle'>*/}
						{/*					Start*/}
						{/*				</TextComponent>*/}
						{/*				<Image*/}
						{/*					className='w-4 h-4'*/}
						{/*					resizeMode='contain'*/}
						{/*					source={require("@/assets/ui/arrow_orange.png")}*/}
						{/*				/>*/}
						{/*			</TouchableOpacity>*/}
						{/*		</View>*/}
					</View>
				</Layout>
			</ScrollView>
		</View>
	)
}

export default GameOverview
