import Button from "@/components/ui/button/Button"
import { AppConstants } from "@/constants/app.constants"
import { useSplashScreenHideProcess } from "@/hooks/useSplashScreenProcess"
import React from "react"
import { Image, View } from "react-native"

export type ILoadingProps = {
	isLoading: boolean
	onStart: () => void
}

const Loading = ({ isLoading, onStart }: ILoadingProps) => {
	useSplashScreenHideProcess()

	return (
		<View className='flex-1 items-center justify-center'>
			<Image
				className='w-18 h-18 justify-center'
				resizeMode='cover'
				source={require("@/assets/ui/logo_mini.png")}
				style={{
					backgroundColor: AppConstants.primaryBackground
				}}
			/>
			<View className='mt-12'>
				<Button children='Start playing' onPress={() => onStart()} />
			</View>
		</View>
	)
}

export default Loading
