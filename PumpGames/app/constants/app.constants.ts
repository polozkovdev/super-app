import { TypeRootStackParamList } from "@/navigation/navigation.types"
import { ImageSourcePropType } from "react-native"

export const AppConstants = {
	// background colors
	primaryBackground: "#F8F4E8",

	// colors
	primary: "#3F1210",
	secondary: "#522725",
	accent: "#9B4AFF",
	orange: "#E57300"
}

export const GAMES_URI = {
	BlockDocku: "https://pump-games.com/block-puzzle-game/index.html",
	Cars: "https://html5.gamedistribution.com/rvvASMiM/8029fd9134ab4c6690e86a0480ee3daf/index.html?gd_sdk_referrer_url=https%3A%2F%2Fru.y8.com%2Fgames%2Fclassic_1990_racing_3d&key=y8&value=default&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2h0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tLzgwMjlmZDkxMzRhYjRjNjY5MGU4NmEwNDgwZWUzZGFmLz9nZF9zZGtfcmVmZXJyZXJfdXJsPWh0dHBzOi8vcnUueTguY29tL2dhbWVzL2NsYXNzaWNfMTk5MF9yYWNpbmdfM2Qma2V5PXk4JnZhbHVlPWRlZmF1bHQiLCJwYXJlbnREb21haW4iOiJydS55OC5jb20iLCJ0b3BEb21haW4iOiJydS55OC5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xNyJ9",
	Man: "https://html5.gamedistribution.com/997e89b1cda74adcab5724f711cbcc9f/"
}

export enum CATEGORIES {
	All = "All",
	Free = "Free",
	Relax = "Relax",
	Focus = "Focus",
	Memory = "Memory",
	ProblemSolving = "Problem Solving",
	Challenge = "Challenge"
}

export const CATEGORIES_LIST = [
	CATEGORIES.All,
	CATEGORIES.Free,
	CATEGORIES.Relax,
	CATEGORIES.Focus,
	CATEGORIES.Memory,
	CATEGORIES.ProblemSolving,
	CATEGORIES.Challenge
]

export interface IGame {
	name: string
	categories: CATEGORIES[]
	source?: ImageSourcePropType
	route: keyof TypeRootStackParamList
	description: string
}

export const GAMES: IGame[] = [
	{
		name: "Tetris",
		categories: [CATEGORIES.All, CATEGORIES.Free, CATEGORIES.Focus],
		source: require("@/assets/games/game_1.png"),
		route: "Tetris",
		description: "Tetris"
	},
	{
		name: "Block Puzzle Game",
		categories: [CATEGORIES.All, CATEGORIES.Free, CATEGORIES.ProblemSolving],
		source: require("@/assets/games/game_8.png"),
		route: "BlockDocku",
		description: "Problem solving"
	},
	{
		name: "Symbol Search",
		categories: [CATEGORIES.All, CATEGORIES.Free, CATEGORIES.Memory],
		source: require("@/assets/games/game_9.png"),
		route: "Memory",
		description: "Memory"
	},
	{
		name: "Word Search",
		categories: [CATEGORIES.All, CATEGORIES.Free, CATEGORIES.Focus],
		source: require("@/assets/games/game_3.png"),
		route: "WordSearch",
		description: "Focus"
	}
]
