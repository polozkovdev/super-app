import Button from "@/components/ui/button/Button"
import GameCard from "@/components/ui/gameCard/GameCard"
import Layout from "@/components/ui/layout/Layout"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants } from "@/constants/app.constants"
import React from "react"
import { Image, ScrollView, View } from "react-native"
import { useMediaQuery } from "react-responsive"

const Today = ({ navigation }: any) => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
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
					borderWidth: 0,
					alignItems: "center"
				}}
			>
				<Layout>
					<View
						className='items-center justify-center w-full md:pb-[100px]'
						style={{
							height: "100%"
						}}
					>
						<View className='mb-[20] w-full md:mb-[40px]'>
							<TextComponent type='title'>Today</TextComponent>
						</View>
						<View className='mb-[20] w-full md:mb-[80px]'>
							<TextComponent>
								Your
								<TextComponent className='italic text-secondary opacity-80'>
									{" "}
									personal{" "}
								</TextComponent>
								selection of exercises{"\n"} for different brain areas
							</TextComponent>
						</View>
						{/* GAMES */}
						<View className='md:flex-row md:justify-center md:items-start'>
							{/*game 1*/}
							<View className='items-center md:w-[300px]'>
								<GameCard
									source={require("@/assets/games/game_1.png")}
									name='Block Puzzle'
									route='BlockDocku'
									category='Problem solving'
									navigation={navigation}
								/>
								<View className='mb-[30]'>
									<View className='flex-row items-center space-x-2'>
										<Image
											className='w-5 h-5'
											resizeMode='contain'
											source={require("@/assets/ui/clock.png")}
										/>
										<TextComponent className='text-[18px] text-primary font-subtitle'>
											15 min
										</TextComponent>
									</View>
								</View>
								<Image
									className='mb-[20] md:hidden'
									resizeMode='cover'
									source={require("@/assets/ui/arrow_down.png")}
								/>
							</View>
							<View className='hidden md:flex md:mr-12 md:ml-12 md:mt-28'>
								<Image
									className='-rotate-90'
									resizeMode='cover'
									source={require("@/assets/ui/arrow_down.png")}
								/>
							</View>
							{/*	game 2*/}
							<View className='items-center md:w-[300px]'>
								<GameCard
									source={require("@/assets/games/game_2.png")}
									name='Memory'
									route='Memory'
									category='Memory'
									navigation={navigation}
								/>
								<View className='mb-[30]'>
									<View className='flex-row items-center space-x-2'>
										<Image
											className='w-5 h-5'
											resizeMode='contain'
											source={require("@/assets/ui/clock.png")}
										/>
										<TextComponent className='text-[18px] text-primary font-subtitle'>
											7 min
										</TextComponent>
									</View>
								</View>
							</View>
						</View>
						<View
							className='mt-auto shadow-[black]/10 shadow-sm'
							style={{
								display: isDesktop ? "flex" : "none"
							}}
						>
							<Button
								children='Start playing'
								isArrow
								onPress={() => navigation.navigate("Games")}
							/>
						</View>
						<View className='absolute bottom-[14px] left-0 right-0 shadow-[black]/10 shadow-sm md:hidden'>
							<Button
								children='Start playing mob'
								isArrow
								onPress={() => navigation.navigate("Games")}
							/>
						</View>
					</View>
				</Layout>
			</ScrollView>
		</View>
	)
}
export default Today
