import React from "react"
import { Image, Text, View } from "react-native"

const Header = () => {
	return (
		<View className='flex-row justify-between items-center mb-[48px] w-full px-[16px] my-[16px]'>
			<View className='h-full'>
				<Image
					className='w-8 h-8'
					resizeMode='cover'
					source={require("@/assets/ui/logo_mini.png")}
				/>
			</View>
			<View className='flex-row items-center justify-center h-8 gap-3'>
				<View className='flex-row rounded-full items-center justify-center px-3 self-center bg-[#FF6400]/10 h-full'>
					<Image
						className='w-4 h-4 mr-1'
						resizeMode='contain'
						source={require("@/assets/ui/fire.png")}
					/>
					<Text className='text-primary text-center'>2</Text>
				</View>
				<View className='bg-white rounded-full w-8 h-8 items-center justify-center shadow-[black]/10 shadow-sm mr-4'>
					<Image
						className='w-5 h-5 '
						resizeMode='contain'
						source={require("@/assets/ui/bell.png")}
					/>
				</View>
				<View className='flex-1 items-center justify-center w-8 h-8 mr-4'>
					<Image
						className='w-[30] h-[30]'
						resizeMode='contain'
						source={require("@/assets/ui/Start.png")}
					/>
				</View>
			</View>
		</View>
	)
}

export default Header
