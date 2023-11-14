const { saveGameQuestionsService } = require('../../domain/services/game/saveGameQuestions')

const saveAdminGameQuestionsUseCase = async ({ logger, repository }, { gameId, gameQuestions }) => {
  try {
    await saveGameQuestionsService(repository, { gameId, gameQuestions })

    const res = null

    return { status: true, data: res }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { saveAdminGameQuestionsUseCase }
