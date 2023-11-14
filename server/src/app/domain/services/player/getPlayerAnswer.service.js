const getPlayerAnswerService = async (repository, { playerId, gameId, questionId }) =>
  repository.game.getGamePlayerAnswer(playerId, gameId, questionId)

module.exports = { getPlayerAnswerService }
