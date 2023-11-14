const getGameService = async (repository, { gameId, withCorrectAnswers }) => {
  const game = await repository.game.getGame({ gameId })

  if (!game) return false

  const gameStatus = game.gameStatus ? JSON.parse(game.gameStatus) : null
  const gameQuestionsWithCorrectAnswers = game.gameQuestions ? JSON.parse(game.gameQuestions) : null

  let gameQuestions = null

  // Remove isCorrect from answers
  if (withCorrectAnswers) {
    gameQuestions = gameQuestionsWithCorrectAnswers
  } else {
    if (gameQuestionsWithCorrectAnswers) {
      gameQuestions = gameQuestionsWithCorrectAnswers.map((question) => {
        const answersWithoutIsCorrect = question.answers.map(({ ...rest }) => rest)
        const questionWithoutAnswers = { ...question, answers: answersWithoutIsCorrect }
        return questionWithoutAnswers
      })
    }
  }

  const gameQuestionsNumber = gameQuestions?.length ? gameQuestions.length : null

  // Get current question
  const currentQuestion = {
    questionNumber: gameStatus?.currentQuestionNumber || null,
    questionStart: gameStatus?.currentQuestionStart || null,
    question: gameQuestions ? gameQuestions[gameStatus?.currentQuestionNumber - 1] || null : null,
  }

  return {
    ...game,
    gameStatus,
    gameQuestions,
    gameQuestionsNumber,
    currentQuestion,
  }
}

module.exports = { getGameService }
