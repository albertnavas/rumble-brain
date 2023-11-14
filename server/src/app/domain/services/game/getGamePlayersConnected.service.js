const getGamePlayersConnectedService = async (repository, { gameId }) => {
  const players = await repository.game.getGamePlayersConnected({ gameId })
  return players.map((player) => player.playerName)
}

module.exports = { getGamePlayersConnectedService }
