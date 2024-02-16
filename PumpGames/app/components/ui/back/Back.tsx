import { Ionicons } from "@expo/vector-icons"
import React, { FC, PropsWithChildren } from "react"
import { TouchableOpacity } from "react-native"

interface IBackProps {
	navigation?: any
	route?: any
}

const Back: FC<PropsWithChildren<IBackProps>> = ({ navigation, route }) => {
	return (
		<TouchableOpacity
			className='flex-row items-center bg-white h-[34px] rounded-[24px] px-[6px] shadow-[black]/10 shadow-sm mr-[10px]'
			onPress={() => navigation.navigate("GameOverview", { route })}
		>
			<Ionicons name='arrow-back-circle-outline' size={24} color='#3F1210' />
		</TouchableOpacity>
	)
}

export default Back
