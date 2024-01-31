import Button from "@/components/ui/button/Button"
import Layout from "@/components/ui/layout/Layout"
import { AppConstants } from "@/constants/app.constants"
import { useSplashScreenHideProcess } from "@/hooks/useSplashScreenProcess"
import React from "react"
import { Image, ScrollView, Text, View } from "react-native"

export type IOnboardingProps = {
	onStart: () => void
}

const Onboarding = ({ onStart }: IOnboardingProps) => {
	useSplashScreenHideProcess()
	const images = [
		require("@/assets/games/game_1.png"),
		require("@/assets/games/game_2.png"),
		require("@/assets/games/game_3.png"),
		require("@/assets/games/game_4.png"),
		require("@/assets/games/game_5.png"),
		require("@/assets/games/game_6.png"),
		require("@/assets/games/game_7.png"),
		require("@/assets/games/game_8.png"),
		require("@/assets/games/game_9.png"),
		require("@/assets/games/game_6.png")
	]
	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: AppConstants.primaryBackground }}
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Layout isHeader={false}>
				<View style={{ alignItems: "center" }}>
					<Image
						className='mb-[38px]'
						resizeMode='cover'
						source={require("@/assets/games/logo_mini_with_text.png")}
					/>
					<Image
						className='mb-[20px]'
						resizeMode='cover'
						source={require("@/assets/games/game_1.png")}
					/>
					{/*<View style={{ flex: 1, height: 300 }}>*/}
					{/*	<ImageSlider images={images} />*/}
					{/*</View>*/}
					<Image
						resizeMode='cover'
						source={require("@/assets/games/finger.png")}
					/>
					<View className='w-[220px] mb-[20px]'>
						<Text className='text-center text-[24px] text-primary'>
							Brain training <Text className='italic'>personalized</Text> for
							you
						</Text>
					</View>
					<View className='mb-[20px]'>
						<Text className='text-center text-[35px] text-primary font-bold'>
							Stay sharp, build{"\n"} confidence, and boost{"\n"} productivity
						</Text>
					</View>
					<View className='mb-[60px]'>
						<Text className='text-center text-[24px] text-secondary'>
							Train with over 30{" "}
							<Text className='italic'>interactive games</Text> specifically
							crafted to enhance your productivity, income potential, and
							self-assurance in areas such as reading, writing, speaking,
							memory, and mathematics.
						</Text>
					</View>
					<View className='w-full'>
						<Text className='leading-[65px] text-[18px] text-primary text-center'>
							Trust & Safety
						</Text>
						<View className='bg-primary h-[1.5px] opacity-10' />
					</View>
					<View className='w-full'>
						<Text className='leading-[65px] text-[18px] text-primary text-center'>
							Get help
						</Text>
						<View className='bg-primary h-[1.5px] opacity-10' />
					</View>
					<View className='w-full'>
						<Text className='leading-[65px] text-[18px] text-primary text-center'>
							Share feedback
						</Text>
						<View className='bg-primary h-[1.5px] opacity-10' />
					</View>
					<View className='w-full mb-[40px]'>
						<Text className='leading-[65px] text-[18px] text-primary text-center'>
							Terms & Privacy
						</Text>
					</View>
					<Image
						className='mb-[60px] w-12 h-12'
						resizeMode='cover'
						source={require("@/assets/ui/logo_mini.png")}
					/>
					<Button children='Start for free' isArrow onPress={onStart} />
				</View>
			</Layout>
		</ScrollView>
	)
}

export default Onboarding
