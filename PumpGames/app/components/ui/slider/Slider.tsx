import React, { useRef, useState } from "react"
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native"

interface ImageSliderProps {
	images: any[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
	const scrollViewRef = useRef<ScrollView>(null)
	const [currentIndex, setCurrentIndex] = useState(0)

	const screenWidth = Dimensions.get("window").width
	const handleScroll = (event: any) => {
		const offset = event.nativeEvent.contentOffset.x
		const index = Math.round(offset / screenWidth)
		setCurrentIndex(index)
	}
	return (
		<ScrollView
			ref={scrollViewRef}
			horizontal
			pagingEnabled
			onScroll={handleScroll}
			scrollEventThrottle={16}
			showsHorizontalScrollIndicator={false}
			style={styles.container}
		>
			{images.map((source, index) => {
				const size = (index - currentIndex) * 36
				return (
					<View
						key={index}
						style={{
							flexGrow: 1,
							justifyContent: "center",
							alignItems: "center",
							width: 300,
							// height: 300,
							transform: `rotate(${size}deg) translateX(${size}px) translateY(${size}px)`
						}}
					>
						<Image
							resizeMode='contain'
							source={source}
							style={{
								// width: 200,
								height: 200,
								maxWidth: 200
								// height: "auto",
							}}
						/>
					</View>
				)
			})}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "yellow"
		// flexGrow: 1,
		// alignItems: "center",
		// justifyContent: "center",
		// gap: 20
	},
	image: {
		// width: Dimensions.get("window").width,
		height: "auto"
	}
})

export default ImageSlider
