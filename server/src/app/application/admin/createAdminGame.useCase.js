const { createGame } = require('../../domain/services/admin/createGame.service')

const createAdminGameUseCase = async ({ logger, repository }, { adminId, gameName }) => {
  try {
    const res = await createGame(repository, { adminId, gameName })

    return { status: true, data: { gameId: res } }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { createAdminGameUseCase }
