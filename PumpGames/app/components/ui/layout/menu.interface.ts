import { TypeRootStackParamList } from "@/navigation/navigation.types"
import { AntDesign } from "@expo/vector-icons"

export interface IMenuInterface {
	iconName: keyof typeof AntDesign.glyphMap
	path: keyof TypeRootStackParamList
	text: string
}

export type TypeNav = (name: keyof TypeRootStackParamList) => void
