import Button from "@/components/ui/button/Button"
import Layout from "@/components/ui/layout/Layout"
import { AppConstants } from "@/constants/app.constants"
import { useSplashScreenHideProcess } from "@/hooks/useSplashScreenProcess"
import React from "react"
import { Image, ScrollView, Text, View } from "react-native"

export type ILoadingProps = {
	isLoading: boolean
	onStart: () => void
}

const Loading = ({ isLoading, onStart }: ILoadingProps) => {
	useSplashScreenHideProcess()

	return (
		<ScrollView
			style={{ width: "100%", height: "100%" }}
			contentContainerStyle={{ minHeight: "100%" }}
		>
			<Layout isHeader={false}>
				<View
					className='items-center justify-center'
					style={{
						height: "100%",
						backgroundColor: AppConstants.primaryBackground
					}}
				>
					<Image
						className='mb-[38]'
						resizeMode='cover'
						source={require("@/assets/games/logo_mini_with_text.png")}
					/>
					<Image
						className='mb-[20]'
						resizeMode='cover'
						source={require("@/assets/games/game_1.png")}
					/>
					<Image
						resizeMode='cover'
						source={require("@/assets/games/finger.png")}
					/>
					<View className='w-[220] mb-[20]'>
						<Text className='text-center text-[24px] text-primary'>
							Brain training <Text className='italic'>personalized</Text> for
							you
						</Text>
					</View>
					<View className='mb-[20]'>
						<Text className='text-center text-[35px] text-primary font-bold'>
							Stay sharp, build{"\n"} confidence, and boost{"\n"} productivity
						</Text>
					</View>
					<View className='mb-[60]'>
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
						<View className='bg-primary h-[1.5] opacity-10' />
					</View>
					<View className='w-full'>
						<Text className='leading-[65px] text-[18px] text-primary text-center'>
							Get help
						</Text>
						<View className='bg-primary h-[1.5] opacity-10' />
					</View>
					<View className='w-full'>
						<Text className='leading-[65px] text-[18px] text-primary text-center'>
							Share feedback
						</Text>
						<View className='bg-primary h-[1.5] opacity-10' />
					</View>
					<View className='w-full mb-[40]'>
						<Text className='leading-[65px] text-[18px] text-primary text-center'>
							Terms & Privacy
						</Text>
					</View>
					<Image
						className='mb-[60] w-12 h-12'
						resizeMode='cover'
						source={require("@/assets/ui/logo_mini.png")}
					/>
					<Button children='Start for free' isArrow onPress={() => onStart()} />
				</View>
			</Layout>
		</ScrollView>
	)
}

export default Loading
