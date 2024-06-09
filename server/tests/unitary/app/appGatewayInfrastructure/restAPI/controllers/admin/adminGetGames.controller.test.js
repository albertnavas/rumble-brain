const request = require('supertest')

const { schemaValidation } = require('../../../../../../../src/shared/infrastructure/schemaValidation')

const { createHttpServer } = require('../../../../../../../src/serverHttp')

const {
  authRestAPIMiddleware,
} = require('../../../../../../../src/app/appGatewayInfrastructure/restAPI/middlewares/authRestAPI.middleware')

jest.mock('../../../../../../../src/app/appGatewayInfrastructure/restAPI/middlewares/authRestAPI.middleware')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('adminGetGamesController', () => {
  const mockConfig = {
    originURL: 'http://localhost:3000',
  }
  const mockLogger = { info: jest.fn(), error: jest.fn() }

  const { parseParams } = schemaValidation({ logger: mockLogger })

  const mockRepository = {
    admin: {
      getAdminGames: jest.fn(),
      getAdmin: jest.fn(),
    },
  }

  authRestAPIMiddleware.mockImplementationOnce(() => (req, _, next) => {
    req.user = { adminId: 'admin123' }
    next()
  })

  const { app } = createHttpServer({ config: mockConfig, parseParams, logger: mockLogger, repository: mockRepository })

  it('should return an array of games if getAdminGamesUseCase returns a successful status', async () => {
    const games = [{ id: 'game1' }, { id: 'game2' }]
    mockRepository.admin.getAdminGames.mockResolvedValueOnce(games)
    mockRepository.admin.getAdmin.mockResolvedValueOnce({ adminId: 'admin123' })

    const response = await request(app).get('/games')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(games)
  })

  it('should return 200 and [] games array if throws an error', async () => {
    const error = new Error('Something went wrong')
    mockRepository.admin.getAdminGames.mockRejectedValueOnce(error)
    mockRepository.admin.getAdmin.mockResolvedValueOnce({ adminId: 'admin123' })

    const response = await request(app).get('/games')

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })
})
