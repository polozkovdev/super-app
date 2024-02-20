import Timer from "@/components/features/Timer/Timer"
import Handler from "@/components/ui/handler/Handler"
import HeaderGame from "@/components/ui/headerGame/HeaderGame"
import Layout from "@/components/ui/layout/Layout"
import {
	AppConstants,
	generateSymbolSearchData
} from "@/constants/app.constants"
import Loading from "@/screens/loading/Loading"
import { coreStore, useStore } from "@/store"
import { useEffect, useState } from "react"
import { Image, ScrollView, View } from "react-native"
import { IGame } from "types"

const gameWrapper =
	({ Component, Name }: any) =>
	({ navigation }: any) => {
		const { db } = useStore()
		const [game, setGame] = useState<IGame | null>(null)
		const [gameData, setGameData] = useState<{
			symbols: string[]
			gameCardsQTY: number
			pairsCount: number
			repeatCount: number
		}>(generateSymbolSearchData(game?.currentStep ?? 1))
		const [timerStart, setTimerStart] = useState(false)
		const updateGame = (props: any) => {
			const currentStep = (game?.currentStep ?? 1) + 1
			const updatedGame = { ...game, currentStep, ...props }
			if (game) {
				coreStore.db.updateGame(updatedGame as IGame)
				setGame(updatedGame)
				if (game.name === "SymbolSearch") {
					const updatedData = generateSymbolSearchData(currentStep)
					setTimerStart(false)
					setGameData(updatedData)
				}
			}
		}
		useEffect(() => {
			const getInitialGameData = async () => {
				try {
					const gameData = await db.getGameByName(Name)
					const player = await db.getPlayer()
					gameData && setGame(gameData)
				} catch (error) {
					console.error("Error fetching data:", error)
				}
			}

			getInitialGameData()
		}, [db, Name])
		if (!game) {
			return <Loading />
		}
		return (
			<View style={{ flex: 1, width: "100%" }}>
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
					<Layout isHeader={false} navigation={navigation}>
						<View style={{ flex: 1 }}>
							<HeaderGame navigation={navigation} currentData={game} />
							{game.name === "Sudoku" ? (
								<Component
									game={game}
									timerStart={timerStart}
									updateGame={updateGame}
									setTimerStart={setTimerStart}
									navigation={navigation}
								/>
							) : (
								<Component
									game={game}
									timerStart={timerStart}
									symbols={gameData.symbols}
									gameCardsQTY={gameData.gameCardsQTY}
									updateGame={updateGame}
									setTimerStart={setTimerStart}
									navigation={navigation}
								/>
							)}
						</View>
						<View className='flex-row space-x-[14px] mb-[14px] mt-[14px] justify-center'>
							{game && (
								<Timer
									game={game}
									updateGame={updateGame}
									timerStart={timerStart}
								/>
							)}
							<Handler>
								<Image
									className={`w-6 h-6`}
									resizeMode='contain'
									source={require("@/assets/ui/back.png")}
								/>
							</Handler>
							<Handler>
								<Image
									className={`w-6 h-6`}
									resizeMode='contain'
									source={require("@/assets/ui/union.png")}
								/>
							</Handler>
						</View>
					</Layout>
				</ScrollView>
			</View>
		)
	}

export default gameWrapper
