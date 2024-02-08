import TextComponent from "@/components/ui/text/TextComponent"
import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { TouchableOpacity, View } from "react-native"

interface MuteUnmuteProps {
	onMute: () => void
	onUnmute: () => void
}

const MuteUnmuteToggle: React.FC<MuteUnmuteProps> = ({ onMute, onUnmute }) => {
	const [isMuted, setIsMuted] = useState<boolean>(false)

	const toggleMute = () => {
		setIsMuted(!isMuted)
		if (isMuted) {
			onUnmute()
		} else {
			onMute()
		}
	}

	return (
		<View className='flex-row'>
			<TouchableOpacity
				onPress={toggleMute}
				className='flex-row items-center space-x-2'
			>
				{isMuted ? (
					<Ionicons name='volume-mute' size={24} color='#3F1210' />
				) : (
					<Ionicons name='volume-mute-outline' size={24} color='#3F1210' />
				)}
				<TextComponent className='text-[18px] leading-[24px] font-subtitle text-primary'>
					Ads
				</TextComponent>
			</TouchableOpacity>
		</View>
	)
}

export default MuteUnmuteToggle
