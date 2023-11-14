const cleanGameDataService = async (repository, { gameId, socketIdsConnected }) => {
  const disconnectedPlayersIds = await repository.game.getGamePlayersDisconnected({
    gameId,
    socketIdsConnected,
  })

  if (disconnectedPlayersIds.length > 0) {
    await repository.admin.removeAdminGamePlayers({ gameId, playersIds: disconnectedPlayersIds })
    await repository.admin.removeAdminGamePlayersAnswers({ gameId })
  }
}

module.exports = { cleanGameDataService }
