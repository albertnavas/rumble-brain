const { verifyAdminUseCase } = require('../../../../application/admin/verifyAdmin.useCase')
const { createAdminUseCase } = require('../../../../application/admin/createAdmin.useCase')

const schema = require('../../contracts/adminSignInController.contract')

const adminSignInController =
  ({ parseParams, logger, repository }) =>
    async (req, res) => {
      const parseResponse = parseParams({ data: req.body, schema })

      if (!parseResponse.validation) {
        return res.status(400).json({ status: false, message: parseResponse.error })
      }

      const { token } = parseResponse.data

      if (!token) {
        return res.status(403).json({ status: false, message: 'No token provided' })
      }

      const responseGetAdmin = await verifyAdminUseCase({ logger, repository }, { token })

      if (!responseGetAdmin.status) {
        return res.status(500).json({ status: false, message: 'Unexpected error' })
      }

      const { admin, payload } = responseGetAdmin.data

      if (!admin) {
        const responseCreateAdmin = await createAdminUseCase({ logger, repository }, { payload })

        if (!responseCreateAdmin.status) {
          return res.status(500).json({ status: false, message: 'Unexpected error' })
        }
      }

      return res.status(200).json({ status: true })
    }

module.exports = { adminSignInController }
