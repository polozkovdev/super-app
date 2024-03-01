import Slider from "@/components/features/Sliders/Circular/CursuralSlider"
import Button from "@/components/ui/button/Button"
import Footer from "@/components/ui/footer/Footer"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants } from "@/constants/app.constants"
import { useSplashScreenHideProcess } from "@/hooks/useSplashScreenProcess"
import React from "react"
import { Image, ScrollView, View } from "react-native"
import { useMediaQuery } from "react-responsive"

export type IOnboardingProps = {
	onStart: () => void
}

const Onboarding = ({ onStart }: IOnboardingProps) => {
	useSplashScreenHideProcess()
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
					position: "relative",
					alignItems: "center"
				}}
			>
				<View
					className='p-0 max-w-[1420px] relative mx-auto px-[12px]'
					style={{
						flex: 1,
						alignItems: "center",
						width: "100%"
					}}
				>
					<View
						style={{
							alignItems: "center",
							position: "relative"
						}}
						className='w-full h-[100%] max-w-[1420px]'
					>
						{isDesktop ? (
							<Image
								className='mt-[20px] mb-[40px]'
								resizeMode='contain'
								style={{ width: 292, height: 40 }}
								source={require("@/assets/games/logo_mini_with_text.png")}
							/>
						) : (
							<Image
								className='md:mr-auto mt-[20px]'
								resizeMode='contain'
								style={{ width: 292, height: 40 }}
								source={require("@/assets/games/logo_mini_with_text.png")}
							/>
						)}
						{isDesktop ? (
							<View
								style={{
									marginBottom: 40,
									flex: 1
								}}
							>
								<Image
									resizeMode='cover'
									className='w-[320px] h-[320px] shadow-[black] shadow-sm rounded-[24px] border-[1px] border-accent/30'
									source={require("@/assets/ui/blick.png")}
								/>
							</View>
						) : (
							<View className='relative w-full'>
								<Slider />
							</View>
						)}
						{isDesktop && (
							<View className='mt-[20px] mb-[20px]'>
								<Button
									children='Start for free'
									isArrow
									styleButton={{
										width: 240
									}}
									onPress={onStart}
									className='md:ml-auto'
								/>
							</View>
						)}
						<Image
							resizeMode='cover'
							source={require("@/assets/games/finger.png")}
						/>
						<View className='w-[220px] mb-[40px]'>
							<TextComponent>
								Brain training{" "}
								<TextComponent className='italic'>personalized</TextComponent>{" "}
								for you
							</TextComponent>
						</View>
						{!isDesktop && (
							<View className='shadow-[black]/10 shadow-sm mb-[60px]'>
								<Button
									children='Start for free'
									isArrow
									styleButton={{
										width: 240
									}}
									onPress={onStart}
									className='md:ml-auto'
								/>
							</View>
						)}
						<View className='mb-[20px]'>
							<TextComponent type='title'>
								Stay sharp, build{"\n"} confidence, and boost{"\n"} productivity
							</TextComponent>
						</View>
						<View className='mb-[30px] w-[100%] max-w-[480px] md:flex-row'>
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
				</View>
			</ScrollView>
		</View>
	)
}

export default Onboarding
