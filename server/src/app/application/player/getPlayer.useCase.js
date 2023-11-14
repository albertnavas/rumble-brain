const { getPlayerService } = require('../../domain/services/player/getPlayer.service')

const getPlayerUseCase = async ({ logger, repository }, { gameId, playerName }) => {
  try {
    const res = await getPlayerService(repository, { gameId, playerName })

    return { status: true, data: { player: res } }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { getPlayerUseCase }
