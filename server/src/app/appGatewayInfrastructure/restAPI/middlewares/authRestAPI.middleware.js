const { verifyAdminUseCase } = require('../../../../app/application/admin/verifyAdmin.useCase')

const schema = require('../contracts/authRestAPIMiddleware.contract')

const whiteList = ['/game/insert', '/admin/signin', '/game/join']

const authRestAPIMiddleware =
  ({ parseParams, logger, repository }) =>
    async (req, res, next) => {
      if (whiteList.includes(req.path)) return next()

      if (!req.headers.authorization) {
        logger.error('ERROR REST API - authRestAPIMiddleware - Missing authorization header')
        return res.status(403).json({ message: 'Missing authorization header' })
      }

      const parseResponse = parseParams({ data: req.headers, schema })

      if (!parseResponse.validation) {
        return res.status(403).json({ status: false, message: parseResponse.error })
      }

      const { authorization } = parseResponse.data

      try {
        const token = authorization.split(' ')[1]

        const responseVerifyAdminUseCase = await verifyAdminUseCase({ logger, repository }, { token })

        if (!responseVerifyAdminUseCase.status) {
          throw new Error(responseVerifyAdminUseCase.error)
        }

        const { admin } = responseVerifyAdminUseCase.data

        if (!admin) {
          return res.status(403).json({ error: true, code: 'TOKEN_ERROR', message: 'Admin not found' })
        }

        req.user = {
          adminId: admin.adminId,
        }

        next()
      } catch (error) {
        if (error.message.includes('Token used too late')) {
          return res.status(403).json({ error: true, code: 'TOKEN_EXPIRED', message: 'Token expired' })
        }
        logger.error(error, 'ERROR REST API - authRestAPIMiddleware - verifyAdminUseCase')
        return res.status(403).json({ error: true, code: 'TOKEN_ERROR', message: 'Unexpected error token' })
      }
    }

module.exports = { authRestAPIMiddleware }
