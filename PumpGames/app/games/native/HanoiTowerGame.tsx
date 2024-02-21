import gameWrapper from "@/hoc/gameWrapper"
import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"

interface Disc {
	id: number
}

interface TowersOfHanoiProps {
	discs: number
}

const TowersOfHanoi: React.FC<TowersOfHanoiProps> = ({ discs }) => {
	const [towers, setTowers] = useState<Array<Array<Disc>>>([])
	const [moves, setMoves] = useState<number>(0)
	const [message, setMessage] = useState<string>("")

	useEffect(() => {
		initGame()
	}, [])

	const initGame = () => {
		const initTowers: Array<Array<Disc>> = [[], [], []]
		for (let i = discs; i > 0; i--) {
			initTowers[0].push({ id: i })
		}
		setTowers(initTowers)
		setMoves(0)
		setMessage(
			`Move all the discs from the left tower to the right one at a time. A disc cannot be on top of a smaller disc. Have fun! You have made ${moves} moves.`
		)
	}

	const isTowerEmpty = (tower: Array<Disc>): boolean => {
		return tower.length === 0
	}

	const getTopDiscValue = (tower: Array<Disc>): number | undefined => {
		return isTowerEmpty(tower) ? undefined : tower[tower.length - 1].id
	}

	const isDiscMoveValid = (
		fromTower: number,
		toTower: number
	): boolean | undefined => {
		if (fromTower === toTower) return undefined
		if (isTowerEmpty(towers[fromTower])) return false
		if (getTopDiscValue(towers[fromTower]) > getTopDiscValue(towers[toTower])) {
			return false
		}
		return true
	}

	const moveDisc = (fromIdx: number, toIdx: number) => {
		const clonedTowers = towers.map(tower => [...tower])
		const disc = clonedTowers[fromIdx].pop()
		if (disc) {
			clonedTowers[toIdx].push(disc)
			setTowers(clonedTowers)
		}
	}

	const handleDiscClick = (fromTower: number, toTower: number) => {
		if (!isDiscMoveValid(fromTower, toTower)) {
			setMessage("Invalid move")
			return
		}

		moveDisc(fromTower, toTower)
		setMoves(moves + 1)

		if (isSolved()) {
			setMessage(`You won with ${moves} moves!`)
		} else {
			setMessage(
				`Move all the discs from the left tower to the right one at a time. A disc cannot be on top of a smaller disc. Have fun! You have made ${moves + 1} move${moves === 0 ? "" : "s"}.`
			)
		}
	}

	const isSolved = (): boolean => {
		return (
			towers[0].length === 0 &&
			towers[1].length === 0 &&
			towers[2].length === discs
		)
	}

	const renderTowers = () => {
		return towers.map((tower, index) => {
			return (
				<View key={index} style={styles.towerContainer}>
					<View
						style={[
							styles.tower,
							{
								borderColor:
									index === 0 ? "red" : index === 1 ? "blue" : "green"
							}
						]}
					>
						{tower.map((disc, discIndex) => (
							<View
								key={disc.id}
								style={[
									styles.disc,
									{
										width: disc.id * 10 + 50,
										bottom: discIndex * 25
									}
								]}
							/>
						))}
					</View>
					<TouchableOpacity
						onPress={() => handleTowerPress(index)}
						style={styles.towerPressArea}
					/>
				</View>
			)
		})
	}

	const handleTowerPress = (towerIdx: number) => {
		if (typeof towerIdx === "number") {
			if (fromTower === null) {
				setFromTower(towerIdx)
			} else {
				handleDiscClick(fromTower, towerIdx)
				setFromTower(null)
			}
		}
	}

	const [fromTower, setFromTower] = useState<number | null>(null)

	return (
		<View style={styles.container}>
			<Text style={styles.message}>{message}</Text>
			<View style={styles.towers}>{renderTowers()}</View>
			<TouchableOpacity onPress={initGame} style={styles.restartButton}>
				<Text style={styles.buttonText}>Restart</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "wheat"
	},
	message: {
		width: "100%",
		maxWidth: 400,
		minHeight: 88,
		marginVertical: 20,
		padding: 20,
		textAlign: "center",
		textTransform: "uppercase",
		letterSpacing: 2,
		fontWeight: "500",
		fontSize: 18,
		color: "black"
	},
	towers: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "yellow",
		padding: 20
	},
	towerContainer: {
		backgroundColor: "purple",
		position: "relative",
		justifyContent: "flex-end",
		alignItems: "center",
		minWidth: 100,
		marginRight: 30
	},
	tower: {
		backgroundColor: "black",
		alignItems: "center",
		marginBottom: 20,
		borderWidth: 2,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		width: 50
	},
	disc: {
		position: "absolute",
		bottom: 0,
		backgroundColor: "white",
		borderRadius: 10,
		height: 20,
		zIndex: 1
	},
	towerPressArea: {
		width: 100,
		height: 20,
		marginBottom: 20
	},
	restartButton: {
		backgroundColor: "firebrick",
		borderRadius: 5,
		marginVertical: 20,
		paddingVertical: 20,
		paddingHorizontal: 30
	},
	buttonText: {
		fontWeight: "400",
		fontSize: 16,
		color: "white",
		textTransform: "uppercase",
		letterSpacing: 2
	}
})

export default gameWrapper({
	Component: observer(TowersOfHanoi),
	Name: "HanoiTower"
})
