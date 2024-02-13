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
		categories: ["Focus", "Memory"],
		isFree: true,
		isCompleted: false,
		isProgress: false,
		currentStep: 0,
		steps: 5,
		initialPaidStep: undefined,
		timer: 0,
		rewards: []
	}
]
