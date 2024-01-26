import React, { useEffect, useState } from "react"
import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native"

interface Dot {
	id: string
	color: "red" | "blue"
	position: Animated.Value
	caught?: boolean
}

const Test: React.FC = () => {
	const [points, setPoints] = useState(0)
	const [leftBtnRed, setLeftBtnRed] = useState(false)
	const [rightBtnRed, setRightBtnRed] = useState(false)
	const [dots, setDots] = useState<Dot[]>([])

	useEffect(() => {
		const gameInterval = setInterval(() => {
			generateDots()
		}, 1500)

		return () => {
			clearInterval(gameInterval)
		}
	}, [])

	const generateDots = () => {
		const newDots: Dot[] = [
			{
				id: Math.random().toString(),
				color: "red",
				position: new Animated.Value(0)
			},
			{
				id: Math.random().toString(),
				color: "blue",
				position: new Animated.Value(0)
			}
		]

		setDots(prevDots => [...prevDots, ...newDots])

		Animated.sequence(
			newDots.map(dot =>
				Animated.timing(dot.position, {
					toValue: 1,
					duration: 4000,
					useNativeDriver: false
				})
			)
		).start(() => {
			// Remove dots that have reached the bottom
			setDots(prevDots => prevDots.filter(dot => !dot.caught))
		})
	}

	const catchDot = (dotId: string) => {
		const updatedDots = dots.map(dot =>
			dot.id === dotId ? { ...dot, caught: true } : dot
		)
		setDots(updatedDots)
		addPoints()
	}

	const addPoints = () => {
		setPoints(prevPoints => prevPoints + 2)
	}

	const changeBtnColor = (btn: "left" | "right") => {
		if (btn === "left") {
			setLeftBtnRed(!leftBtnRed)
		} else if (btn === "right") {
			setRightBtnRed(!rightBtnRed)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.stagePlay}>
				<Text style={[styles.points, styles.whiteText]}>{points} Points</Text>
				<View style={styles.mask} />
				<TouchableOpacity
					style={[styles.btn, styles.leftBtn]}
					onPress={() => changeBtnColor("left")}
				>
					<Animated.View
						style={[
							styles.halfCircle,
							leftBtnRed ? styles.redHalfCircle : styles.blueHalfCircle
						]}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.btn, styles.rightBtn]}
					onPress={() => changeBtnColor("right")}
				>
					<Animated.View
						style={[
							styles.halfCircle,
							rightBtnRed ? styles.redHalfCircle : styles.blueHalfCircle
						]}
					/>
				</TouchableOpacity>
				{dots.map(dot => (
					<Animated.View
						key={dot.id}
						style={[
							styles.dot,
							{
								backgroundColor: dot.color,
								top: dot.position.interpolate({
									inputRange: [0, 1],
									outputRange: [0, 400]
								})
							},
							dot.caught && styles.caughtDot
						]}
					>
						<TouchableOpacity onPress={() => catchDot(dot.id)} />
					</Animated.View>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	stagePlay: {
		position: "relative",
		width: 300,
		height: 500,
		borderWidth: 2,
		borderColor: "#34495e",
		borderStyle: "solid",
		borderRadius: 5,
		overflow: "hidden"
	},
	mask: {
		position: "absolute",
		zIndex: 1,
		width: "100%",
		height: "20%",
		backgroundColor: "#2c3e50",
		bottom: 0,
		left: 0
	},
	btn: {
		width: 60,
		height: 60,
		position: "absolute",
		zIndex: 2,
		bottom: "8.5%"
	},
	leftBtn: {
		left: 52
	},
	rightBtn: {
		right: 52
	},
	halfCircle: {
		width: "100%",
		height: "100%",
		borderTopLeftRadius: 30,
		borderBottomLeftRadius: 30,
		borderTopRightRadius: 30,
		borderBottomRightRadius: 30,
		position: "absolute"
	},
	redHalfCircle: {
		backgroundColor: "#e74c3c",
		transform: [{ rotate: "-45deg" }]
	},
	blueHalfCircle: {
		backgroundColor: "#3498db",
		transform: [{ rotate: "-45deg" }]
	},
	dot: {
		width: 30,
		height: 30,
		borderRadius: 15,
		position: "absolute",
		top: 0
	},
	caughtDot: {
		top: "80%"
	},
	points: {
		color: "#fff",
		fontSize: 24,
		marginBottom: 10
	},
	whiteText: {
		color: "#fff"
	},
	touchableArea: {
		flex: 1,
		width: "100%",
		height: "100%",
		backgroundColor: "transparent",
		position: "absolute"
	}
})

export default Test
