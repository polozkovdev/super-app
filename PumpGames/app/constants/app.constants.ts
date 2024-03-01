import { TypeRootStackParamList } from "@/navigation/navigation.types"
import { Dimensions, ImageSourcePropType } from "react-native"

export const PAGE_WIDTH = Dimensions.get("window").width * 0.9
export const AppConstants = {
	// background colors
	primaryBackground: "#F8F4E8",

	// colors
	primary: "#3F1210",
	secondary: "#522725",
	accent: "#9B4AFF",
	orange: "#E57300"
}

export const SHADOW = {
	shadowColor: "#000",
	shadowOpacity: 0.1,
	shadowOffset: {
		width: 0,
		height: 4
	},
	shadowRadius: 10
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
		name: "Symbol Search",
		categories: [CATEGORIES.All, CATEGORIES.Free, CATEGORIES.Memory],
		source: require("@/assets/ui/memory2.png"),
		route: "SymbolSearch",
		description: "Memory"
	},
	{
		name: "Sudoku",
		categories: [CATEGORIES.All, CATEGORIES.Free, CATEGORIES.ProblemSolving],
		source: require("@/assets/ui/sudoke2.png"),
		route: "Sudoku",
		description: "Problem solving"
	},
	{
		name: "Math",
		categories: [CATEGORIES.All, CATEGORIES.Free, CATEGORIES.ProblemSolving],
		source: require("@/assets/ui/math2.png"),
		route: "Math",
		description: "Problem solving"
	},
	{
		name: "Honoi Tower",
		categories: [CATEGORIES.All, CATEGORIES.Free, CATEGORIES.ProblemSolving],
		source: require("@/assets/ui/honoi3.png"),
		route: "HanoiTower",
		description: "Problem solving"
	},
	{
		name: "Block Puzzle Game",
		categories: [CATEGORIES.All, CATEGORIES.Free, CATEGORIES.ProblemSolving],
		source: require("@/assets/ui/blick.png"),
		route: "BlockDocku",
		description: "Problem solving"
	}
]

export const SYMBOL_SEARCH_STRINGS = [
	"android",
	"apple",
	"balance-scale",
	"baby",
	"bug",
	"bell",
	"bus",
	"chess-knight",
	"cut",
	"drum",
	"fish",
	"frog",
	"horse",
	"car",
	"clock",
	"coffee",
	"bicycle",
	"leaf",
	"cube",
	"anchor",
	"paper-plane",
	"bolt",
	"bomb",
	"carrot"
]

export const shuffle = (array: string[]) => {
	const newArray = [...array] // Make a copy of the array
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
	}
	return newArray
}

export const generateSymbolSearchData = (currentStep: number) => {
	const getDataGame = () => {
		switch (currentStep) {
			case 1:
				return {
					gameCardsQTY: 16,
					repeatCount: 2,
					pairsCount: 8
				}
			case 2:
				return {
					gameCardsQTY: 16,
					repeatCount: 2,
					pairsCount: 8
				}
			case 3:
				return {
					gameCardsQTY: 36,
					repeatCount: 2,
					pairsCount: 18
				}
			default:
				return {
					gameCardsQTY: 64,
					repeatCount: 2,
					pairsCount: 32
				}
		}
	}
	const generateRandomPairsOrTriples = ({
		strings,
		repeatCount,
		pairsCount
	}: {
		strings: string[]
		repeatCount: number
		pairsCount: number
	}) => {
		const resultArray: string[] = []
		const randomString = shuffle([...strings]).slice(0, pairsCount)
		for (let i = 0; i < repeatCount; i++) {
			resultArray.push(...randomString)
		}
		return shuffle(resultArray)
	}
	const { gameCardsQTY, repeatCount, pairsCount } = getDataGame()
	const symbols = generateRandomPairsOrTriples({
		strings: SYMBOL_SEARCH_STRINGS,
		repeatCount,
		pairsCount
	})
	return {
		symbols,
		gameCardsQTY,
		pairsCount,
		repeatCount
	}
}
