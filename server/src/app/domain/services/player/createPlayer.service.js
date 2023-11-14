const createPlayerService = async (repository, { gameId, playerName }) => {
  const { playerConnectionToken } = await repository.player.createPlayer({ gameId, playerName })
  return playerConnectionToken
}

module.exports = { createPlayerService }
