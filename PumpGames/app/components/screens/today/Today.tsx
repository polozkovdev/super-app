import Button from "@/components/ui/button/Button"
import Layout from "@/components/ui/layout/Layout"
import { AppConstants } from "@/constants/app.constants"
import React from "react"
import { Image, ScrollView, Text, View } from "react-native"

const Today = ({ navigation }: any) => {
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
								Today
							</Text>
						</View>
						<View className='mb-[20] w-full'>
							<Text className='text-center text-[24px] text-primary'>
								Your <Text className='italic'>personal</Text> selection of
								exercises{"\n"} for different brain areas
							</Text>
						</View>
						{/*game 1*/}
						<Image
							className='mb-[20] w-4/5'
							resizeMode='contain'
							source={require("@/assets/games/game_1.png")}
						/>
						<View className='mb-[10]'>
							<Text className='text-center text-[30px] text-primary font-semibold'>
								Robotic Flows
							</Text>
						</View>
						<View className='mb-[20]'>
							<Text className='text-center text-[24px] text-accent'>
								Problem solving
							</Text>
						</View>
						<Image
							className='mb-[30]'
							resizeMode='cover'
							source={require("@/assets/ui/3min.png")}
						/>
						<Image
							className='mb-[20]'
							resizeMode='cover'
							source={require("@/assets/ui/arrow_down.png")}
						/>
						{/*	game 2*/}
						<Image
							className='mb-[20] w-4/5'
							resizeMode='contain'
							source={require("@/assets/games/game_2.png")}
						/>
						<View className='mb-[10]'>
							<Text className='text-center text-[30px] text-primary font-semibold'>
								Other game
							</Text>
						</View>
						<View className='mb-[20]'>
							<Text className='text-center text-[24px] text-accent'>
								Other problem
							</Text>
						</View>
						<Image
							className='mb-[30]'
							resizeMode='cover'
							source={require("@/assets/ui/3min.png")}
						/>
						<Image
							className='mb-[20]'
							resizeMode='cover'
							source={require("@/assets/ui/arrow_down.png")}
						/>
						{/*	game 2*/}
						<Image
							className='mb-[20] w-4/5'
							resizeMode='contain'
							source={require("@/assets/games/game_3.png")}
						/>
						<View className='mb-[10]'>
							<Text className='text-center text-[30px] text-primary font-semibold'>
								Other game 3
							</Text>
						</View>
						<View className='mb-[20]'>
							<Text className='text-center text-[24px] text-accent'>
								Other problem 3
							</Text>
						</View>
						<Image
							className='mb-[30]'
							resizeMode='cover'
							source={require("@/assets/ui/3min.png")}
						/>
						<View className='flex-1 h-[50] w-full' />
					</View>
				</Layout>
			</ScrollView>
			<View className='absolute bottom-4'>
				<Button
					children='Start playing'
					isArrow
					onPress={() => navigation.navigate("Games")}
				/>
			</View>
		</View>
	)
}
export default Today
