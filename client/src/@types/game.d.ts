type Answer = {
	answerId: string
	answer: string
	isCorrect?: boolean
}

type GameStatus = {
	status: string
	currentQuestionNumber: number
	currentQuestion: GameQuestion
	currentQuestionStart: Date
} | null

export type GamePlayers = string[]

export type GamePlayerAnswers = {
	[key: string]: string
}

export type GamePlayerAnswer = {
	playerConnectionToken: string
	gameId: string
	questionId: string
	answerId: string
}

export type GameQuestion = {
	questionNumber: number
	questionStart: string | null
	question: {
		questionId: string
		question: string
		answers: Answer[]
		time: string
	}
}

export type GameResults = {
	name: string
	score: number
	correctAnswers: number
	totalAnswersTime: number
}[]

export type Game = {
	gameId: string
	players: string[]
	gameQuestions: GameQuestion[] | null
	currentQuestion: GameQuestion | null
	questionsNumber: number | null
	gameStatus: GameStatus
	results: GameResults
} | null
