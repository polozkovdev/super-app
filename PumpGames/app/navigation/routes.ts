import Games from "@/components/screens/games/Games"
import Puzzles from "@/components/screens/puzzles/Puzzles"
import Tests from "@/components/screens/tests/Tests"
import Today from "@/components/screens/today/Today"
import Memory from "@/games/native/Memory"
import Tetris from "@/games/native/Tetris"
import WordSearchGame from "@/games/native/WordSearchGame"
import BlockDocku from "@/games/webview/BlockDocku/BlockDocku"
import { IRoute } from "@/navigation/navigation.types"

export const routes: IRoute[] = [
	{
		name: "Today",
		component: Today
	},
	{
		name: "Games",
		component: Games
	},
	{
		name: "Puzzles",
		component: Puzzles
	},
	{
		name: "Tests",
		component: Tests
	}
]

export const games: IRoute[] = [
	{
		name: "BlockDocku",
		component: BlockDocku
	},
	{
		name: "WordSearch",
		component: WordSearchGame
	},
	{
		name: "Memory",
		component: Memory
	},
	{
		name: "Tetris",
		component: Tetris
	}
]
