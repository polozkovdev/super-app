import TextComponent from "@/components/ui/text/TextComponent"
import React from "react"
import { StyleSheet, View } from "react-native"

interface ProgressProps {
	steps?: number // Total steps
	currentState?: number // Current state
}

const Progress: React.FC<ProgressProps> = ({
	steps = 10,
	currentState = 10
}) => {
	const calculateFillPercentage = (): string => {
		return `${(currentState / steps) * 100}%`
	}
	const isFinished = steps === currentState
	return (
		<View
			style={styles.container}
			className='border-white border-[1px] border-[#000000]/10 shadow-[black]/10 shadow-sm p-[2px] relative h-[34px]'
		>
			<TextComponent className='text-[#FF6400] text-[16px] leading-[26px] font-subtitle absolute mt-[2px] ml-[16px]'>
				Level {currentState}
			</TextComponent>
			<View
				style={[
					styles.fill,
					// @ts-ignore
					{
						width: calculateFillPercentage(),
						borderBottomRightRadius: isFinished ? 24 : 0,
						borderTopRightRadius: isFinished ? 24 : 0
					}
				]}
				className={`overflow-hidden ${isFinished ? "bg-green/10" : "bg-[#FF6400]/10"}`}
			/>
			<TextComponent className='text-primary/40 text-[14px] leading-[26px] font-subtitle absolute right-0 mt-[2px] mr-[16px]'>
				{steps}
			</TextComponent>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		width: 240,
		backgroundColor: "#fff",
		borderRadius: 24
	},
	fill: {
		height: "100%",
		borderRadius: 24
	}
})

export default Progress
