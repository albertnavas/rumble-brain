const { isAdminGameService } = require('../../domain/services/admin/isAdminGame.service')
const { getGameService } = require('../../domain/services/game/getGame.service')
const { getGameResultsService } = require('../../domain/services/game/getGameResults.service')

const getAdminGameUseCase = async ({ logger, repository }, { adminId, gameId, withCorrectAnswers }) => {
  try {
    const isAdminGame = await isAdminGameService(repository, { adminId, gameId })

    if (!isAdminGame) {
      logger.info(`❌ ADMIN - ${adminId} is not owner of ${gameId} ❌`)
      return false
    }

    const game = await getGameService(repository, { gameId, withCorrectAnswers })
    if (!game) return false

    const results = await getGameResultsService(repository, { gameId })

    const res = {
      ...game,
      results,
    }

    return { status: true, data: { game: res } }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { getAdminGameUseCase }
