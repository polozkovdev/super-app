import { MaterialIcons } from "@expo/vector-icons"
import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface InfoTooltipProps {
	text: string // Tooltip text
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false)

	const toggleTooltip = () => {
		setIsVisible(!isVisible)
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={toggleTooltip} style={styles.iconContainer}>
				<MaterialIcons name='help' size={24} color='#3F1210' />
			</TouchableOpacity>
			{isVisible && (
				<View style={styles.tooltipContainer}>
					<Text style={styles.tooltipText}>{text}</Text>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: "relative"
	},
	iconContainer: {
		paddingHorizontal: 5
	},
	tooltipContainer: {
		position: "absolute",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		borderRadius: 5,
		padding: 10,
		top: 30,
		left: 10,
		zIndex: 999
	},
	tooltipText: {
		color: "#fff"
	}
})

export default InfoTooltip
