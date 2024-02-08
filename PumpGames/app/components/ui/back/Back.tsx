import { Ionicons } from "@expo/vector-icons"
import React, { FC, PropsWithChildren } from "react"
import { TouchableOpacity, View } from "react-native"
import { useMediaQuery } from "react-responsive"

interface IBackProps {
	navigation?: any
}

const Back: FC<PropsWithChildren<IBackProps>> = ({ navigation }) => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	return (
		<View className='flex-row items-center bg-white h-[34px] rounded-[24px] px-[6px] shadow-[black]/10 shadow-sm mr-[10px]'>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Ionicons name='arrow-back-circle-outline' size={24} color='#3F1210' />
			</TouchableOpacity>
		</View>
	)
}

export default Back
