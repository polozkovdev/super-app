import GamesList from "@/components/features/gamesList/GamesList"
import Button from "@/components/ui/button/Button"
import Layout from "@/components/ui/layout/Layout"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants } from "@/constants/app.constants"
import React from "react"
import { Image, ScrollView, TouchableOpacity, View } from "react-native"

const Games = ({ navigation }: any) => {
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
						className='items-center justify-center w-full'
						style={{
							height: "100%"
						}}
					>
						<View className='mb-[20] w-full'>
							<TextComponent type='title'>Games</TextComponent>
						</View>
						<View className='mb-[20] w-full'>
							<TextComponent>
								Unlock your potential with{"\n"} Mighty brain games
							</TextComponent>
						</View>
						<View className='mb-[50px] w-full'>
							<GamesList />
						</View>
						<View className='flex-row space-x-2 items-center justify-center w-full max-w-[100%] overflow-hidden mb-[50px]'>
							<View className='h-[2px] w-full bg-[#3F1210]/10' />
							<View
								className={`pt-1 pb-1 pl-4 pr-4 border-[#3F1210]/10 border-[1px] rounded-full`}
							>
								<TextComponent
									className={`text-[18px] font-subtitle text-primary`}
								>
									Free games
								</TextComponent>
							</View>
							<View className='h-[2px] w-full bg-[#3F1210]/10' />
						</View>
						<Image
							className='mb-[20] w-[200px] h-[200px]'
							resizeMode='contain'
							source={require("@/assets/games/game_1.png")}
						/>
						<TouchableOpacity
							className='mb-[10]'
							onPress={() => navigation.navigate("BlockDocku")}
						>
							<TextComponent className='text-[30px] text-primary font-semibold md:text-[40px]'>
								Block Puzzle Game
							</TextComponent>
						</TouchableOpacity>
						<View className='mb-[60]'>
							<TextComponent className='text-accent'>
								Problem solving
							</TextComponent>
						</View>
						<Image
							className='mb-[20] w-[200px] h-[200px]'
							resizeMode='contain'
							source={require("@/assets/games/game_2.png")}
						/>
						<TouchableOpacity
							className='mb-[10]'
							onPress={() => navigation.navigate("Memory")}
						>
							<TextComponent className='text-[30px] text-primary font-semibold md:text-[40px]'>
								Word Search
							</TextComponent>
						</TouchableOpacity>
						<View className='mb-[20]'>
							<TextComponent className='text-accent'>Memory</TextComponent>
						</View>
						<View className='flex-1 h-[60] w-full' />
					</View>
				</Layout>
			</ScrollView>
			<View className='absolute bottom-4 left-0 right-0 shadow-[black]/10 shadow-sm'>
				<Button
					children='Start playing'
					iconLeftPath='@/assets/ui/unlock.png'
					onPress={() => alert("unlock")}
				/>
			</View>
		</View>
	)
}
export default Games
