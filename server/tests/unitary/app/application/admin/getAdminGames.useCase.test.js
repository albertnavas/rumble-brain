const { getAdminGamesUseCase } = require('./../../../../../src/app/application/admin/getAdminGames.useCase')

describe('getAdminGamesUseCase', () => {
  const logger = { error: jest.fn() }
  const repository = { admin: { getAdminGames: jest.fn() } }
  const adminId = 'admin123'

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('returns games when successful', async () => {
    const games = [{ id: 'game1' }, { id: 'game2' }]
    repository.admin.getAdminGames.mockResolvedValueOnce(games)

    const result = await getAdminGamesUseCase({ logger, repository }, { adminId })

    expect(repository.admin.getAdminGames).toHaveBeenCalledWith({ adminId })
    expect(result).toEqual({ status: true, data: { games } })
    expect(logger.error).not.toHaveBeenCalled()
  })

  test('returns error when repository throws', async () => {
    const error = new Error('Something went wrong')
    repository.admin.getAdminGames.mockRejectedValueOnce(error)

    const result = await getAdminGamesUseCase({ logger, repository }, { adminId })

    expect(repository.admin.getAdminGames).toHaveBeenCalledWith({ adminId })
    expect(result).toEqual({ status: false, error: error.message })
    expect(logger.error).toHaveBeenCalledWith(error)
  })
})
