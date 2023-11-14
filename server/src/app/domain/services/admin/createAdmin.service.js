const createAdminService = (repository, { adminData }) => {
  return repository.admin.createAdmin(adminData)
}
module.exports = {
  createAdminService,
}
