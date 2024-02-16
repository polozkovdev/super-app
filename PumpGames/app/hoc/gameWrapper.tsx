import Timer from "@/components/features/Timer/Timer"
import Handler from "@/components/ui/handler/Handler"
import HeaderGame from "@/components/ui/headerGame/HeaderGame"
import Layout from "@/components/ui/layout/Layout"
import { AppConstants } from "@/constants/app.constants"
import Loading from "@/screens/loading/Loading"
import { useStore } from "@/store"
import { autorun } from "mobx"
import { useEffect, useState } from "react"
import { Image, ScrollView, View } from "react-native"
import { IGame } from "types"

const gameWrapper =
	({ Component, Name }: any) =>
	({ navigation }: any) => {
		const { db } = useStore()
		const [game, setGame] = useState<IGame | null>(null)

		useEffect(() => {
			const getInitialGameData = async () => {
				try {
					const gameData = await db.getGameByName(Name)
					gameData && setGame(gameData)
				} catch (error) {
					console.error("Error fetching data:", error)
				}
			}

			getInitialGameData()
		}, [db, Name])

		useEffect(() => {
			const disposer = autorun(() => {
				if (game) {
					setGame(game)
				}
			})

			return () => {
				disposer()
			}
		}, [game])
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
							<Component
								game={game}
								setGame={setGame}
								navigation={navigation}
							/>
						</View>
						<View className='flex-row space-x-[14px] mb-[14px] mt-[14px] justify-center'>
							<Timer game={game} setGame={setGame} />
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
