import gameWrapper from "@/hoc/gameWrapper"
import { useModal } from "@/hooks/useModal"
import { coreStore } from "@/store"
import { observer } from "mobx-react-lite"
import React, { Dispatch, SetStateAction, useState } from "react"
import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native"
import { useMediaQuery } from "react-responsive"
import { IGame } from "types"

type SudokuBoard = string[][]

const initialInputEasy: SudokuBoard = [
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
const initialInputMedium: SudokuBoard = [
	[".", ".", "8", ".", ".", "2", "5", "3", "4"],
	["5", "3", ".", ".", ".", ".", "6", "2", "."],
	["4", "2", "6", "5", "3", "8", ".", ".", "9"],
	["6", ".", ".", "2", "9", "7", "3", ".", "5"],
	["3", "5", "7", "8", "1", "4", "2", "9", "6"],
	["2", ".", ".", "3", "6", "5", ".", "7", "1"],
	["8", "6", "3", ".", ".", ".", "9", "5", "7"],
	[".", ".", ".", ".", ".", ".", ".", ".", "."],
	["7", "9", "2", ".", "5", "3", ".", ".", "."]
]

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

interface ISudokuGameProps {
	game: IGame
	navigation?: any
	setTimerStart: Dispatch<SetStateAction<boolean>>
}

const SudokuGame: React.FC<ISudokuGameProps> = ({
	game,
	navigation,
	setTimerStart
}) => {
	const { showModal, content } = useModal()

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
	const [filledRegions, setFilledRegions] = useState<number[][][]>([])
	const [filledRowsAndColumns, setFilledRowsAndColumns] = useState<number[][]>(
		[]
	)

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

	const updateFilledRegions = () => {
		const newFilledRegions: number[][][] = []
		// Проходим по всем регионам
		for (let regionRow = 0; regionRow < 3; regionRow++) {
			for (let regionCol = 0; regionCol < 3; regionCol++) {
				const regionValues: string[] = []
				let isRegionFilled = true
				// Получаем значения ячеек в текущем регионе
				for (let i = regionRow * 3; i < regionRow * 3 + 3; i++) {
					for (let j = regionCol * 3; j < regionCol * 3 + 3; j++) {
						const value = board[i][j]
						if (value === ".") {
							isRegionFilled = false
						}
						regionValues.push(value)
					}
				}
				// Если регион полностью заполнен, добавляем его в состояние
				if (isRegionFilled && new Set(regionValues).size === 9) {
					newFilledRegions.push([
						[regionRow * 3, regionCol * 3],
						[regionRow * 3, regionCol * 3 + 1],
						[regionRow * 3, regionCol * 3 + 2],
						[regionRow * 3 + 1, regionCol * 3],
						[regionRow * 3 + 1, regionCol * 3 + 1],
						[regionRow * 3 + 1, regionCol * 3 + 2],
						[regionRow * 3 + 2, regionCol * 3],
						[regionRow * 3 + 2, regionCol * 3 + 1],
						[regionRow * 3 + 2, regionCol * 3 + 2]
					])
				}
			}
		}
		setFilledRegions(newFilledRegions)
	}

	const updateFilledRowsAndColumns = () => {
		const newFilledRowsAndColumns: number[][] = []
		for (let i = 0; i < 9; i++) {
			const rowValues: string[] = board[i].filter(value => value !== ".")
			if (rowValues.length === 9 && new Set(rowValues).size === 9) {
				newFilledRowsAndColumns.push([i, -1])
			}
			const colValues: string[] = board
				.map(row => row[i])
				.filter(value => value !== ".")
			if (colValues.length === 9 && new Set(colValues).size === 9) {
				newFilledRowsAndColumns.push([-1, i])
			}
		}
		setFilledRowsAndColumns(newFilledRowsAndColumns)
	}

	const highlightRegionAndLines = (row: number, col: number) => {
		// Определить регион ячейки
		const regionRow = Math.floor(row / 3)
		const regionCol = Math.floor(col / 3)

		let newHighlightedCells: number[][] = []

		const regionCheck = checkRegion(board, regionRow, regionCol)
		const lineCheck = checkLine(board, row, col)

		// Проверяем, полностью ли заполнен регион
		const isRegionFull = board
			.slice(regionRow * 3, regionRow * 3 + 3)
			.every(r =>
				r.slice(regionCol * 3, regionCol * 3 + 3).every(cell => cell !== ".")
			)

		// Подсветить регион, если собран правильно
		if (regionCheck) {
			if (!isRegionFull) {
				// Если регион не полностью заполнен, подсвечиваем его зеленым
				for (let i = regionRow * 3; i < regionRow * 3 + 3; i++) {
					for (let j = regionCol * 3; j < regionCol * 3 + 3; j++) {
						newHighlightedCells.push([i, j])
					}
				}
			} else {
				// Иначе подсвечиваем его красным
				for (let i = regionRow * 3; i < regionRow * 3 + 3; i++) {
					for (let j = regionCol * 3; j < regionCol * 3 + 3; j++) {
						newHighlightedCells.push([i, j])
					}
				}
			}
		}

		// Подсветить линии, если собрана правильно
		if (lineCheck) {
			// Подсветить строку
			for (let i = 0; i < 9; i++) {
				newHighlightedCells.push([row, i])
			}
			// Подсветить столбец
			for (let i = 0; i < 9; i++) {
				newHighlightedCells.push([i, col])
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

	const checkGameCompletion = (): boolean => {
		// Проверяем каждый регион
		for (let regionRow = 0; regionRow < 3; regionRow++) {
			for (let regionCol = 0; regionCol < 3; regionCol++) {
				if (!checkRegion(board, regionRow, regionCol)) {
					return false // Если хотя бы один регион неверно собран, возвращаем false
				}
			}
		}

		// Проверяем каждую строку и столбец
		for (let i = 0; i < 9; i++) {
			if (!checkLine(board, i, -1) || !checkLine(board, -1, i)) {
				return false // Если хотя бы одна строка или столбец неверно собраны, возвращаем false
			}
		}

		return true // Если все проверки пройдены успешно, возвращаем true
	}

	const handleNumberSelect = (num: string) => {
		if (selectedCell) {
			const [row, col] = selectedCell
			const newBoard = [...board]
			newBoard[row][col] = num
			setBoard(newBoard)

			const regionRow = Math.floor(row / 3)
			const regionCol = Math.floor(col / 3)
			const isRegionFull = checkRegion(newBoard, regionRow, regionCol)
			const isLineFull = checkLine(newBoard, row, col)

			if (isRegionFull || isLineFull) {
				updateFilledRegions()
				updateFilledRowsAndColumns()
			}

			setSelectedCell(null)
			Animated.timing(fadeAnim, {
				toValue: 0.6,
				useNativeDriver: false
			}).start()
			if (checkGameCompletion()) {
				// Завершаем игру
				return showModal({
					title: "Congratulations!",
					text: `You Won! you complete sudoku! \n improve your skils in other games!`,
					successText: "Let's go !",
					successHandler: () => {
						coreStore.db.updateGame({
							...game,
							currentStep: game.currentStep + 1
						})
						navigation.navigate("Games")
					}
				})
			}
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
						const isFilledRegion = filledRegions.some(region =>
							region.some(([r, c]) => r === rowIndex && c === colIndex)
						)
						const isFilledRowOrColumn = filledRowsAndColumns.some(
							([r, c]) =>
								(r === rowIndex && c === -1) || (r === -1 && c === colIndex)
						)
						const backgroundColor = isFilledRowOrColumn
							? "rgba(24, 163, 0, .1)" // Заполненные строки и столбцы будут фиолетового цвета
							: isFilledRegion
								? "rgba(24, 163, 0, .1)" // Заполненные регионы также фиолетового цвета
								: initialCells[rowIndex][colIndex]
									? "lightgrey"
									: isHighlighted
										? isSelected
											? "#E57300"
											: "#eaeef4" // Green for region
										: "white"
						return (
							<TouchableOpacity
								key={colIndex}
								style={[
									styles.cell,
									{
										width: isDesktop ? 80 : 40,
										height: isDesktop ? 80 : 40
									},
									{
										borderRightWidth: (colIndex + 1) % 3 === 0 ? 1 : 0,
										borderBottomWidth: (rowIndex + 1) % 3 === 0 ? 1 : 0,
										backgroundColor
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
		marginTop: 20
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
