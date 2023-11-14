const { saveGameStatusService } = require('../../domain/services/admin/saveGameStatus.service')
const { getPlayerNextQuestionService } = require('../../domain/services/admin/getPlayerNextQuestion.service')

const manageAdminGameUseCase = async ({ logger, repository }, { game, status }) => {
  try {
    if (game.gameStatus.currentQuestionNumber === game.gameQuestions.length) {
      const gameStatusResults = {
        status: 'GAME_RESULTS',
        currentQuestionNumber: null,
        currentQuestion: null,
        currentQuestionStart: null,
      }
      await saveGameStatusService(repository, {
        gameId: game.gameId,
        gameStatus: gameStatusResults,
      })
    } else if (status === 'GAME_QUESTION') {
      const currentQuestion = await getPlayerNextQuestionService(game)
      let gameStatusQuestion = {
        status,
        currentQuestionNumber: currentQuestion.questionNumber,
        currentQuestion: currentQuestion.currentQuestion,
        currentQuestionStart: new Date(),
      }
      await saveGameStatusService(repository, {
        gameId: game.gameId,
        gameStatus: gameStatusQuestion,
      })
    } else if (status === 'GAME_QUESTION_RESULTS') {
      const gameStatusQuestionResults = {
        status: 'GAME_QUESTION_RESULTS',
        currentQuestionNumber: game.gameStatus.currentQuestionNumber,
        currentQuestion: null,
        currentQuestionStart: null,
      }
      await saveGameStatusService(repository, {
        gameId: game.gameId,
        gameStatus: gameStatusQuestionResults,
      })
    }

    const res = true

    return { status: true, data: res }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { manageAdminGameUseCase }
