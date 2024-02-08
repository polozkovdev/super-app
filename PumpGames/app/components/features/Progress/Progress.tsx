import React from "react"
import { StyleSheet, View } from "react-native"

interface ProgressProps {
	steps?: number // Total steps
	currentState?: number // Current state
}

const Progress: React.FC<ProgressProps> = ({
	steps = 10,
	currentState = 4
}) => {
	const calculateFillPercentage = (): string => {
		return `${(currentState / steps) * 100}%`
	}

	return (
		<View
			style={styles.container}
			className='border-white border-[1px] border-[#000000]/10 shadow-[black]/10 shadow-sm p-[2px]'
		>
			<View
				// @ts-ignore
				style={[styles.fill, { width: calculateFillPercentage() }]}
				className='overflow-hidden bg-[#FF6400]/10'
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		height: 40,
		width: 240,
		backgroundColor: "#fff",
		borderRadius: 24,
		overflow: "hidden"
	},
	fill: {
		height: "100%",
		borderRadius: 24,
		borderBottomRightRadius: 0,
		borderTopRightRadius: 0
	}
})

export default Progress
