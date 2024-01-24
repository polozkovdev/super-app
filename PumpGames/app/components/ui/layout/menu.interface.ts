import { TypeRootStackParamList } from "@/navigation/navigation.types"

export interface IMenuItem {
	path: keyof TypeRootStackParamList
	text: string
	icon: {
		path: string
		viewBox: string
		width: number
		height: number
	}
}

export type TypeNav = (name: keyof TypeRootStackParamList) => void
