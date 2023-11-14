const { getAdminGamesService } = require('../../domain/services/admin/getAdminGames.service')

const getAdminGamesUseCase = async ({ logger, repository }, { adminId }) => {
  try {
    const res = await getAdminGamesService(repository, { adminId })

    return { status: true, data: { games: res } }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { getAdminGamesUseCase }
