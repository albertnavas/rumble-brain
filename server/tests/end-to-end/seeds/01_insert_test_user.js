exports.seed = function (knex) {
  return knex('admins').insert([{ admin_sub_id: '99999', admin_name: 'Test', admin_email: 'test-82bs782@gmail.com' }])
}
