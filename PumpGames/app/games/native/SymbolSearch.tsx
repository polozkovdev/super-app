import gameWrapper from "@/hoc/gameWrapper"
import { useModal } from "@/hooks/useModal"
import { coreStore } from "@/store"
import { FontAwesome5 } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useMemo,
	useState
} from "react"
import {
	Animated,
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native"
import { useMediaQuery } from "react-responsive"
import { IGame } from "types"

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

const STRINGS = [
	"android",
	"android",
	"apple",
	"apple",
	"balance-scale",
	"balance-scale",
	"bell",
	"bell",
	"bus",
	"bus",
	"car",
	"car",
	"clock",
	"clock",
	"coffee",
	"coffee",
	"bicycle",
	"bicycle",
	"leaf",
	"leaf",
	"cube",
	"cube",
	"anchor",
	"anchor",
	"paper-plane",
	"paper-plane",
	"bolt",
	"bolt",
	"bomb",
	"bomb",
	"carrot",
	"carrot"
]

const generateRandomPairsOrTriples = ({
	strings,
	repeatCount,
	pairsCount
}: {
	strings: string[]
	repeatCount: number
	pairsCount: number
}) => {
	return shuffle(
		shuffle(strings).reduce((acc: string[], item, index) => {
			if (index + 1 > pairsCount) {
				return acc
			}
			const repeatedItems = new Array(repeatCount).fill("").map(i => item)
			return [...acc, ...repeatedItems]
		}, [])
	)
}

interface ISymbolSearchProps {
	game: IGame
	setGame: Dispatch<SetStateAction<IGame>>
	setTimerStart: Dispatch<SetStateAction<boolean>>
	navigation: any
}

const SymbolSearch = ({
	game: { currentStep, steps },
	game,
	setGame,
	setTimerStart,
	navigation
}: ISymbolSearchProps) => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	const {
		gameCardsQTY,
		repeatCount,
		pairsCount
	}: { gameCardsQTY: number; repeatCount: number; pairsCount: number } =
		useMemo(() => {
			switch (currentStep) {
				case 1:
					return {
						gameCardsQTY: 16,
						repeatCount: 2,
						pairsCount: 8
					}
				case 2:
					return {
						gameCardsQTY: 64,
						repeatCount: 2,
						pairsCount: 32
					}
				default:
					return {
						gameCardsQTY: 64,
						repeatCount: 2,
						pairsCount: 32
					}
			}
		}, [currentStep])
	const symbols = useMemo(
		() =>
			generateRandomPairsOrTriples({
				strings: STRINGS,
				repeatCount,
				pairsCount
			}),
		[currentStep]
	)
	const { showModal, content } = useModal()
	const [cards, setCards] = useState<string[]>(symbols)
	const [animations, setAnimations] = useState(
		symbols.map(() => new Animated.Value(0))
	)
	const [opened, setOpened] = useState<number[]>([])
	const [matched, setMatched] = useState<number[]>([])
	const [moves, setMoves] = useState(0)

	useEffect(() => {
		initGame()
	}, [currentStep])

	const animatePress = (index: number, updatedOpened: number[]) => {
		const parallelAnimations = animations.map((_, i) => {
			const toValue = matched.includes(i) || updatedOpened.includes(i) ? 1 : 0
			return Animated.timing(animations[i], {
				toValue,
				duration: index === i ? 500 : 0,
				useNativeDriver: true
			})
		})

		Animated.parallel(parallelAnimations).start()
	}

	const animatedStyles = (index: number) => {
		return {
			transform: [
				{
					rotateY: animations[index]?.interpolate({
						inputRange: [0, 1],
						outputRange: ["0deg", "180deg"]
					})
				}
			]
		}
	}

	const initGame = () => {
		setTimerStart(true)
		setCards(symbols)
		setOpened([])
		setMatched([])
		setMoves(0)
		!isDesktop && setAnimations(cards.map(() => new Animated.Value(0)))
	}

	const endGame = () => {
		const updatedGame = {
			...game,
			currentStep: currentStep + 1
		}
		if (currentStep === steps) {
			return showModal({
				title: "Congratulations!",
				text: `You Won! you complete all steps! \n improve your skils in other games!`,
				successText: "Let's go !",
				successHandler: () => {
					coreStore.db.updateGame(updatedGame)
					navigation.navigate("Games")
				}
			})
		}
		showModal({
			title: "Congratulations!",
			text: `You Complete this game! with ${moves} moves \n And now you can improve yourself \n even more`,
			successText: "Unlock next level",
			successHandler: () => {
				coreStore.db.updateGame(updatedGame)
				setGame(updatedGame)
			}
		})
		initGame()
	}

	const handleCardPress = (index: number) => {
		if (matched.includes(index) || opened.includes(index)) return
		const updatedOpened = [...opened, index]
		setOpened(updatedOpened)

		!isDesktop && animatePress(index, updatedOpened)

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
				}, 500)
			}
			setMoves(moves + 1)
		}
	}

	const generateCardSize = (size: number) => {
		const screenWidth = Dimensions.get("window").width
		const itemSize = Math.floor(screenWidth / (size + 1))
		return {
			width: itemSize,
			height: itemSize
		}
	}

	const generateGridStyles = (size: number) => {
		if (isDesktop) {
			return {
				display: "grid",
				gridTemplateColumns: `repeat(${size}, 100px)`,
				gridTemplateRows: `repeat(${size}, 100px)`,
				gap: 4,
				borderRadius: 10
			}
		}
		return {
			display: "grid",
			gridTemplateColumns: `repeat(${size}, 1fr)`,
			gridTemplateRows: `repeat(${size}, 1fr)`,
			gap: 4,
			borderRadius: 10
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.scorePanel}>
				<Text style={styles.moves}>{moves} Moves</Text>
				<TouchableOpacity style={styles.restart} onPress={initGame}>
					<FontAwesome5 name='circle-notch' style={styles.restartIcon} />
				</TouchableOpacity>
			</View>
			{/*@ts-ignore*/}
			<View style={[styles.deck, generateGridStyles(Math.sqrt(gameCardsQTY))]}>
				{cards.map((card, index) => (
					<TouchableOpacity
						key={index}
						style={[
							styles.card,
							isDesktop && {
								// @ts-ignore
								transition: ".3s"
							},
							!isDesktop && {
								transform: [{ rotate: "180deg" }]
							},
							!isDesktop && generateCardSize(Math.sqrt(gameCardsQTY)),
							!matched.includes(index) && opened.includes(index) && isDesktop
								? {
										transform: [{ rotateY: "180deg" }]
									}
								: {
										transform: [{ rotate: "0" }]
									},

							matched.includes(index) && styles.matchedCard,
							!isDesktop && animatedStyles(index)
						]}
						onPress={() => handleCardPress(index)}
					>
						{opened.includes(index) || matched.includes(index) ? (
							<FontAwesome5 name={card} style={styles.cardIcon} />
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
		maxWidth: "100%",
		width: "100%",
		marginLeft: "auto",
		marginRight: "auto"
	},
	scorePanel: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		width: 200
	},
	moves: {
		color: "#000",
		marginRight: 5
	},
	restart: {
		marginLeft: "auto"
	},
	restartIcon: {
		fontSize: 24,
		color: "#000"
	},
	deck: {
		margin: 0,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "wrap"
	},
	card: {
		aspectRatio: 1,
		backgroundColor: "#FFCF7F",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		fontFamily: "FontAwesome5"
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

export default gameWrapper({
	Component: observer(SymbolSearch),
	Name: "SymbolSearch"
})
