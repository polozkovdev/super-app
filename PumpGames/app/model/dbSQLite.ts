import { openDatabase, SQLResultSetRowList, WebSQLDatabase } from "expo-sqlite"
import { IDB, IGame, IPlayer } from "types"

export class SQLiteDB {
	db: WebSQLDatabase

	constructor() {
		this.db = openDatabase("db.db")
	}

	createTable = async ({ Games }: { Games: IGame[] }): Promise<boolean> => {
		console.log("create table")
		return new Promise((resolve, reject) => {
			this.db.transaction(
				tx => {
					tx.executeSql(
						`CREATE TABLE IF NOT EXISTS PlayerTest
             (
                 userName      TEXT PRIMARY KEY,
                 photo         TEXT,
                 rewards       TEXT,
                 notifications TEXT,
                 hotDeals      TEXT,
                 progress      TEXT
             )`
					)
					tx.executeSql(
						`CREATE TABLE IF NOT EXISTS GamesTest
             (
                 name            TEXT PRIMARY KEY,
                 categories      TEXT,
                 isFree          INTEGER,
                 isCompleted     INTEGER,
                 isProgress      INTEGER,
                 currentStep     INTEGER,
                 steps           INTEGER,
                 initialPaidStep INTEGER,
                 timer           INTEGER,
                 rewards         TEXT
             )`
					)

					// Check if GamesTest table is empty
					tx.executeSql(
						`SELECT COUNT(*) AS count FROM GamesTest`,
						[],
						(_, { rows }) => {
							const { count } = rows.item(0)
							if (count === 0) {
								// If table is empty, insert default games
								Games.forEach(item => {
									this.insertDefaultGame(tx, item)
								})
							}
						},
						error => {
							reject(error.message)
						}
					)
					tx.executeSql(
						`CREATE TABLE IF NOT EXISTS PuzzlesTest
             (
                 name            TEXT PRIMARY KEY,
                 categories      TEXT,
                 isFree          INTEGER,
                 isCompleted     INTEGER,
                 isProgress      INTEGER,
                 currentStep     INTEGER,
                 steps           INTEGER,
                 initialPaidStep INTEGER,
                 timer           INTEGER,
                 rewards         TEXT
             )`
					)
					tx.executeSql(
						`CREATE TABLE IF NOT EXISTS TestsTest
             (
                 name            TEXT PRIMARY KEY,
                 categories      TEXT,
                 isFree          INTEGER,
                 isCompleted     INTEGER,
                 isProgress      INTEGER,
                 currentStep     INTEGER,
                 steps           INTEGER,
                 initialPaidStep INTEGER,
                 timer           INTEGER,
                 rewards         TEXT
             )`
					)
				},
				error => {
					reject(error.message)
				},
				() => {
					resolve(true)
				}
			)
		})
	}

	getGameByName = async (name: string): Promise<IGame | null> => {
		console.log("NAME", name)
		return new Promise((resolve, reject) => {
			this.db.transaction(
				tx => {
					tx.executeSql(
						"SELECT * FROM GamesTest WHERE name = ?",
						[name],
						(_, { rows }: { rows: SQLResultSetRowList }) => {
							if (rows.length > 0) {
								const row = rows.item(0)
								const game: IGame = {
									name: row.name,
									categories: row.categories.split(","),
									isFree: row.isFree === 1,
									isCompleted: row.isCompleted === 1,
									isProgress: row.isProgress === 1,
									currentStep: row.currentStep,
									steps: row.steps,
									initialPaidStep: row.initialPaidStep,
									timer: row.timer,
									rewards: row.rewards.split(",")
								}
								console.log("game", game)
								resolve(game)
							} else {
								resolve(null) // No game found with the given name
							}
						},
						(_, error) => {
							reject(error.message)
						}
					)
				},
				error => {
					reject(error.message)
				}
			)
		})
	}

	updateGame = async (game: IGame): Promise<void> => {
		return new Promise((resolve, reject) => {
			this.db.transaction(
				tx => {
					tx.executeSql(
						`UPDATE GamesTest
             SET categories=?,
                 isFree=?,
                 isCompleted=?,
                 isProgress=?,
                 currentStep=?,
                 steps=?,
                 initialPaidStep=?,
                 timer=?,
                 rewards=?
             WHERE name = ?`,
						[
							game.categories.join(","),
							game.isFree ? 1 : 0,
							game.isCompleted ? 1 : 0,
							game.isProgress ? 1 : 0,
							game.currentStep,
							game.steps,
							game.initialPaidStep,
							game.timer,
							game.rewards?.join(","),
							game.name
						],
						(_, { rowsAffected }) => {
							if (rowsAffected > 0) {
								resolve()
							} else {
								reject("Failed to update game.")
							}
						}
					)
				},
				error => {
					reject(error.message)
				}
			)
		})
	}

	updatePlayer = async (player: IPlayer): Promise<void> => {
		return new Promise((resolve, reject) => {
			this.db.transaction(
				tx => {
					tx.executeSql(
						`INSERT OR
             REPLACE INTO PlayerTest
                 (userName, photo, rewards, notifications, hotDeals, progress)
             VALUES (?, ?, ?, ?, ?, ?)`,
						[
							player.userName,
							player.photo,
							player.rewards?.join(","),
							player.notifications?.join(","),
							player.hotDeals?.join(","),
							JSON.stringify(player.progress)
						],
						(_, { rowsAffected }) => {
							if (rowsAffected > 0) {
								resolve()
							} else {
								reject("Failed to update player data.")
							}
						}
					)
				},
				error => {
					reject(error.message)
				}
			)
		})
	}

