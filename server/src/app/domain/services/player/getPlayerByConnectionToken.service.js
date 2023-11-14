const getPlayerByConnectionTokenService = (repository, { playerConnectionToken }) =>
  repository.player.getPlayerByConnectionToken({ playerConnectionToken })

module.exports = { getPlayerByConnectionTokenService }
