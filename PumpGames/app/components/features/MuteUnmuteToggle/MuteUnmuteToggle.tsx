import TextComponent from "@/components/ui/text/TextComponent"
import { MaterialIcons } from "@expo/vector-icons"
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
		<View>
			<TouchableOpacity onPress={toggleMute} className='flex-row items-center'>
				{isMuted ? (
					<MaterialIcons name='volume-off' size={24} color='#3F1210' />
				) : (
					<MaterialIcons name='volume-up' size={24} color='#3F1210' />
				)}
				<TextComponent className='text-[18px] leading-[24px] font-subtitle text-primary'>
					Ads
				</TextComponent>
			</TouchableOpacity>
		</View>
	)
}

export default MuteUnmuteToggle
