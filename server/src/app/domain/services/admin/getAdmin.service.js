const getAdminService = (repository, { adminSubId }) => {
  return repository.admin.getAdmin({ adminSubId })
}

module.exports = {
  getAdminService,
}
