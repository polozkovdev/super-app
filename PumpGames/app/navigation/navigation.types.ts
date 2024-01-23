import { ComponentType } from "react"

export type TypeRootStackParamList = {
	Auth: undefined
	Today: undefined
	Games: undefined
	Puzzles: undefined
	Tests: undefined
	Profile: undefined
}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
}
