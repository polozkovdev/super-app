import React, { useCallback } from "react"
import { Dimensions, Image, StyleSheet, View } from "react-native"
import { interpolate } from "react-native-reanimated"
import Carousel from "react-native-reanimated-carousel"

const scale = 0.9
const PAGE_WIDTH = Dimensions.get("window").width * scale
const IMAGES_GAMES_LIST = [
	require("@/assets/ui/math2.png"),
	require("@/assets/ui/blick.png"),
	require("@/assets/ui/sudoke2.png"),
	require("@/assets/ui/memory2.png"),
	require("@/assets/ui/honoi3.png")
]

function CircularSlider() {
	const itemSize = 240
	const centerOffset = PAGE_WIDTH / 2 - itemSize
	const animationStyle = useCallback(
		(value: any) => {
			"worklet"

			const itemGap = interpolate(
				value,
				[-3, -2, -1, 0, 1, 2, 3],
				[-30, -15, 0, 0, 0, 15, 30]
			)
			const rotateZ = `${interpolate(value, [-1, 0, 1], [-10, 0, 10])}deg`
			const translateX =
				interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) + itemGap

			const translateY = interpolate(
				value,
				[-1, -0.5, 0, 0.5, 1],
				[60, 45, 40, 45, 60]
			)

			const scale = interpolate(
				value,
				[-1, -0.5, 0, 0.5, 1],
				[0.8, 0.85, 1.1, 0.85, 0.8]
			)

			return {
				transform: [{ rotateZ }, { translateX }, { translateY }, { scale }]
			}
		},
		[centerOffset]
	)
	return (
		<View className='flex-row items-center justify-center w-full'>
			<Carousel
				width={itemSize}
				height={itemSize}
				style={{
					width: 1000,
					height: 320,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center"
				}}
				loop
				autoPlay={true}
				data={IMAGES_GAMES_LIST}
				onSnapToItem={item => {
					// setActiveIndex(item)
				}}
				renderItem={({ item, index }) => {
					return (
						<View
							key={index}
							className='flex -mt-[40px] shadow-[black]/10 shadow-lg'
						>
							<Image style={styles.image} resizeMode='cover' source={item} />
						</View>
					)
				}}
				customAnimation={animationStyle}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#FFFFFF",
		width: 220,
		height: 220
	}
})

export default CircularSlider
