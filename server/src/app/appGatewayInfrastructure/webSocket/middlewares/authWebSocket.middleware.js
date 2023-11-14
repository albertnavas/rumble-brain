const { verifyAdminUseCase } = require('../../../application/admin/verifyAdmin.useCase')

const schema = require('../contracts/authWebSocketMiddleware.contract')

const authWebSocketMiddleware =
  ({ parseParams, logger, repository }) =>
    async (socket, next) => {
      const parseResponse = parseParams({ data: socket.handshake.auth, schema })

      if (!parseResponse.validation) {
        logger.error('ERROR WS - authWebSocketMiddleware - Invalid params')
        return true
      }

      const { token } = parseResponse.data

      try {
        const responseVerifyAdminUseCase = await verifyAdminUseCase({ logger, repository }, { token })

        if (!responseVerifyAdminUseCase.status) {
          throw new Error('Init WS - getAdminUseCase error', responseVerifyAdminUseCase.error)
        }

        const { admin } = responseVerifyAdminUseCase.data

        if (!admin) {
          throw new Error('Init WS - admin not found')
        }

        const gameId = socket.handshake.auth.gameId
        if (!gameId) {
          throw new Error('Init WS - gameId not found')
        }

        logger.info(`🤝 ADMIN - ${admin.adminId} joined to ${gameId} 🤝`)

        socket.user = {
          adminId: admin.adminId,
        }

        socket.join(`game-${gameId}`)
      } catch (error) {
        logger.error(error, 'Init WS error')
      }

      next()
    }

module.exports = { authWebSocketMiddleware }
