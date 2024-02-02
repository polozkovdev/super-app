import Button from "@/components/ui/button/Button"
import Layout from "@/components/ui/layout/Layout"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants } from "@/constants/app.constants"
import React from "react"
import { Image, ScrollView, View } from "react-native"

const Today = ({ navigation }: any) => {
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
					<View style={{ alignItems: "center" }}>
						<View className='mb-[20] w-full'>
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
						<View className='md:flex-row md:justify-center md:items-center'>
							{/*game 1*/}
							<View className='items-center md:w-[300px]'>
								<Image
									className='mb-[20] w-[200px] h-[200px]'
									resizeMode='contain'
									source={require("@/assets/games/game_1.png")}
								/>
								<View className='mb-[4]'>
									<TextComponent
										type='title'
										className='text-[30px] text-primary font-subtitle md:text-[40px]'
									>
										Block Puzzle Game
									</TextComponent>
								</View>
								<View className='mb-[20]'>
									<TextComponent className='text-accent'>
										Problem solving
									</TextComponent>
								</View>
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
								<Image
									className='mb-[20] w-[200px] h-[200px]'
									resizeMode='contain'
									source={require("@/assets/games/game_2.png")}
								/>
								<View className='mb-[10]'>
									<TextComponent
										type='title'
										className='text-[30px] font-semibold md:text-[40px]'
									>
										Memory
									</TextComponent>
								</View>
								<View className='mb-[20]'>
									<TextComponent className='text-accent'>
										Other problem
									</TextComponent>
								</View>
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
						<View className='flex-1 h-[60] w-full' />
					</View>
				</Layout>
			</ScrollView>
			<View className='absolute bottom-4 left-0 right-0 shadow-[black]/10 shadow-sm'>
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
