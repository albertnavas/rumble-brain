const { getGameService } = require('../../domain/services/game/getGame.service')
const { updateGamePlayerService } = require('../../domain/services/game/updateGamePlayer.service')
const { getPlayerBySocketIdService } = require('../../domain/services/player/getPlayerBySocketId.service')

const disconnectedPlayerUseCase = async ({ logger, repository }, { socketId }) => {
  try {
    const player = await getPlayerBySocketIdService(repository, { socketId })
    if (!player) return { status: false, error: `Player by socketId ${socketId} not found` }

    await updateGamePlayerService(
      repository,
      { gameId: player.gamesId, playerName: player.playerName },
      {
        player_connected: false,
        player_socket_id: null,
      },
    )

    const game = await getGameService(repository, { gameId: player.gamesId, withCorrectAnswers: false })

    const res = { game, player }

    return { status: true, data: res }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { disconnectedPlayerUseCase }
