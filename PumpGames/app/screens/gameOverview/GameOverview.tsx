import Levels from "@/components/features/Levels/Levels"
import Layout from "@/components/ui/layout/Layout"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants, GAMES } from "@/constants/app.constants"
import Loading from "@/screens/loading/Loading"
import { useStore } from "@/store"
import { observer } from "mobx-react-lite"
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
				const gameData = await db.getGameByName(route)
				gameData && setGame(gameData)
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		getInitialGameData()
	}, [db, route])
	if (!game) {
		return <Loading />
	}
	console.log("game", game)
	const image = GAMES.find(i => i.route === route)?.source
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
								className='mb-[20] w-[200px] h-[200px] shadow-[black] shadow-sm rounded-[24px] border-[1px] border-accent/30'
								resizeMode='cover'
								source={image}
							/>
							<View className='mb-[10]'>
								<TextComponent
									type='title'
									className='text-[30px] text-primary md:text-[40px] md:leading-[40px]'
								>
									{game.title}
								</TextComponent>
							</View>
							<View>
								<TextComponent className='text-accent'>
									{game.categories[0]}
								</TextComponent>
							</View>
						</View>
						<Levels Game={game} navigation={navigation} />
					</View>
				</Layout>
			</ScrollView>
		</View>
	)
}

export default observer(GameOverview)
