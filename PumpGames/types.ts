export interface IPlayer {
	userName: string
	photo: string
	rewards: string[]
	notifications: string[]
	hotDeals: string[]
	progress: {
		games: string[]
		puzzles: string[]
		tests: string[]
	}
}

export interface IGame {
	name: string
	categories: string[]
	isFree: boolean
	isCompleted: boolean
	isProgress: boolean
	currentStep: number
	steps: number
	initialPaidStep: number
	timer: number
	rewards: string[]
}

export interface IDB {
	Player: IPlayer
	Games: IGame[]
	Puzzles: IGame[]
	Tests: IGame[]
}
