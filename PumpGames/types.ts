import { CATEGORIES } from "@/constants/app.constants"
import { TypeRootStackParamList } from "@/navigation/navigation.types"
import { ImageSourcePropType } from "react-native"

export interface IPlayer {
	userName: string
	photo: string
	rewards: string[]
	notifications: string[]
	hotDeals: string[]
	progress: {
		games: string[]
		puzzles: string[]
		tests: string[]
	}
}

export interface IGame {
	name: string
	title: string
	route: keyof TypeRootStackParamList
	categories: CATEGORIES[]
	isFree: boolean
	isCompleted: boolean
	isProgress: boolean
	currentStep: number
	steps: number
	initialPaidStep?: number
	benefits: {
		title: string
		description: string
		source?: ImageSourcePropType
	}[]
	timer: number
	rewards: string[]
}

export interface IDB {
	Player: IPlayer
	Games: IGame[]
	Puzzles: IGame[]
	Tests: IGame[]
}
