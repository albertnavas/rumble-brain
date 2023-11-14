const createGame = async (repository, { adminId, gameName }) => {
  const gameStatus = {
    status: 'CREATED',
    currentQuestionNumber: null,
    currentQuestion: null,
    currentQuestionStart: null,
  }

  const { gameId } = await repository.game.createGame(adminId, { gameName, gameStatus })

  if (!gameId) {
    return false
  }

  return gameId
}

module.exports = {
  createGame,
}