	updateGames = async (games: IGame[]): Promise<void> => {
		return new Promise((resolve, reject) => {
			this.db.transaction(
				tx => {
					games.forEach(game => {
						tx.executeSql(
							`INSERT OR
               REPLACE INTO GamesTest
               (name, categories, isFree, isCompleted, isProgress, currentStep, steps, initialPaidStep, timer, rewards)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
							[
								game.name,
								game.categories.join(","),
								game.isFree ? 1 : 0,
								game.isCompleted ? 1 : 0,
								game.isProgress ? 1 : 0,
								game.currentStep,
								game.steps,
								game.initialPaidStep,
								game.timer,
								game.rewards?.join(",")
							]
						)
					})
				},
				error => {
					reject(error.message)
				},
				() => {
					resolve()
				}
			)
		})
	}
	// checkDefaultGamesExist = (tx: any, gameNames: string[]) => {
	// 	// Check if default games exist in GamesTest table
	// 	gameNames.forEach(gameName => {
	// 		tx.executeSql(
	// 			`SELECT * FROM GamesTest WHERE name = ?`,
	// 			[gameName],
	// 			(_, { rows }) => {
	// 				if (rows.length === 0) {
	// 					// If default game doesn't exist, insert it
	// 					this.insertDefaultGame(tx, gameName)
	// 				}
	// 			},
	// 			error => {
	// 				console.error("Error checking default game existence:", error)
	// 			}
	// 		)
	// 	})
	// }

	insertDefaultGame = (tx: any, Game: IGame) => {
		// Insert default game into GamesTest table
		tx.executeSql(
			`INSERT INTO GamesTest 
        (name, categories, isFree, isCompleted, isProgress, currentStep, steps, initialPaidStep, timer, rewards) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				Game.name,
				Game.categories, // Default categories
				Game.isFree ? 1 : 0, // Example for boolean values
				Game.isCompleted ? 1 : 0, // Example for boolean values
				Game.isProgress ? 1 : 0, // Example for boolean values
				Game.currentStep, // Example for integer values
				Game.steps, // Example for integer values
				Game.initialPaidStep, // Example for integer values
				Game.timer, // Example for integer values
				Game.rewards // Default rewards
			],
			(_, { rowsAffected }) => {
				if (rowsAffected > 0) {
					console.log("Default game inserted successfully.")
				} else {
					console.error("Failed to insert default game.")
				}
			},
			error => {
				console.error("Error inserting default game:", error)
			}
		)
	}

	// Example method to fetch data
	getData = async (): Promise<IDB> => {
		return new Promise((resolve, reject) => {
			this.db.transaction(
				tx => {
					let games: IGame[] = []
					let puzzles: IGame[] = []
					let tests: IGame[] = []

					// Fetch data from Games table
					tx.executeSql(
						"SELECT * FROM GamesTest",
						[],
						(_, { rows }: { rows: SQLResultSetRowList }) => {
							for (let i = 0; i < rows.length; i++) {
								const row = rows.item(i)
								games.push({
									name: row.name,
									categories: row.categories.split(","),
									isFree: row.isFree === 1,
									isCompleted: row.isCompleted === 1,
									isProgress: row.isProgress === 1,
									currentStep: row.currentStep,
									steps: row.steps,
									initialPaidStep: row.initialPaidStep,
									timer: row.timer,
									rewards: row.rewards.split(",")
								})
							}
						},
						(_, error) => {
							reject(error.message)
						}
					)
					// Fetch data from Puzzles table
					tx.executeSql(
						"SELECT * FROM PuzzlesTest",
						[],
						(_, { rows }: { rows: SQLResultSetRowList }) => {
							for (let i = 0; i < rows.length; i++) {
								const row = rows.item(i)
								puzzles.push({
									name: row.name,
									categories: row.categories.split(","),
									isFree: row.isFree === 1,
									isCompleted: row.isCompleted === 1,
									isProgress: row.isProgress === 1,
									currentStep: row.currentStep,
									steps: row.steps,
									initialPaidStep: row.initialPaidStep,
									timer: row.timer,
									rewards: row.rewards.split(",")
								})
							}
						},
						(_, error) => {
							reject(error.message)
						}
					)
					// Fetch data from Tests table
					tx.executeSql(
						"SELECT * FROM TestsTest",
						[],
						(_, { rows }: { rows: SQLResultSetRowList }) => {
							for (let i = 0; i < rows.length; i++) {
								const row = rows.item(i)
								tests.push({
									name: row.name,
									categories: row.categories.split(","),
									isFree: row.isFree === 1,
									isCompleted: row.isCompleted === 1,
									isProgress: row.isProgress === 1,
									currentStep: row.currentStep,
									steps: row.steps,
									initialPaidStep: row.initialPaidStep,
									timer: row.timer,
									rewards: row.rewards.split(",")
								})
							}
						},
						(_, error) => {
							reject(error.message)
						}
					)
					// Fetch data from Player table
					tx.executeSql(
						"SELECT * FROM PlayerTest",
						[],
						(_, { rows }: { rows: SQLResultSetRowList }) => {
							if (rows.length > 0) {
								const playerRow = rows.item(0)
								const player: IPlayer = {
									userName: playerRow.userName
									// Include other player properties
								}
								resolve({
									Games: games,
									Puzzles: puzzles,
									Tests: tests,
									Player: player
								})
							} else {
								// No player record found, resolve with an empty player object
								resolve({
									Games: games,
									Puzzles: puzzles,
									Tests: tests,
									Player: {
										userName: ""
										// Include other default player properties
									}
								})
							}
						},
						(_, error) => {
							reject(error.message)
						}
					)
				},
				error => {
					reject(error.message)
				}
			)
		})
	}
}

const dbSqLite = new SQLiteDB()
export default dbSqLite
