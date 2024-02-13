import SymbolSearch from "@/games/native/SymbolSearch"
import Tetris from "@/games/native/Tetris"
import WordSearchGame from "@/games/native/WordSearchGame"
import BlockDocku from "@/games/webview/BlockDocku/BlockDocku"
import { IRoute } from "@/navigation/navigation.types"
import GameOverview from "@/screens/gameOverview/GameOverview"
import Games from "@/screens/games/Games"
import Puzzles from "@/screens/puzzles/Puzzles"
import Tests from "@/screens/tests/Tests"
import Today from "@/screens/today/Today"

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
		name: "GameOverview",
		component: GameOverview
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
		name: "SymbolSearch",
		component: SymbolSearch
	},
	{
		name: "Tetris",
		component: Tetris
	}
]
