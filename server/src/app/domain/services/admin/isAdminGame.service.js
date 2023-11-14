const isAdminGameService = async (repository, { adminId, gameId }) => {
  const game = await repository.admin.isAdminGame({ adminId, gameId })

  if (!game) return false

  return true
}

module.exports = { isAdminGameService }
