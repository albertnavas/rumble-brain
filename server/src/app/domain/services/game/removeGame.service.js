const removeGameService = async (repository, { adminId, gameId }) => {
  await repository.admin.removeAdminGame({ adminId, gameId })
  await repository.gameStatusTracking.removeGameStatusTracking({ gameId })
}

module.exports = { removeGameService }
