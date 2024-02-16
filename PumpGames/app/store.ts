import asyncStorageDB from "@/model/asyncStorage"
import { DEFAULT_GAMES } from "@/navigation/navigation.types"
import * as Notifications from "expo-notifications"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"
import { IGame, IPlayer } from "types"

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false
	})
})

export class UiState {
	visitedCount: number = 0
	isRated: boolean = false
	isLiked: boolean | null = false
	isShowLikeInSession: boolean = false
	isShowRateInSession: boolean = false

	constructor() {
		makeAutoObservable(this)
	}
}

export class DBState {
	isLoaded: boolean = false
	Player: IPlayer = {
		userName: "User Name",
		photo: "",
		rewards: [],
		notifications: [],
		hotDeals: [],
		progress: {
			games: [],
			puzzles: [],
			tests: []
		}
	}
	Games: IGame[] = []
	Puzzles: IGame[] = []
	Tests: IGame[] = []

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })

		this.initDB()
	}

	initDB() {
		console.log("initDB")
		asyncStorageDB
			.createTable({
				Games: DEFAULT_GAMES
			})
			.then(
				action("fetchSuccess", () => {
					this.getData()
				}),
				action("fetchError", error => {
					console.log(error)
				})
			)
	}

	getData = (): Promise<{
		Player: IPlayer
		Games: IGame[]
		Puzzles: IGame[]
		Tests: IGame[]
	}> => {
		return new Promise((resolve, reject) => {
			asyncStorageDB.getData().then(
				action("fetchSuccess", data => {
					this.Player = data.Player
					this.Games = data.Games
					this.Puzzles = data.Puzzles
					this.Tests = data.Tests
					this.isLoaded = true
					resolve(data) // Resolve with the fetched data
				}),
				action("fetchError", error => {
					console.error("Error fetching data:", error) // Add this line
					reject(error) // Reject with the error
				})
			)
		})
	}

	getGameByName = async (name: string) => {
		try {
			const game = await asyncStorageDB.getGameByName(name)
			return game
		} catch (error) {
			console.error("Error fetching specific game:", error)
		}
	}

	updateGame = (game: IGame) => {
		asyncStorageDB.updateGame(game).then(
			action("updateGameSuccess", () => {
				// Update the game in the local state
				const index = this.Games.findIndex(g => g.name === game.name)
				if (index !== -1) {
					this.Games[index] = game
				}
			}),
			action("updateGameError", error => {
				console.log("Error updating game:", error)
			})
		)
	}

	updatePlayer = (player: IPlayer) => {
		asyncStorageDB.updatePlayer(player).then(
			action("updatePlayerSuccess", () => {
				this.Player = player
			}),
			action("updatePlayerError", error => {
				console.log("Error updating player:", error)
			})
		)
	}

	updateGames = (games: IGame[]) => {
		asyncStorageDB.updateGames(games).then(
			action("updateGamesSuccess", () => {
				this.Games = games
			}),
			action("updateGamesError", error => {
				console.log("Error updating games:", error)
			})
		)
	}
}

export class CoreStore {
	db: DBState
	uiState: UiState
	previousRoute: string | null = null

	constructor() {
		this.db = new DBState()
		this.uiState = new UiState()
		makeAutoObservable(this)
	}

	updatePreviousRoute(route: string) {
		this.previousRoute = route
	}

	getPreviousRoute() {
		return this.previousRoute
	}
}

export const coreStore = new CoreStore()

export const StoreContext = createContext(coreStore)
export const StoreProvider = StoreContext.Provider
export const useStore = () => {
	return useContext(StoreContext)
}
