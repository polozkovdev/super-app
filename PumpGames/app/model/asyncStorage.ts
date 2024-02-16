import AsyncStorage from "@react-native-async-storage/async-storage"
import { IDB, IGame, IPlayer } from "types"

export class AsyncStorageDB {
	async createTable({ Games }: { Games: IGame[] }): Promise<boolean> {
		try {
			const gamesCount = await AsyncStorage.getItem("gamesCount")
			if (!gamesCount) {
				// Insert default games if Games table is empty
				await AsyncStorage.setItem("app", JSON.stringify(Games))
			}
			return true
		} catch (error) {
			throw new Error("Failed to create tables: " + error.message)
		}
	}

	async getGameByName(name: string): Promise<IGame | null> {
		try {
			const games = await AsyncStorage.getItem("app")
			if (games) {
				const parsedGames: IGame[] = JSON.parse(games)
				const game = parsedGames.find(game => game.name === name)
				return game ? game : null
			}
			return null
		} catch (error) {
			throw new Error("Failed to get game by name: " + error.message)
		}
	}

	async updateGame(game: IGame): Promise<void> {
		try {
			const games = await AsyncStorage.getItem("app")
			if (games) {
				const parsedGames: IGame[] = JSON.parse(games)
				const index = parsedGames.findIndex(g => g.name === game.name)
				if (index !== -1) {
					parsedGames[index] = game
					await AsyncStorage.setItem("app", JSON.stringify(parsedGames))
				}
			}
		} catch (error) {
			throw new Error("Failed to update game: " + error.message)
		}
	}

	async updatePlayer(player: IPlayer): Promise<void> {
		try {
			await AsyncStorage.setItem(
				"app",
				JSON.stringify({
					userName: player.userName,
					photo: player.photo,
					rewards: player.rewards?.join(","),
					notifications: player.notifications?.join(","),
					hotDeals: player.hotDeals?.join(","),
					progress: JSON.stringify(player.progress)
				})
			)
		} catch (error) {
			throw new Error("Failed to update player data.")
		}
	}

	async updateGames(games: IGame[]): Promise<void> {
		try {
			await AsyncStorage.setItem("app", JSON.stringify(games))
		} catch (error) {
			throw new Error("Failed to update games.")
		}
	}

	async getData(): Promise<IDB> {
		try {
			const games = await AsyncStorage.getItem("app")
			const player = await AsyncStorage.getItem("player")
			if (games && player) {
				const parsedGames: IGame[] = JSON.parse(games)
				const parsedPlayer: IPlayer = JSON.parse(player)
				return { Games: parsedGames, Player: parsedPlayer }
			} else {
				return { Games: [], Player: {} as IPlayer }
			}
		} catch (error) {
			throw new Error("Failed to get data: " + error.message)
		}
	}
}

const asyncStorageDB = new AsyncStorageDB()
export default asyncStorageDB
