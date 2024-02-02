import { ComponentType } from "react"

export type CATEGORY_TYPES = "Solving" | "Memory" | "Focus" | "Relax"

export type TypeRootStackParamList = {
	Auth: undefined
	Today: undefined
	Games: undefined
	Puzzles: undefined
	Tests: undefined
	Profile: undefined

	// games
	BlockDocku: undefined
	Man: undefined
	Game: undefined
	Cars: undefined
	Memory: undefined
	Test: undefined
	WordSearch: undefined
}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
	isHidden?: boolean
}

export interface IGame {
	name: string
	component: ComponentType
	isHidden?: boolean
	category: CATEGORY_TYPES
}
