import { FontAwesome } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import {
	Animated,
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native"

const screenWidth = Dimensions.get("window").width
const cardSize = (screenWidth - 40) / 4
export const shuffle = (array: string[]) => {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}

	return array
}

const symbols = [
	"bicycle",
	"bicycle",
	"leaf",
	"leaf",
	"cube",
	"cube",
	"anchor",
	"anchor",
	"paper-plane-o",
	"paper-plane-o",
	"bolt",
	"bolt",
	"bomb",
	"bomb",
	"diamond",
	"diamond"
]

const rank3stars = symbols.length + 2
const rank2stars = symbols.length + 6
const rank1stars = symbols.length + 10
const gameCardsQTY = symbols.length
const delay = 800

const BlickPuzzle = () => {
	const [cards, setCards] = useState(shuffle([...symbols]))
	const [animation] = useState(new Animated.Value(0))
	const [opened, setOpened] = useState<number[]>([])
	const [matched, setMatched] = useState<number[]>([])
	const [moves, setMoves] = useState(0)

	useEffect(() => {
		initGame()
	}, [])

	const animatePress = () => {
		Animated.timing(animation, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true
		}).start()
	}

	const animatedStyles = {
		transform: [
			{
				rotateY: animation.interpolate({
					inputRange: [0, 1],
					outputRange: ["0deg", "180deg"]
				})
			}
		]
	}

	const initGame = () => {
		setCards(shuffle([...symbols]))
		setOpened([])
		setMatched([])
		setMoves(0)
	}

	const setRating = (moves: number) => {
		let rating = 3
		if (moves > rank3stars && moves < rank2stars) {
			rating = 2
		} else if (moves > rank2stars && moves < rank1stars) {
			rating = 1
		} else if (moves > rank1stars) {
			rating = 0
		}
		return rating
	}

	const endGame = () => {
		const rating = setRating(moves)
		alert(
			`Congratulations! You Won!\nWith ${moves} Moves and ${rating} Stars.\nBoom Shaka Lak!`
		)
		initGame()
	}

	const handleCardPress = (index: number) => {
		animatePress()

		if (matched.includes(index)) return

		const updatedOpened = [...opened, index]
		setOpened(updatedOpened)

		if (updatedOpened.length % 2 === 0) {
			const firstCardIndex = updatedOpened[updatedOpened.length - 2]
			const secondCardIndex = updatedOpened[updatedOpened.length - 1]
			const firstCard = cards[firstCardIndex]
			const secondCard = cards[secondCardIndex]

			if (firstCard === secondCard) {
				setMatched([...matched, firstCardIndex, secondCardIndex])
				if (matched.length + 2 === gameCardsQTY) {
					setTimeout(() => {
						endGame()
					}, 500)
				}
			} else {
				setTimeout(() => {
					setOpened([])
				}, delay / 1.5)
			}

			setMoves(moves + 1)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.scorePanel}>
				<View style={styles.stars}>
					<FontAwesome name='star' style={styles.starIcon} />
					<FontAwesome name='star' style={styles.starIcon} />
					<FontAwesome name='star' style={styles.starIcon} />
				</View>
				<Text style={styles.moves}>{moves} Moves</Text>
				<TouchableOpacity style={styles.restart} onPress={initGame}>
					<FontAwesome name='repeat' style={styles.restartIcon} />
				</TouchableOpacity>
			</View>
			<View style={styles.deck}>
				{cards.map((card, index) => (
					<TouchableOpacity
						key={index}
						style={[
							styles.card,
							opened.includes(index) && styles.openedCard,
							matched.includes(index) && styles.matchedCard,
							opened.includes(index) && animatedStyles
						]}
						onPress={() => handleCardPress(index)}
					>
						{opened.includes(index) || matched.includes(index) ? (
							// @ts-ignore
							<FontAwesome name={card} style={styles.cardIcon} />
						) : null}
					</TouchableOpacity>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
		backgroundColor: "#000"
	},
	scorePanel: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		width: 200
	},
	stars: {
		flexDirection: "row",
		marginRight: 5
	},
	starIcon: {
		fontSize: 24,
		color: "#FFFA62",
		marginRight: 5
	},
	moves: {
		color: "#FFF",
		marginRight: 5
	},
	restart: {
		marginLeft: "auto"
	},
	restartIcon: {
		fontSize: 24,
		color: "#FFF"
	},
	deck: {
		margin: 0,
		backgroundColor: "#FFFA62",
		padding: 16,
		gap: 2,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "wrap"
	},
	card: {
		width: cardSize,
		height: cardSize,
		aspectRatio: 1,
		backgroundColor: "#FFCF7F",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		transform: [{ rotate: "180deg" }],
		fontFamily: "FontAwesome"
	},
	openedCard: {
		transform: [{ rotate: "0" }]
	},
	matchedCard: {
		backgroundColor: "#9BCB3C"
	},
	cardIcon: {
		fontSize: 40,
		color: "#ffffff"
	}
})

export default BlickPuzzle
