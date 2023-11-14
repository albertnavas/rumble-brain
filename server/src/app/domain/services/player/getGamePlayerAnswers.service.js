const getGamePlayerAnswersService = async (repository, { playerId, gameId }) => {
  const gamePlayerAnswers = await repository.game.getGamePlayerAnswers(playerId, gameId)

  const gamePlayerAnswersMap = {}
  gamePlayerAnswers.forEach((gamePlayerAnswer) => {
    gamePlayerAnswersMap[gamePlayerAnswer.gameQuestion] = gamePlayerAnswer.gameAnswer
  })

  return gamePlayerAnswersMap
}

module.exports = { getGamePlayerAnswersService }
