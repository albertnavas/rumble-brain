const saveGameStatusService = async (repository, { gameId, gameStatus }) => {
  await repository.game.saveGameStatus(gameId, gameStatus)
  await repository.gameStatusTracking.insertGameStatusTracking(gameId, gameStatus.status)
  return true
}

module.exports = { saveGameStatusService }
