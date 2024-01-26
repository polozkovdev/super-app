import Button from "@/components/ui/button/Button"
import Layout from "@/components/ui/layout/Layout"
import { AppConstants } from "@/constants/app.constants"
import React from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"

const Games = ({ navigation }: any) => {
	return (
		<View>
			<ScrollView
				style={{ width: "100%", height: "100%" }}
				contentContainerStyle={{
					minHeight: "100%",
					backgroundColor: AppConstants.primaryBackground
				}}
			>
				<Layout>
					<View
						className='items-center justify-center'
						style={{
							height: "100%"
						}}
					>
						<View className='mb-[20] w-full'>
							<Text className='text-center text-[35px] text-primary font-bold'>
								Games
							</Text>
						</View>
						<View className='mb-[20] w-full'>
							<Text className='text-center text-[24px] text-primary'>
								Unlock your potential with{"\n"} Mighty brain games
							</Text>
						</View>
						<View className='mb-[20] w-full'>
							<Text className='text-center text-[24px] text-primary'>
								categories list
							</Text>
						</View>
						<Image
							className='mb-[20] w-full'
							resizeMode='cover'
							source={require("@/assets/ui/free_games.png")}
						/>
						<Image
							className='mb-[20] w-4/5'
							resizeMode='contain'
							source={require("@/assets/games/game_1.png")}
						/>
						<TouchableOpacity
							className='mb-[10]'
							onPress={() => navigation.navigate("BlockDocku")}
						>
							<Text className='text-center text-[30px] text-primary font-semibold'>
								Block Puzzle Game
							</Text>
						</TouchableOpacity>
						<View className='mb-[20]'>
							<Text className='text-center text-[24px] text-accent'>
								Problem solving
							</Text>
						</View>
						<Image
							className='mb-[20] w-4/5'
							resizeMode='contain'
							source={require("@/assets/games/game_2.png")}
						/>
						<TouchableOpacity
							className='mb-[10]'
							onPress={() => navigation.navigate("BlickPuzzle")}
						>
							<Text className='text-center text-[30px] text-primary font-semibold'>
								Blick Puzzle Game
							</Text>
						</TouchableOpacity>
						<View className='mb-[20]'>
							<Text className='text-center text-[24px] text-accent'>
								Other problem
							</Text>
						</View>
					</View>
				</Layout>
			</ScrollView>
			<View className='absolute bottom-4'>
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
