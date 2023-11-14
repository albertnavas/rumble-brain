const createPlayerAnswerService = async (
  repository,
  { playerId, gameId, questionId, currentQuestionStart, answerId },
) => repository.game.saveGamePlayerAnswer(playerId, gameId, questionId, currentQuestionStart, answerId)

module.exports = { createPlayerAnswerService }
