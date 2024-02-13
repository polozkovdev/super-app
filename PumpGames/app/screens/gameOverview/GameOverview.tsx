import Levels from "@/components/features/Levels/Levels"
import Button from "@/components/ui/button/Button"
import Layout from "@/components/ui/layout/Layout"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants } from "@/constants/app.constants"
import Loading from "@/screens/loading/Loading"
import { useStore } from "@/store"
import { useEffect, useState } from "react"
import { Image, ScrollView, View } from "react-native"
import { useMediaQuery } from "react-responsive"
import { IGame } from "types"

const GameOverview = ({ navigation, ...props }: any) => {
	const { db } = useStore()
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	const [game, setGame] = useState<IGame | null>(null)
	const route = props.route.params.route
	useEffect(() => {
		const getInitialGameData = async () => {
			try {
				const gameData = await db.getGameByName(route)
				if (gameData) {
					setGame(gameData)
				}
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		getInitialGameData()
	}, [db, route])
	console.log("game", game)
	if (!game) {
		return <Loading />
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: AppConstants.primaryBackground,
				position: "relative",
				maxWidth: 1420,
				width: "100%",
				marginTop: 0,
				marginBottom: 0,
				marginLeft: "auto",
				marginRight: "auto"
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
				<Layout>
					<View
						style={{
							flex: 1
						}}
					>
						<View className={`items-center md:mb-0 md:w-[300px] mb-[50px]`}>
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
						<Levels
							steps={game.steps}
							currentStep={game.currentStep}
							initialPaidStep={game.initialPaidStep}
						/>
						{/* TITLE "BENEFITS" */}
						{/* LIST OF BENEFITS */}
						{/* HANDLERS */}
						<View className='flex-row items-center justify-center space-x-4'>
							<Button children='Swap' onPress={() => {}} />
							<Button
								children='Start'
								isArrow
								onPress={() => navigation.navigate(route)}
							/>
						</View>
					</View>
				</Layout>
			</ScrollView>
		</View>
	)
}

export default GameOverview
