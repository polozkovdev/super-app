import { CATEGORIES } from "@/constants/app.constants"
import { ComponentType } from "react"
import { IGame } from "types"

export type CATEGORY_TYPES = "Solving" | "Memory" | "Focus" | "Relax"

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
		currentStep: 1,
		steps: 10,
		initialPaidStep: undefined,
		timer: 0,
		rewards: [],
		benefits: [
			{
				title: "Decision making",
				description:
					"Improve your ability to make informed and effective choices",
				source: require("@/assets/ui/benifits_01.png")
			},
			{
				title: "Visual processing speed",
				description:
					"Boost the speed at which you process and react to visual information",
				source: require("@/assets/ui/benifits_02.png")
			},
			{
				title: "Problem solving",
				description:
					"Improve your ability to identify solutions to complex issues",
				source: require("@/assets/ui/benifits_03.png")
			}
		]
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
		steps: 5,
		initialPaidStep: undefined,
		timer: 0,
		rewards: [],
		benefits: [
			{
				title: "Decision making",
				description:
					"Improve your ability to make informed and effective choices",
				source: require("@/assets/ui/benifits_01.png")
			},
			{
				title: "Visual processing speed",
				description:
					"Boost the speed at which you process and react to visual information",
				source: require("@/assets/ui/benifits_02.png")
			},
			{
				title: "Problem solving",
				description:
					"Improve your ability to identify solutions to complex issues",
				source: require("@/assets/ui/benifits_03.png")
			}
		]
	},
	{
		name: "Block Puzzle",
		route: "BlockDocku",
		title: "Block Puzzle",
		categories: [CATEGORIES.Focus],
		isFree: true,
		isCompleted: false,
		isProgress: false,
		currentStep: 1,
		steps: 5,
		initialPaidStep: undefined,
		timer: 0,
		rewards: [],
		benefits: [
			{
				title: "Decision making",
				description:
					"Improve your ability to make informed and effective choices",
				source: require("@/assets/ui/benifits_01.png")
			},
			{
				title: "Visual processing speed",
				description:
					"Boost the speed at which you process and react to visual information",
				source: require("@/assets/ui/benifits_02.png")
			},
			{
				title: "Problem solving",
				description:
					"Improve your ability to identify solutions to complex issues",
				source: require("@/assets/ui/benifits_03.png")
			}
		]
	}
]
