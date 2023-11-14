const { getGamePlayerAnswersService } = require('../../domain/services/player/getGamePlayerAnswers.service')

const getGamePlayerAnswersUseCase = async ({ logger, repository }, { playerId, gameId }) => {
  try {
    const res = await getGamePlayerAnswersService(repository, { playerId, gameId })

    return { status: true, data: { gamePlayerAnswers: res } }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { getGamePlayerAnswersUseCase }
