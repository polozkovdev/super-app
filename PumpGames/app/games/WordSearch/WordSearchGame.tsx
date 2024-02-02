// WordSearchGame.tsx

import React, { useEffect, useState } from "react"
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"

type Grid = string[][]
type Position = { row: number; col: number }

const WordSearchGame: React.FC = () => {
	const [grid, setGrid] = useState<Grid>([])
	const [words, setWords] = useState<string[]>([
		"GAMES",
		"PLAY",
		"ANIMAL",
		"DOG",
		"CAT",
		"CUCUMBER"
	])
	const [selectedWord, setSelectedWord] = useState<string>("")
	const [foundWords, setFoundWords] = useState<string[]>([])

	useEffect(() => {
		initializeGrid()
	}, [])

	const initializeGrid = () => {
		const gridSize = 8
		const newGrid: Grid = []

		for (let i = 0; i < gridSize; i++) {
			const row = []
			for (let j = 0; j < gridSize; j++) {
				row.push(randomChar())
			}
			newGrid.push(row)
		}

		// Place words in the grid
		words.forEach(word => {
			const direction = Math.random() < 0.5 ? "horizontal" : "vertical"
			const { row, col } = getRandomPosition(gridSize, word.length, direction)

			for (let i = 0; i < word.length; i++) {
				if (direction === "horizontal") {
					newGrid[row][col + i] = word[i]
				} else {
					newGrid[row + i][col] = word[i]
				}
			}
		})

		setGrid(newGrid)
	}

	const getRandomPosition = (
		gridSize: number,
		wordLength: number,
		direction: string
	): Position => {
		const position: Position = { row: 0, col: 0 }

		if (direction === "horizontal") {
			position.row = Math.floor(Math.random() * gridSize)
			position.col = Math.floor(Math.random() * (gridSize - wordLength + 1))
		} else {
			position.row = Math.floor(Math.random() * (gridSize - wordLength + 1))
			position.col = Math.floor(Math.random() * gridSize)
		}

		return position
	}

	const shuffleArray = (array: string[]) => {
		return array.sort(() => Math.random() - 0.5)
	}

	const randomChar = () => {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		return characters[Math.floor(Math.random() * characters.length)]
	}

	const handleCellPress = (position: Position) => {
		const { row, col } = position
		const clickedLetter = grid[row][col]

		if (!selectedWord && !words.includes(clickedLetter)) {
			return // Ignore clicks on non-clickable letters
		}

		const newSelectedWord = selectedWord + clickedLetter
		setSelectedWord(newSelectedWord)

		if (words.includes(newSelectedWord)) {
			setFoundWords([...foundWords, newSelectedWord])
			clearSelection()
		}
	}

	const clearSelection = () => {
		setSelectedWord("")
	}

	const handleClearPress = () => {
		clearSelection()
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text>Found Words: {foundWords.join(", ")}</Text>
			</View>
			<View>
				{grid.map((row, rowIndex) => (
					<View key={rowIndex} style={styles.row}>
						{row.map((cell, colIndex) => (
							<TouchableOpacity
								key={colIndex}
								style={[
									styles.cell,
									words.includes(cell) &&
										!selectedWord.includes(cell) &&
										styles.clickableCell,
									selectedWord.includes(cell) && styles.highlightedCell
								]}
								onPress={() =>
									handleCellPress({ row: rowIndex, col: colIndex })
								}
							>
								<Text style={styles.cellText}>{cell}</Text>
							</TouchableOpacity>
						))}
					</View>
				))}
			</View>
			<View style={styles.footer}>
				<Button title='Clear Selection' onPress={handleClearPress} />
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
	header: {
		marginBottom: 10
	},
	row: {
		flexDirection: "row"
	},
	cell: {
		width: 30,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#000"
	},
	clickableCell: {
		backgroundColor: "lightblue"
	},
	highlightedCell: {
		backgroundColor: "yellow"
	},
	cellText: {
		fontSize: 18
	},
	footer: {
		marginTop: 10
	}
})

export default WordSearchGame
