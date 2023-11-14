const { createPlayerService } = require('../../domain/services/player/createPlayer.service')

const createPlayerUseCase = async ({ logger, repository }, { gameId, playerName }) => {
  try {
    const res = await createPlayerService(repository, { gameId, playerName })

    return { status: true, data: { playerConnectionToken: res } }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { createPlayerUseCase }
