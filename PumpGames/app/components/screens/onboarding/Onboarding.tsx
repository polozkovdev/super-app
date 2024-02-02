import Button from "@/components/ui/button/Button"
import Layout from "@/components/ui/layout/Layout"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants } from "@/constants/app.constants"
import { useSplashScreenHideProcess } from "@/hooks/useSplashScreenProcess"
import React from "react"
import { Image, ScrollView, View } from "react-native"

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
				<Layout isHeader={false}>
					<View
						style={{ alignItems: "center", position: "relative" }}
						className='w-full h-[100%]'
					>
						<Image
							className='mb-[38px] md:mr-auto'
							resizeMode='cover'
							source={require("@/assets/games/logo_mini_with_text.png")}
						/>
						<Image
							className='mb-[20px] w-[200px] h-[200px] md:w-[418px] md:h-[418px]'
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
							<TextComponent>
								Brain training{" "}
								<TextComponent className='italic'>personalized</TextComponent>{" "}
								for you
							</TextComponent>
						</View>
						<View className='mb-[20px]'>
							<TextComponent type='title'>
								Stay sharp, build{"\n"} confidence, and boost{"\n"} productivity
							</TextComponent>
						</View>
						<View className='mb-[60px] w-[100%] max-w-[480px] md:flex-row'>
							<TextComponent className=''>
								Train with over 30{" "}
								<TextComponent className='italic'>
									interactive games
								</TextComponent>{" "}
								specifically crafted to enhance your productivity, income
								potential, and self-assurance in areas such as reading, writing,
								speaking, memory, and mathematics.
							</TextComponent>
						</View>
						<View className='items-center w-full md:flex-row md:flex md:justify-between md:mt-auto'>
							<View className='hidden md:flex'>
								<TextComponent className='font-[20px] leading-[28px] font-subtitle'>
									© Mighty Minds
								</TextComponent>
							</View>
							<View className='flex-1 items-center w-full mb-[40px] md:mb-0 md:flex-row md:flex md:justify-center opacity-60 md:opacity-50'>
								<View className='md:mr-10'>
									<TextComponent className='leading-[65px] text-[18px] font-subtitle'>
										Trust & Safety
									</TextComponent>
									<View className='bg-primary h-[1.5px] opacity-10  md:hidden' />
								</View>
								<View className='md:mr-10'>
									<TextComponent className='leading-[65px] text-[18px] font-subtitle'>
										Get help
									</TextComponent>
									<View className='bg-primary h-[1.5px] opacity-10  md:hidden' />
								</View>
								<View className='md:mr-10'>
									<TextComponent className='leading-[65px] text-[18px] font-subtitle'>
										Share feedback
									</TextComponent>
									<View className='bg-primary h-[1.5px] opacity-10 md:hidden' />
								</View>
								<View>
									<TextComponent className='leading-[65px] text-[18px] font-subtitle'>
										Terms & Privacy
									</TextComponent>
								</View>
							</View>
							<Image
								className='mb-[60px] md:mb-0 w-[30px] h-[30px]'
								resizeMode='cover'
								source={require("@/assets/ui/logo_mini.png")}
							/>
						</View>
					</View>
					<View className='flex-1 h-[60] w-full md-hidden' />
				</Layout>
			</ScrollView>
			<View className='absolute bottom-4 left-0 right-0 shadow-[black]/10 shadow-sm md:top-4 md:right-4'>
				<Button children='Start for free' isArrow onPress={onStart} />
			</View>
		</View>
	)
}

export default Onboarding
