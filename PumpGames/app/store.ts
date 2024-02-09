import * as Notifications from "expo-notifications"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"
import { IGame, IPlayer } from "types"
import asyncStorage from "./model/asyncStorage"
import dbSqLite from "./model/dbSQLite"

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

		this.getVisitedCount()
		this.isLikedApp()
		this.isRatedApp()
	}

	get isNeedShowLikePopup(): boolean {
		return (
			!this.isShowLikeInSession &&
			this.isLiked === null &&
			this.visitedCount > 2
		)
	}

	get isNeedShowRatePopup(): boolean {
		return (
			!this.isShowLikeInSession &&
			!this.isShowRateInSession &&
			!this.isRated &&
			!!this.isLiked &&
			this.visitedCount > 3
		)
	}

	getVisitedCount() {
		asyncStorage.updateUserVisitedCount().then(
			action("fetchSuccess", count => {
				this.visitedCount = count
			}),
			action("fetchError", error => {
				console.log(error)
			})
		)
	}

	isRatedApp() {
		asyncStorage.isRatedApp().then(
			action("fetchSuccess", isRated => {
				this.isRated = isRated
			}),
			action("fetchError", error => {
				console.log(error)
			})
		)
	}

	isLikedApp() {
		asyncStorage.isLakedApp().then(
			action("fetchSuccess", isLiked => {
				this.isLiked =
					isLiked === "true" ? true : isLiked === "false" ? false : null
			}),
			action("fetchError", error => {
				console.log(error)
			})
		)
	}

	likeApp(value: boolean) {
		asyncStorage.likeApp(value).then(
			action("fetchSuccess", () => {
				this.isLiked = value
			}),
			action("fetchError", error => {
				console.log(error)
			})
		)
	}

	rateApp() {
		asyncStorage.rateApp().then(
			action("fetchSuccess", () => {
				this.isRated = true
			}),
			action("fetchError", error => {
				console.log(error)
			})
		)
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
		dbSqLite.createTable().then(
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
			dbSqLite.getData().then(
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
			return await dbSqLite.getGameByName(name)
		} catch (error) {
			console.error("Error fetching specific game:", error)
		}
	}

	updateGame = (game: IGame) => {
		dbSqLite.updateGame(game).then(
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
		dbSqLite.updatePlayer(player).then(
			action("updatePlayerSuccess", () => {
				this.Player = player
			}),
			action("updatePlayerError", error => {
				console.log("Error updating player:", error)
			})
		)
	}

	updateGames = (games: IGame[]) => {
		dbSqLite.updateGames(games).then(
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

	constructor() {
		this.db = new DBState()
		this.uiState = new UiState()
	}
}

export const coreStore = new CoreStore()

export const StoreContext = createContext(coreStore)
export const StoreProvider = StoreContext.Provider
export const useStore = () => {
	return useContext(StoreContext)
}
