import MathGame from "@/games/native/MathGame"
import Sudoku from "@/games/native/Sudoku"
import SymbolSearch from "@/games/native/SymbolSearch"
import Tetris from "@/games/native/Tetris"
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
		name: "Math",
		component: MathGame
	},
	{
		name: "SymbolSearch",
		component: SymbolSearch
	},
	{
		name: "Sudoku",
		component: Sudoku
	},
	{
		name: "Tetris",
		component: Tetris
	}
]
