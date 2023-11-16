const { getGameService } = require('../../domain/services/game/getGame.service')
const { cleanGameDataService } = require('../../domain/services/admin/cleanGameData.service')

const cleanGameDataUseCase = async ({ logger, repository }, { gameId, adminId, socketIdsConnected }) => {
  try {
    const game = await getGameService(repository, { gameId, withCorrectAnswers: false })

    if (!game) {
      logger.info(`❌ ADMIN - GAME ${gameId} TO CLEAN NOT FOUND ❌`)
      return { status: true }
    }

    if (game.adminId !== adminId) {
      logger.info(`❌ ADMIN - ADMIN ${adminId} DOES NOT OWN ${gameId} GAME ❌`)
      return { status: true }
    }

    if (game.gameStatus.status !== 'CREATED') {
      logger.info(`✅ ADMIN - GAME STARTED NO CLEAN GAME ${gameId} ✅`)
      return { status: true }
    }

    logger.info(`✅ ADMIN - CLEAN GAME ${gameId} ✅`)


    await cleanGameDataService(repository, { gameId, socketIdsConnected })

    const res = null

    return { status: true, data: res }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { cleanGameDataUseCase }
