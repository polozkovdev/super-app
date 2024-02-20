import gameWrapper from "@/hoc/gameWrapper"
import { useModal } from "@/hooks/useModal"
import { observer } from "mobx-react-lite"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { IGame } from "types"

const Expression = ({ from, to, transitioning }) => {
	return (
		<View style={styles.expressionContainer}>
			<View style={styles.expressionTextContainer}>
				<Text style={styles.expressionText}>{from}</Text>
			</View>
			<View style={styles.expressionTextContainer}>
				<Text style={styles.expressionText}>{to}</Text>
			</View>
		</View>
	)
}
const MultipleChoice = ({ values, selected, correct, onClick }) => {
	return (
		<View style={styles.multipleChoiceContainer}>
			{values.map((value, index) => (
				<TouchableOpacity
					key={index}
					style={[
						styles.choiceButton,
						{
							backgroundColor:
								selected === value
									? correct
										? "#2ecc71"
										: "#e74c3c"
									: "#7f8c8d"
						}
					]}
					onPress={() => onClick(value)}
					disabled={selected !== -1}
				>
					<Text style={styles.choiceText}>{value}</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}

const Summary = ({ show, score, onPlayAgain, correctCount }) => {
	return (
		<View
			style={[styles.summaryContainer, { display: show ? "flex" : "none" }]}
		>
			<Text style={styles.summaryText}>Your Score is: {score}</Text>
			<Text style={styles.summaryText}>Correct Answers: {correctCount}</Text>
			<TouchableOpacity style={styles.playAgainButton} onPress={onPlayAgain}>
				<Text style={styles.playAgainButtonText}>PLAY AGAIN</Text>
			</TouchableOpacity>
		</View>
	)
}

interface IMathGameProps {
	game: IGame
	updateGame: (props?: any) => void
	timerStart: boolean
	setTimerStart: Dispatch<SetStateAction<boolean>>
	navigation: any
}

const MathGame: React.FC<IMathGameProps> = ({
	game,
	updateGame,
	timerStart,
	setTimerStart,
	navigation
}) => {
	const { showModal } = useModal()
	const [showSummary, setShowSummary] = useState(false)
	const [score, setScore] = useState(0)
	const [selected, setSelected] = useState(-1)
	const [problem, setProblem] = useState({
		a: Math.floor(Math.random() * 10),
		b: Math.floor(Math.random() * 10)
	})
	const [choices, setChoices] = useState([])
	const [correctAnswer, setCorrectAnswer] = useState(0)
	const [isCorrect, setIsCorrect] = useState(false)
	const [correctCount, setCorrectCount] = useState(0)

	useEffect(() => {
		generateChoices()
	}, [problem])

	const generateChoices = () => {
		const result = problem.a + problem.b
		const choiceSet = new Set()
		choiceSet.add(result)
		while (choiceSet.size < 4) {
			choiceSet.add(Math.floor(Math.random() * 20))
		}
		const choiceArray = Array.from(choiceSet)
		setChoices(shuffleArray(choiceArray))
		setCorrectAnswer(result)
	}

	const shuffleArray = array => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	const handleOnClick = value => {
		if (!timerStart) {
			setTimerStart(true)
		}
		setSelected(value)
		setIsCorrect(value === correctAnswer)
		setTimeout(() => {
			if (value === correctAnswer) {
				setScore(score + 1)
				setCorrectCount(correctCount + 1)
				if (correctCount + 1 === 5) {
					setCorrectCount(0) // Сбрасываем счетчик
					showModal({
						title: "Congratulations!",
						text: `You Complete this game!`,
						successText: "Unlock next level",
						successHandler: () => updateGame()
					})
				}
			}
			setProblem({
				a: Math.floor(Math.random() * 10),
				b: Math.floor(Math.random() * 10)
			})
			setSelected(-1)
			setIsCorrect(false)
		}, 1500)
	}

	const handleOnPlayAgain = () => {
		setScore(0)
		setCorrectCount(0)
		setProblem({
			a: Math.floor(Math.random() * 10),
			b: Math.floor(Math.random() * 10)
		})
	}

	return (
		<View style={styles.container}>
			<View style={styles.expressionContainer}>
				<Expression
					from={`${problem.a} + ${problem.b} = `}
					to={`?`}
					transitioning={selected !== -1}
				/>
			</View>
			<View style={styles.choiceContainer}>
				<MultipleChoice
					values={choices}
					selected={selected}
					correct={isCorrect}
					onClick={handleOnClick}
				/>
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
	headerContainer: {
		flexDirection: "row",
		marginBottom: 20
	},
	expressionContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 20
	},
	expressionTextContainer: {
		marginRight: 10
	},
	expressionText: {
		fontSize: 36,
		color: "#34495e"
	},
	choiceContainer: {
		marginVertical: 20,
		flexDirection: "row",
		justifyContent: "center"
	},
	choiceButton: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#7f8c8d",
		width: 80,
		height: 50,
		borderRadius: 3,
		marginHorizontal: 5
	},
	choiceText: {
		fontSize: 24,
		color: "#ffffff"
	},
	summaryContainer: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ffffff",
		padding: 20,
		borderRadius: 5
	},
	summaryText: {
		fontSize: 24,
		marginBottom: 10
	},
	playAgainButton: {
		backgroundColor: "#2ecc71",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 3
	},
	playAgainButtonText: {
		fontSize: 20,
		color: "#ffffff"
	},
	timerContainer: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ffffff",
		borderRadius: 3,
		width: 100,
		height: 50,
		marginRight: 10
	},
	timerText: {
		fontSize: 18
	},
	multipleChoiceContainer: {
		flexDirection: "row"
	}
})

export default gameWrapper({
	Component: observer(MathGame),
	Name: "Math"
})
