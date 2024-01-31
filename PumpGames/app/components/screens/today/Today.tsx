import Button from "@/components/ui/button/Button"
import Layout from "@/components/ui/layout/Layout"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants } from "@/constants/app.constants"
import React from "react"
import { Image, ScrollView, View } from "react-native"

const Today = ({ navigation }: any) => {
	return (
		<View style={{ flex: 1, backgroundColor: AppConstants.primaryBackground }}>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<Layout>
					<View style={{ alignItems: "center" }}>
						<View className='mb-[20] w-full'>
							<TextComponent type='title'>Today</TextComponent>
						</View>
						<View className='mb-[20] w-full'>
							<TextComponent>
								Your
								<TextComponent className='italic text-secondary'>
									{" "}
									personal{" "}
								</TextComponent>
								selection of exercises{"\n"} for different brain areas
							</TextComponent>
						</View>
						{/*game 1*/}
						<Image
							className='mb-[20] w-[200px] h-[200px]'
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
							className='mb-[20] w-[200px] h-[200px]'
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
							className='mb-[20] w-[200px] h-[200px]'
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
