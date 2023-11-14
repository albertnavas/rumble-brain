const { getPlayerByConnectionTokenService } = require('../../domain/services/player/getPlayerByConnectionToken.service')

const { getPlayerAnswerService } = require('../../domain/services/player/getPlayerAnswer.service')

const { createPlayerAnswerService } = require('../../domain/services/player/createPlayerAnswer.service')
const { getGameService } = require('../../domain/services/game/getGame.service')

const createPlayerAnswerUseCase = async ({ logger, repository }, { playerConnectionToken, gameId, questionId, answerId }) => {
  try {
    const player = await getPlayerByConnectionTokenService(repository, { playerConnectionToken })

    if (!player) return { status: true, data: { player: null } }

    const playerAnswer = await getPlayerAnswerService(repository, {
      playerId: player.idPlayers,
      gameId,
      questionId,
    })

    if (playerAnswer) {
      logger.info(`❌ PLAYER - ${player.playerName} already answered this question ❌`)
      return
    }
    const game = await getGameService(repository, { gameId, withCorrectAnswers: false })

    const saveResponse = await createPlayerAnswerService(repository, {
      playerId: player.idPlayers,
      gameId,
      questionId,
      currentQuestionStart: game.gameStatus.currentQuestionStart,
      answerId,
    })

    if (saveResponse) {
      logger.info(
        {
          playerConnectionToken,
          gameId,
          questionId,
          answerId,
        },
        `✅ PLAYER - ${player.playerName} answer created ✅`,
      )
    }

    const res = { player }

    return { status: true, data: res }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { createPlayerAnswerUseCase }
