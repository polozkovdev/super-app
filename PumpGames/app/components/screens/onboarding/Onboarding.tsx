import Button from "@/components/ui/button/Button"
import Footer from "@/components/ui/footer/Footer"
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
					borderWidth: 0,
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
						<Footer />
					</View>
					<View className='flex-1 h-[60] w-full md-hidden' />
				</Layout>
			</ScrollView>
			<View className='absolute bottom-4 left-0 right-0 shadow-[black]/10 shadow-sm md:top-4 md:right-4'>
				<Button
					children='Start for free'
					isArrow
					onPress={onStart}
					className=' md:ml-auto'
				/>
			</View>
		</View>
	)
}

export default Onboarding
