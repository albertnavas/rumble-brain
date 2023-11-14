const getAdminGamesService = async (repository, { adminId }) => {
  const games = await repository.admin.getAdminGames({ adminId })

  const gamesParsed = games.map((game) => {
    game.gameStatus = game.gameStatus ? JSON.parse(game.gameStatus) : null
    return game
  })

  return gamesParsed
}

module.exports = { getAdminGamesService }
