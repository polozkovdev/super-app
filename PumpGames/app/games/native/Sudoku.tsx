import gameWrapper from "@/hoc/gameWrapper"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native"
import { useMediaQuery } from "react-responsive"

type SudokuBoard = string[][]

const initialInput: SudokuBoard = [
	["5", "3", ".", ".", "7", ".", ".", ".", "."],
	["6", ".", ".", "1", "9", "5", ".", ".", "."],
	[".", "9", "8", ".", ".", ".", ".", "6", "."],
	["8", ".", ".", ".", "6", ".", ".", ".", "3"],
	["4", ".", ".", "8", ".", "3", ".", ".", "1"],
	["7", ".", ".", ".", "2", ".", ".", ".", "6"],
	[".", "6", ".", ".", ".", ".", "2", "8", "."],
	[".", ".", ".", "4", "1", "9", ".", ".", "5"],
	[".", ".", ".", ".", "8", ".", ".", "7", "9"]
]

const isInitialCell: boolean[][] = initialInput.map(row =>
	row.map(cell => cell !== ".")
)

const SudokuGame: React.FC = () => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	const [board, setBoard] = useState<SudokuBoard>(initialInput)
	const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
		null
	)
	const [fadeAnim] = useState(new Animated.Value(0.6))
	const [highlightedCells, setHighlightedCells] = useState<number[][]>([])
	const [initialCells] = useState<boolean[][]>(isInitialCell)

	const handleCellPress = (row: number, col: number) => {
		if (!initialCells[row][col]) {
			setSelectedCell([row, col])
			highlightRegionAndLines(row, col)
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 500,
				useNativeDriver: false
			}).start()
		}
	}

	const highlightRegionAndLines = (row: number, col: number) => {
		// Определить регион ячейки
		const regionRow = Math.floor(row / 3)
		const regionCol = Math.floor(col / 3)

		let newHighlightedCells: number[][] = []

		const regionCheck = checkRegion(board, regionRow, regionCol)
		const lineCheck = checkLine(board, row, col)

		// Подсветить регион, если собран правильно
		if (regionCheck) {
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					newHighlightedCells.push([regionRow * 3 + i, regionCol * 3 + j])
				}
			}
		}

		// Подсветить линии, если собрана правильно
		if (lineCheck) {
			for (let i = 0; i < 9; i++) {
				newHighlightedCells.push([i, col])
				newHighlightedCells.push([row, i])
			}
		}

		setHighlightedCells(newHighlightedCells)
	}

	const checkRegion = (
		board: SudokuBoard,
		regionRow: number,
		regionCol: number
	): boolean => {
		const regionValues: string[] = []
		for (let i = regionRow * 3; i < regionRow * 3 + 3; i++) {
			for (let j = regionCol * 3; j < regionCol * 3 + 3; j++) {
				const value = board[i][j]
				if (value === "." || regionValues.includes(value)) {
					return false
				}
				regionValues.push(value)
			}
		}
		return true
	}

	const checkLine = (board: SudokuBoard, row: number, col: number): boolean => {
		const rowValues: string[] = board[row].filter(value => value !== ".")
		const colValues: string[] = board
			.map(row => row[col])
			.filter(value => value !== ".")
		return (
			rowValues.length === new Set(rowValues).size &&
			colValues.length === new Set(colValues).size
		)
	}

	const handleNumberSelect = (num: string) => {
		if (selectedCell) {
			const [row, col] = selectedCell
			const newBoard = [...board]
			newBoard[row][col] = num
			setBoard(newBoard)
			setSelectedCell(null)
			Animated.timing(fadeAnim, {
				toValue: 0.6,
				useNativeDriver: false
			}).start()
		}
	}

	return (
		<View style={styles.container}>
			{board.map((row, rowIndex) => (
				<View key={rowIndex} style={styles.row}>
					{row.map((cell, colIndex) => {
						const isHighlighted = highlightedCells.some(
							([r, c]) => r === rowIndex && c === colIndex
						)
						const isSelected =
							selectedCell &&
							selectedCell[0] === rowIndex &&
							selectedCell[1] === colIndex
						return (
							<TouchableOpacity
								key={colIndex}
								style={[
									styles.cell,
									{
										width: isDesktop ? 80 : 40,
										height: isDesktop ? 80 : 40
									},
									// Применяем границы для выделения регионов
									{
										borderRightWidth: (colIndex + 1) % 3 === 0 ? 1 : 0,
										borderBottomWidth: (rowIndex + 1) % 3 === 0 ? 1 : 0,
										backgroundColor: initialCells[rowIndex][colIndex]
											? "lightgrey"
											: isHighlighted
												? "gray" // Green for region
												: isSelected
													? "#E57300" // Orange for selected cell
													: "white"
									}
								]}
								onPress={() => handleCellPress(rowIndex, colIndex)}
							>
								<Text style={styles.cellText}>{cell === "." ? "" : cell}</Text>
							</TouchableOpacity>
						)
					})}
				</View>
			))}
			<View style={styles.numbersContainer}>
				{[...Array(9)].map((_, index) => (
					<TouchableOpacity
						key={index}
						style={styles.numberButton}
						onPress={() => handleNumberSelect((index + 1).toString())}
					>
						<Animated.Text
							style={[
								styles.numberButtonText,
								{ opacity: selectedCell ? fadeAnim : 0.6 }
							]}
						>
							{index + 1}
						</Animated.Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	row: {
		flexDirection: "row"
	},
	cell: {
		width: 40,
		height: 40,
		borderWidth: 1,
		borderColor: "black",
		alignItems: "center",
		justifyContent: "center"
	},
	cellText: {
		fontSize: 20
	},
	numbersContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		gap: 1
	},
	numberButton: {
		width: 40,
		height: 40,
		backgroundColor: "white",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,.1)",
		alignItems: "center",
		justifyContent: "center"
	},
	numberButtonText: {
		color: "#3F1210",
		fontSize: 20
	}
})

export default gameWrapper({
	Component: observer(SudokuGame),
	Name: "Sudoku"
})
