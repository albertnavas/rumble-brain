const { isAdminGameService } = require('../../domain/services/admin/isAdminGame.service')
const { removeGameService } = require('../../domain/services/game/removeGame.service')

const removeAdminGameUseCase = async ({ logger, repository }, { adminId, gameId }) => {
  try {
    const isAdminGame = await isAdminGameService(repository, { adminId, gameId })

    if (!isAdminGame) {
      logger.info(`❌ ADMIN - ${adminId} is not owner of ${gameId} ❌`)
      return false
    }

    await removeGameService(repository, { adminId, gameId })

    const res = null

    return { status: true, data: res }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { removeAdminGameUseCase }
