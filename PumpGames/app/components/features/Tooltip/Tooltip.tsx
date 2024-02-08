import TextComponent from "@/components/ui/text/TextComponent"
import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import {
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from "react-native"
import { useMediaQuery } from "react-responsive"

interface InfoTooltipProps {
	text: string // Tooltip text
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	const toggleTooltip = () => {
		setIsVisible(!isVisible)
	}
	const close = () => isVisible && setIsVisible(false)
	return (
		<TouchableWithoutFeedback onPress={close}>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={toggleTooltip}
					style={styles.iconContainer}
					className='flex-row'
				>
					<Ionicons name='help-circle-outline' size={24} color='#3F1210' />
					{isDesktop && (
						<TextComponent className='text-[18px] leading-[24px] font-subtitle text-primary'>
							Rules
						</TextComponent>
					)}
				</TouchableOpacity>
				{isVisible && (
					<View
						style={styles.tooltipContainer}
						className='shadow-[black]/10 shadow-sm'
					>
						<TextComponent className='text-[16px] leading-[18px] text-left font-title'>
							{text}
						</TextComponent>
					</View>
				)}
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		zIndex: 9999999
	},
	iconContainer: {
		paddingHorizontal: 5
	},
	tooltipContainer: {
		position: "absolute",
		backgroundColor: "#ffffff",
		width: 160,
		borderRadius: 5,
		padding: 10,
		top: 40,
		left: -60,
		zIndex: 999999
	}
})

export default InfoTooltip
