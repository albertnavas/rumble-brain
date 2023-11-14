const { getGamePlayersConnectedService } = require('../../domain/services/game/getGamePlayersConnected.service')

const getGamePlayersConnectedUseCase = async ({ logger, repository }, { gameId }) => {
  try {
    const res = await getGamePlayersConnectedService(repository, { gameId })

    return { status: true, data: { players: res } }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { getGamePlayersConnectedUseCase }
