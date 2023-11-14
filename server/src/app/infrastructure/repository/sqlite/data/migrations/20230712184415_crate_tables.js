/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable('admins', (table) => {
    table.increments('id_admins').primary()
    table.string('admin_name').notNullable()
    table.integer('admin_sub_id').notNullable()
    table.string('admin_email').notNullable()
    table.timestamp('game_created_at').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('games', (table) => {
    table.string('id_games').primary()
    table.integer('admins_id').notNullable()
    table.string('game_name').notNullable()
    table.string('game_questions')
    table.string('game_status').notNullable().defaultTo('{}')
    table.timestamp('game_created_at').defaultTo(knex.fn.now())
    table.timestamp('game_updated_at').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('games_answers', (table) => {
    table.increments('id_games_answers').primary()
    table.string('games_id').notNullable()
    table.integer('players_id').notNullable()
    table.string('game_question').notNullable()
    table.timestamp('game_question_started_at')
    table.string('game_answer').notNullable()
    table.timestamp('game_answer_created_at').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('games_status_tracking', (table) => {
    table.increments('id_games_status_tracking').primary()
    table.integer('games_id').notNullable()
    table.string('game_status').notNullable()
    table.timestamp('game_status_created_at').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('players', (table) => {
    table.increments('id_players').primary()
    table.string('player_name').notNullable()
    table.string('player_connection_token').notNullable()
    table.integer('games_id').notNullable()
    table.string('player_socket_id')
    table.boolean('player_connected').notNullable()
    table.timestamp('player_joined_at').defaultTo(knex.fn.now())
  })

  return true
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('admins')
  await knex.schema.dropTable('games')
  await knex.schema.dropTable('games_answers')
  await knex.schema.dropTable('games_status_tracking')
  await knex.schema.dropTable('players')

  return true
}
