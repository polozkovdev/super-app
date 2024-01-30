import Button from "@/components/ui/button/Button"
import Layout from "@/components/ui/layout/Layout"
import TextComponent from "@/components/ui/text/TextComponent"
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
							<TextComponent type='title'>Today</TextComponent>
						</View>
						<View className='mb-[20] w-full'>
							<TextComponent>
								Your
								<Text className='text-center text-[24px] text-secondary -tracking-widest italic font-text'>
									{" "}
									personal{" "}
								</Text>
								selection of exercises{"\n"} for different brain areas
							</TextComponent>
						</View>
						{/*game 1*/}
						<Image
							className='mb-[20] w-4/5'
							resizeMode='contain'
							source={require("@/assets/games/game_1.png")}
						/>
						<View className='mb-[4]'>
							<TextComponent
								type='title'
								className='text-[30px] text-primary font-subtitle'
							>
								Robotic Flows
							</TextComponent>
						</View>
						<View className='mb-[20]'>
							<TextComponent className='text-accent'>
								Problem solving
							</TextComponent>
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
							<TextComponent type='title' className='text-[30px] font-semibold'>
								Other game
							</TextComponent>
						</View>
						<View className='mb-[20]'>
							<TextComponent className='text-accent'>
								Other problem
							</TextComponent>
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
							<TextComponent type='title' className='text-[30px] font-semibold'>
								Other game 3
							</TextComponent>
						</View>
						<View className='mb-[20]'>
							<TextComponent className='text-accent'>
								Other problem 3
							</TextComponent>
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
