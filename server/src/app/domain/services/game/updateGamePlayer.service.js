const updateGamePlayerService = (repository, { gameId, playerName }, updateData) =>
  repository.player.savePlayer(gameId, playerName, updateData)

module.exports = { updateGamePlayerService }
