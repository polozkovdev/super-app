import Timer from "@/components/features/Timer/Timer"
import Loading from "@/components/screens/loading/Loading"
import Handler from "@/components/ui/handler/Handler"
import HeaderGame from "@/components/ui/headerGame/HeaderGame"
import Layout from "@/components/ui/layout/Layout"
import { useStore } from "@/store"
import { autorun } from "mobx"
import { useEffect, useState } from "react"
import { Image, View } from "react-native"
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
			<View style={{ flex: 1 }}>
				<Layout isHeader={false}>
					<View style={{ flex: 1 }}>
						<HeaderGame currentData={game} />
						<Component game={game} setGame={setGame} navigation={navigation} />
					</View>
					<View className='flex-row space-x-[14px]'>
						<Timer />
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
			</View>
		)
	}

export default gameWrapper
