import Games from "@/components/screens/games/Games"
import Puzzles from "@/components/screens/puzzles/Puzzles"
import Tests from "@/components/screens/tests/Tests"
import Today from "@/components/screens/today/Today"
import BlockDocku from "@/games/BlockDocku/BlockDocku"
import Cars from "@/games/Cars/Cars"
import Man from "@/games/Man/Man"
import BlickPuzzle from "@/games/native/BlickPuzzle"
import Test from "@/games/Test/Test"
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
		name: "Cars",
		component: Cars
	},
	{
		name: "Man",
		component: Man
	},
	{
		name: "BlickPuzzle",
		component: BlickPuzzle
	},
	{
		name: "Test",
		component: Test
	}
]
