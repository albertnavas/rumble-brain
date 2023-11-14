const { getGameService } = require('../../domain/services/game/getGame.service')

const getPlayerGameUseCase = async ({ logger, repository }, { gameId }) => {
  try {
    const res = await getGameService(repository, { gameId, withCorrectAnswers: false })

    return { status: true, data: { game: res } }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { getPlayerGameUseCase }
