import Games from "@/components/screens/games/Games"
import Puzzles from "@/components/screens/puzzles/Puzzles"
import Tests from "@/components/screens/tests/Tests"
import Today from "@/components/screens/today/Today"
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
