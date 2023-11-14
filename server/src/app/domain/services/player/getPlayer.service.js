const getPlayerService = (repository, { gameId, playerName }) => {
  const player = repository.player.getPlayer({ gameId, playerName })
  if (!player) return false

  return player
}

module.exports = { getPlayerService }
