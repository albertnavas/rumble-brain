const getPlayerBySocketIdService = (repository, { socketId }) =>
  repository.player.getPlayerBySocketId({ socketId })

module.exports = { getPlayerBySocketIdService }
