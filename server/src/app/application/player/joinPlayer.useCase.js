const { getGameService } = require('../../domain/services/game/getGame.service')
const { getPlayerService } = require('../../domain/services/player/getPlayer.service')

const joinPlayerUseCase = async ({ logger, repository }, { gameId, playerSocketId, playerName, playerConnectionToken }) => {
  try {
    const game = await getGameService(repository, { gameId, withCorrectAnswers: false })
    if (!game) {
      logger.info(`❌ Game ${gameId} not found ❌`)
      return { status: false, error: { type: 'JOIN_GAME_NOT_FOUND', message: 'Partida no encontrada' } }
    }

    const player = await getPlayerService(repository, { gameId, playerName })
    if (player?.playerConnectionToken !== playerConnectionToken) {
      logger.info(`❌ PLAYER - ${playerName} tried to join to ${gameId} with wrong token ❌`)
      return { status: false, error: { type: 'JOIN_WRONG_TOKEN', message: 'Token incorrecto' } }
    }

    const updatePlayerRes = await repository.player.savePlayer(gameId, playerName, {
      player_socket_id: playerSocketId,
      player_connected: true,
    })

    if (!updatePlayerRes) {
      logger.info(`❌ PLAYER - ${playerName} tried to join to ${gameId} but failed ❌`)
      return { status: false, error: { type: 'JOIN_FAILED', message: 'No se pudo unir a la partida' } }
    }

    game.questionsNumber = game.gameQuestions.length

    const res = { game, player }

    return { status: true, data: res }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { joinPlayerUseCase }
