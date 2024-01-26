import { ComponentType } from "react"

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
	BlickPuzzle: undefined
}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
	isHidden?: boolean
}
