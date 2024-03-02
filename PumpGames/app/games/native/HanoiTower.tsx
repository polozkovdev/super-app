import TextComponent from "@/components/ui/text/TextComponent"
import gameWrapper from "@/hoc/gameWrapper"
import { MaterialIcons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useMediaQuery } from "react-responsive"

interface Disc {
	id: number
}

const TowersOfHanoi: React.FC = () => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	const [towers, setTowers] = useState<Array<Array<Disc>>>([])
	const [moves, setMoves] = useState<number>(0)
	const [activeDisc, setActiveDisc] = useState<Disc | null>(null)
	const [isError, setIsError] = useState(false)
	const [isWin, setIsWin] = useState(false)
	useEffect(() => {
		initGame()
	}, [])

	const initGame = () => {
		const initTowers: Array<Array<Disc>> = [[], [], []]
		for (let i = 5; i > 0; i--) {
			initTowers[0].push({ id: i })
		}
		setTowers(initTowers)
		setMoves(0)
	}

	const isSolved = (): boolean => {
		return (
			towers[0].length === 0 && towers[1].length === 0 && towers[2].length === 5
		)
	}

	const solve = async (
		n: number,
		source: number,
		target: number,
		auxiliary: number,
		currentTowers: Array<Array<Disc>>
	) => {
		if (n === 1) {
			const sourceTower = [...currentTowers[source]]
			const sourceDisc = sourceTower.pop()
			const targetTower = sourceDisc
				? [...currentTowers[target], sourceDisc]
				: [...currentTowers[target]]
			const newTowers = [...currentTowers]
			newTowers[source] = sourceTower
			newTowers[target] = targetTower
			setTowers(newTowers)
			setMoves(moves + 1)
			await new Promise(resolve => setTimeout(resolve, 300))
		} else {
			await solve(n - 1, source, auxiliary, target, currentTowers.slice()) // Создаем копию массива башен для передачи
			await solve(1, source, target, auxiliary, currentTowers.slice()) // Создаем копию массива башен для передачи
			await solve(n - 1, auxiliary, target, source, currentTowers.slice()) // Создаем копию массива башен для передачи
		}
	}

	const moveDiscs = async () => {
		await solve(5, 0, 2, 1, towers)
	}

	const renderTowers = () => {
		return towers.map((tower, index) => {
			return (
				<TouchableOpacity
					key={index}
					style={styles.towerContainer}
					onPress={() => {
						setMoves(prev => prev + 1)
						if (!activeDisc && tower.length) {
							setActiveDisc(tower[tower.length - 1])
						} else if (activeDisc && tower.some(i => i.id === activeDisc.id)) {
							setActiveDisc(null)
						} else if (activeDisc) {
							const newTower = towers[index]
							const isValidate = newTower.length
								? newTower[newTower.length - 1].id > activeDisc.id
								: true
							if (isValidate) {
								const updatedTowers = towers.map((item, tIndex) => {
									if (
										tIndex !== index &&
										item.some(i => i.id === activeDisc.id)
									) {
										return item.filter(i => i.id !== activeDisc.id)
									}
									if (tIndex === index) {
										return [...item, activeDisc]
									}
									return item
								})
								setActiveDisc(null)
								setTowers(updatedTowers)
								setIsError(false)
								setIsWin(isSolved())
							} else {
								setIsError(true)
							}
						}
					}}
				>
					<View style={[styles.tower]}>
						{tower.map((disc, discIndex) => {
							const isActiveDisc = disc?.id === activeDisc?.id
							const positionBottom = discIndex * 25
							return (
								<View
									key={disc?.id}
									style={[
										styles.disc,
										{
											width: disc?.id * 10 + 50,
											bottom: positionBottom
										},
										{
											bottom: isActiveDisc
												? positionBottom + (5 - discIndex) * 25 + 50
												: positionBottom,
											backgroundColor: isActiveDisc ? "#E57300" : "#E57300"
										}
									]}
								/>
							)
						})}
					</View>
					<View
						style={{
							height: "100%",
							backgroundColor: "#E57300",
							width: 2,
							position: "absolute",
							borderRadius: 10,
							pointerEvents: "none",
							zIndex: -1
						}}
					/>
				</TouchableOpacity>
			)
		})
	}

	return (
		<View style={styles.container}>
			<TextComponent
				children={`Move all the discs from the left tower to the right one at a time. A disc cannot be on top of a smaller disc. Have fun!`}
				className='max-w-[440px] mb-[14px]'
			/>
			<TextComponent
				children={`You have made ${moves} moves.`}
				className='text-accent'
			/>
			<View
				style={{
					marginTop: 10,
					height: 40
				}}
			>
				{isError && (
					<TextComponent
						children='This is an impossible move'
						className='font-title'
					/>
				)}
				{isWin && (
					<TextComponent
						children='Congratulations, you won!'
						className='font-title'
					/>
				)}
			</View>
			<View>
				{/*<Text style={styles.moves}>{moves} Moves</Text>*/}
				<TouchableOpacity style={styles.restart} onPress={initGame}>
					<MaterialIcons name='restart-alt' style={styles.restartIcon} />
				</TouchableOpacity>
			</View>
			<View style={styles.towers}>{renderTowers()}</View>
			{/*<View*/}
			{/*	style={{*/}
			{/*		flexDirection: "row"*/}
			{/*	}}*/}
			{/*>*/}
			{/*	<Button*/}
			{/*		children='Restart'*/}
			{/*		onPress={initGame}*/}
			{/*		className='mt-14'*/}
			{/*		styleButton={{*/}
			{/*			minWidth: 140*/}
			{/*		}}*/}
			{/*	/>*/}
			{/*	/!*<TouchableOpacity onPress={initGame} style={styles.restartButton}>*!/*/}
			{/*	/!*	<TextComponent style={styles.buttonText}>Restart</TextComponent>*!/*/}
			{/*	/!*</TouchableOpacity>*!/*/}
			{/*	/!*<TouchableOpacity onPress={moveDiscs}>*!/*/}
			{/*	/!*	<Text style={styles.buttonText}>Move Discs</Text>*!/*/}
			{/*	/!*</TouchableOpacity>*!/*/}
			{/*</View>*/}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	restart: {
		marginLeft: "auto"
	},
	restartIcon: {
		fontSize: 24,
		color: "#000"
	},
	message: {
		width: "100%",
		maxWidth: 400,
		marginVertical: 20,
		padding: 20,
		textAlign: "center",
		textTransform: "uppercase",
		letterSpacing: 2,
		fontWeight: "500",
		fontSize: 18,
		color: "black",
		marginBottom: 60
	},
	towers: {
		height: 240,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
		gap: 30
	},
	towerContainer: {
		height: 140,
		flexDirection: "column",
		position: "relative",
		justifyContent: "flex-end",
		alignItems: "center",
		minWidth: 100
	},
	tower: {
		position: "relative",
		alignItems: "center",
		borderColor: "#E57300",
		borderWidth: 1,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		width: 100,
		marginTop: "auto"
	},
	disc: {
		position: "absolute",
		bottom: 10,
		backgroundColor: "white",
		borderRadius: 10,
		height: 20,
		zIndex: 1
	},
	towerPressArea: {
		position: "absolute",

		width: 100,
		height: 100,
		backgroundColor: "transparent"
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
