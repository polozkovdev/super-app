import { CATEGORIES } from "@/constants/app.constants"
import { ComponentType } from "react"
import { IGame } from "types"

export type CATEGORY_TYPES = "Solving" | "Memory" | "Focus" | "Relax"

const completedBoard_01 = [
	["5", "3", "4", "6", "7", "8", "9", "1", "2"],
	["6", "7", "2", "1", "9", "5", "3", "4", "8"],
	["1", "9", "8", "3", "4", "2", "5", "6", "7"],
	["8", "5", "9", "7", "6", "1", "4", "2", "3"],
	["4", "2", "6", "8", "5", "3", "7", "9", "1"],
	["7", "1", "3", "9", "2", "4", "8", "5", "6"],
	["9", "6", "1", "5", "3", "7", "2", "8", "4"],
	["2", "8", "7", "4", "1", "9", "6", "3", "5"],
	["3", "4", "5", "2", "8", "6", "1", "7", "9"]
]

export type TypeRootStackParamList = {
	Auth: undefined
	Today: undefined
	Games: undefined
	Puzzles: undefined
	GameOverview: undefined
	Tests: undefined
	Profile: undefined

	// games
	BlockDocku: undefined
	SymbolSearch: undefined
	Sudoku: undefined
	Math: undefined
	HanoiTower: undefined
	Test: undefined

	Tetris: undefined
	WordSearch: undefined
}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
	isHidden?: boolean
}

export const DEFAULT_GAMES: IGame[] = [
	{
		name: "SymbolSearch",
		route: "SymbolSearch",
		title: "Symbol Search",
		categories: [CATEGORIES.Focus, CATEGORIES.Memory],
		isFree: true,
		isCompleted: false,
		isProgress: false,
		completeStep: 0,
		currentStep: 1,
		steps: 5,
		initialPaidStep: undefined,
		timer: 0,
		rewards: [],
		benefits: []
	},
	{
		name: "Sudoku",
		route: "Sudoku",
		title: "Sudoku",
		categories: [CATEGORIES.ProblemSolving],
		isFree: true,
		isCompleted: false,
		isProgress: false,
		currentStep: 1,
		completeStep: 0,
		steps: 5,
		initialPaidStep: undefined,
		timer: 0,
		rewards: [],
		benefits: []
	},
	{
		name: "Math",
		route: "Math",
		title: "Math",
		categories: [CATEGORIES.Challenge],
		isFree: true,
		isCompleted: false,
		isProgress: false,
		currentStep: 1,
		completeStep: 0,
		steps: 7,
		initialPaidStep: undefined,
		timer: 0,
		rewards: [],
		benefits: []
	},
	{
		name: "HanoiTower",
		route: "HanoiTower",
		title: "Hanoi Tower",
		categories: [CATEGORIES.Challenge],
		isFree: true,
		isCompleted: false,
		isProgress: false,
		currentStep: 1,
		completeStep: 0,
		steps: 10,
		initialPaidStep: undefined,
		timer: 0,
		rewards: [],
		benefits: []
	}
	// {
	// 	name: "BlockDocku",
	// 	route: "BlockDocku",
	// 	title: "Block Puzzle",
	// 	categories: [CATEGORIES.Focus],
	// 	isFree: true,
	// 	isCompleted: false,
	// 	isProgress: false,
	// 	currentStep: 1,
	// 	completeStep: 0,
	// 	steps: 5,
	// 	initialPaidStep: undefined,
	// 	timer: 0,
	// 	rewards: [],
	// 	benefits: []
	// },
	// {
	// 	name: "Test",
	// 	route: "Test",
	// 	title: "Test",
	// 	categories: [CATEGORIES.Focus],
	// 	isFree: true,
	// 	isCompleted: false,
	// 	isProgress: false,
	// 	currentStep: 1,
	// 	completeStep: 0,
	// 	steps: 5,
	// 	initialPaidStep: undefined,
	// 	timer: 0,
	// 	rewards: [],
	// 	benefits: []
	// }
]
