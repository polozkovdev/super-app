import React, { useEffect, useState } from "react"
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const TetrisGame: React.FC = () => {
	const [grid, setGrid] = useState<number[][]>([])
	const [position, setPosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0
	})
	const [gameStarted, setGameStarted] = useState(false)

	useEffect(() => {
		initializeGrid()
	}, [])

	const initializeGrid = () => {
		const initialGrid: number[][] = []
		for (let i = 0; i < 20; i++) {
			initialGrid.push(Array(10).fill(0))
		}
		setGrid(initialGrid)
	}

	const startGame = () => {
		setGameStarted(true)
		// TODO: Implement logic to initialize the game state, spawn a block, etc.
	}

	const endGame = () => {
		setGameStarted(false)
		initializeGrid()
		// TODO: Implement logic to end the game, reset state, etc.
	}

	const moveBlockDown = () => {
		if (gameStarted) {
			// TODO: Implement logic to move the block down
			// For now, let's just update the position to simulate movement
			setPosition(prevPosition => ({ ...prevPosition, y: prevPosition.y + 1 }))
		}
	}

	const renderGrid = () => {
		return grid.map((row, rowIndex) => (
			<View key={rowIndex} style={styles.row}>
				{row.map((cell, colIndex) => (
					<View
						key={colIndex}
						style={[styles.cell, cell === 1 ? styles.activeCell : null]}
					/>
				))}
			</View>
		))
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tetris Game</Text>
			<View style={styles.playArea}>{renderGrid()}</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={startGame}>
					<Text style={styles.buttonText}>Start Game</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={endGame}>
					<Text style={styles.buttonText}>End Game</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={moveBlockDown}>
					<Text style={styles.buttonText}>Move Down</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F5FCFF"
	},
	title: {
		fontSize: 24,
		marginBottom: 20
	},
	playArea: {
		flexDirection: "column-reverse",
		borderWidth: 1,
		borderColor: "black"
	},
	row: {
		flexDirection: "row"
	},
	cell: {
		width: screenWidth / 10,
		height: screenWidth / 10,
		borderWidth: 1,
		borderColor: "white"
	},
	activeCell: {
		backgroundColor: "blue"
	},
	buttonContainer: {
		flexDirection: "row",
		marginTop: 20
	},
	button: {
		margin: 10,
		padding: 10,
		backgroundColor: "skyblue",
		borderRadius: 5
	},
	buttonText: {
		fontSize: 16,
		color: "white"
	}
})

export default TetrisGame
