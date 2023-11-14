const { getAdminService } = require('../../domain/services/admin/getAdmin.service')
const { verifyTokenService } = require('../../../shared/domain/services/jwt/verifyToken.service')

const verifyAdminUseCase = async ({ logger, repository }, { token }) => {
  let payload

  try {
    payload = await verifyTokenService(token)
  } catch (error) {
    logger.error(error)
    return { status: false, error: 'Invalid token' }
  }

  try {
    const res = await getAdminService(repository, { adminSubId: payload.sub })

    return { status: true, data: { admin: res, payload } }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { verifyAdminUseCase }
