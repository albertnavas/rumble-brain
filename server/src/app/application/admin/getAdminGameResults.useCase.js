const { getGameResultsService } = require('../../domain/services/game/getGameResults.service')

const getAdminGameResultsUseCase = async ({ logger, repository }, { gameId }) => {
  try {
    const res = await getGameResultsService(repository, { gameId })

    return { status: true, data: { results: res } }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { getAdminGameResultsUseCase }
