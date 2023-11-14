const { cleanGameDataService } = require('../../domain/services/admin/cleanGameData.service')

const cleanGameDataUseCase = async ({ logger, repository }, { gameId, socketIdsConnected }) => {
  try {
    await cleanGameDataService(repository, { gameId, socketIdsConnected })

    const res = null

    return { status: true, data: res }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { cleanGameDataUseCase }
