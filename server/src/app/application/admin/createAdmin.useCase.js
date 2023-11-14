const { createAdminService } = require('../../domain/services/admin/createAdmin.service')

const createAdminUseCase = async ({ logger, repository }, { payload }) => {
  try {
    const adminData = {
      adminSubId: payload.sub,
      adminName: payload.name,
      adminEmail: payload.email,
    }

    await createAdminService(repository, { adminData })

    const res = null

    return { status: true, data: res }
  } catch (error) {
    logger.error(error)
    return { status: false, error: error.message }
  }
}

module.exports = { createAdminUseCase }
