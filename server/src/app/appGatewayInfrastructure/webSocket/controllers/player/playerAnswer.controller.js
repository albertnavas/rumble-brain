const { createPlayerAnswerUseCase } = require('../../../../application/player/createPlayerAnswer.useCase')
const { getGamePlayerAnswersUseCase } = require('../../../../application/player/getGamePlayerAnswers.useCase')

const schema = require('../../contracts/playerAnswerController.contract')

const playerAnswerController =
  (io, socket, { parseParams, logger, repository }) =>
    async (clientData) => {
      const parseResponse = parseParams({ data: { socketId: socket.id, ...clientData }, schema })

      if (!parseResponse.validation) {
        logger.error('ERROR WS - playerAnswerController - Invalid params')
        return true
      }

      const { socketId, gameId, playerConnectionToken, questionId, answerId } = parseResponse.data

      const responseCreatePlayerAnswer = await createPlayerAnswerUseCase(
        { logger, repository },
        {
          playerConnectionToken,
          gameId,
          questionId,
          answerId,
        },
      )

      if (!responseCreatePlayerAnswer && !responseCreatePlayerAnswer.status) {
        logger.error({ error: responseCreatePlayerAnswer.error }, 'ERROR WS - responseCreatePlayerAnswer')
        return true
      }

      const { player } = responseCreatePlayerAnswer.data

      if (!player) {
        logger.info(`❌ PLAYER - ${playerConnectionToken} not found ❌`)
        return true
      }

      const responseGetGamePlayerAnswers = await getGamePlayerAnswersUseCase(
        { logger, repository },
        {
          playerId: player.idPlayers,
          gameId,
        },
      )

      if (!responseGetGamePlayerAnswers.status) {
        logger.error({ error: responseGetGamePlayerAnswers.error }, 'ERROR WS - responseGetGamePlayerAnswers')
        return true
      }

      const { gamePlayerAnswers } = responseGetGamePlayerAnswers.data

      io.of('/player').to(socketId).emit('playerAnswers', gamePlayerAnswers)
    }

module.exports = { playerAnswerController }
