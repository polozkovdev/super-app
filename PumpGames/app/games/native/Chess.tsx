import React, { useState } from "react"
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions
} from "react-native"

const Chessboard: React.FC = () => {
	const [board, setBoard] = useState<string[][]>([
		["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
		["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
		["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
	])

	const [selectedPiece, setSelectedPiece] = useState<{
		piece: string
		x: number
		y: number
	} | null>(null)

	const tileSize = Dimensions.get("window").width / 8

	const pieces = {
		bR: "♜",
		bN: "♞",
		bB: "♝",
		bQ: "♛",
		bK: "♚",
		bp: "♟",
		wR: "♖",
		wN: "♘",
		wB: "♗",
		wQ: "♕",
		wK: "♔",
		wp: "♙"
	}

	const isMoveValid = (
		selectedPiece: { piece: string; x: number; y: number },
		targetX: number,
		targetY: number
	) => {
		// Проверка допустимости хода для выбранной фигуры
		const startX = selectedPiece.x
		const startY = selectedPiece.y
		const pieceType = selectedPiece.piece

		// Функция проверки допустимости хода для пешки
		const isPawnMoveValid = () => {
			const direction = pieceType[0] === "w" ? 1 : -1

			if (targetX >= 0 && targetX < 8 && targetY >= 0 && targetY < 8) {
				const targetPiece = board[targetY][targetX]
				if (
					targetX === startX &&
					targetY === startY + direction &&
					targetPiece === ""
				) {
					return true // Обычное движение пешкой
				}
				if (
					startY === (pieceType[0] === "w" ? 1 : 6) &&
					targetX === startX &&
					targetY === startY + 2 * direction &&
					board[startY + direction][startX] === "" &&
					targetPiece === ""
				) {
					return true // Начальное движение пешкой (перемещение на две клетки вперед)
				}
				if (
					Math.abs(targetX - startX) === 1 &&
					targetY === startY + direction &&
					targetPiece[0] === (pieceType[0] === "w" ? "b" : "w")
				) {
					return true // Взятие фигур пешкой
				}
			}
			return false
		}

		// Здесь можно добавить проверки для других фигур, таких как конь, слон, ладья, королева и король

		return isPawnMoveValid() // Пока что для пешки
	}

	const getCursorPosition = (event: any) => {
		// Получение координат клика мыши или касания
		const rect = event.target.getBoundingClientRect()
		const x = event.clientX - rect.left
		const y = event.clientY - rect.top
		return { x: Math.floor(x / tileSize), y: Math.floor(y / tileSize) }
	}

	const handleSquarePress = (x: number, y: number) => {
		// Обработчик события нажатия на клетку
		const piece = board[y][x]

		if (!selectedPiece && piece !== "") {
			setSelectedPiece({ piece, x, y })
			updateBoard()
		} else if (selectedPiece) {
			if (x !== selectedPiece.x || y !== selectedPiece.y) {
				if (isMoveValid(selectedPiece, x, y)) {
					const newBoard = [...board]
					newBoard[y][x] = selectedPiece.piece
					newBoard[selectedPiece.y][selectedPiece.x] = ""
					setBoard(newBoard)
					setSelectedPiece(null)
					updateBoard()
				}
			}
		}
	}

	const getValidMoves = (selectedPiece: {
		piece: string
		x: number
		y: number
	}): { x: number; y: number }[] => {
		const validMoves: { x: number; y: number }[] = []
		// В этой функции будет логика для получения доступных ходов для каждой фигуры
		// Пока реализуем только для пешки, но ее можно расширить для остальных фигур
		// Пример для пешки:
		if (selectedPiece.piece[1] === "p") {
			// Логика для пешки
			// Пример:
			const direction = selectedPiece.piece[0] === "w" ? 1 : -1
			// Обычное движение пешкой
			if (
				selectedPiece.y + direction >= 0 &&
				selectedPiece.y + direction < 8 &&
				board[selectedPiece.y + direction][selectedPiece.x] === ""
			) {
				validMoves.push({ x: selectedPiece.x, y: selectedPiece.y + direction })
				// Начальное движение пешкой
				if (
					(selectedPiece.y === 1 && direction === 1) ||
					(selectedPiece.y === 6 && direction === -1)
				) {
					if (board[selectedPiece.y + 2 * direction][selectedPiece.x] === "") {
						validMoves.push({
							x: selectedPiece.x,
							y: selectedPiece.y + 2 * direction
						})
					}
				}
			}
			// Взятие фигур пешкой
			if (
				selectedPiece.x > 0 &&
				board[selectedPiece.y + direction][selectedPiece.x - 1][0] !==
					selectedPiece.piece[0]
			) {
				validMoves.push({
					x: selectedPiece.x - 1,
					y: selectedPiece.y + direction
				})
			}
			if (
				selectedPiece.x < 7 &&
				board[selectedPiece.y + direction][selectedPiece.x + 1][0] !==
					selectedPiece.piece[0]
			) {
				validMoves.push({
					x: selectedPiece.x + 1,
					y: selectedPiece.y + direction
				})
			}
		}
		return validMoves
	}

	const updateBoard = () => {
		const updatedBoard = [...board]
		// Очищаем предыдущие подсвеченные клетки
		for (let y = 0; y < 8; y++) {
			for (let x = 0; x < 8; x++) {
				if (updatedBoard[y][x] === "highlighted") {
					updatedBoard[y][x] = ""
				}
			}
		}
		if (selectedPiece) {
			// Получаем доступные ходы для выбранной фигуры
			const validMoves = getValidMoves(selectedPiece)
			// Подсвечиваем клетки, на которые можно сделать ход
			for (const move of validMoves) {
				updatedBoard[move.y][move.x] = "highlighted"
			}
		}
		setBoard(updatedBoard)
	}

	return (
		<View style={styles.container}>
			{board.map((row, y) => (
				<View key={y} style={styles.row}>
					{row.map((piece, x) => (
						<TouchableOpacity
							key={`${x}-${y}`}
							style={[
								styles.square,
								{ backgroundColor: (x + y) % 2 === 0 ? "#fff" : "#999" }
							]}
							onPress={() => handleSquarePress(x, y)}
						>
							<Text style={styles.piece}>{pieces[piece]}</Text>
						</TouchableOpacity>
					))}
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column"
	},
	row: {
		flexDirection: "row"
	},
	square: {
		width: Dimensions.get("window").width / 8,
		height: Dimensions.get("window").width / 8,
		justifyContent: "center",
		alignItems: "center"
	},
	piece: {
		fontSize: 48,
		fontFamily: "Arial"
	}
})

export default Chessboard
