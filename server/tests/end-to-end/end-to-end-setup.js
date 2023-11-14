const knex = require('knex')
const config = require('./end-to-end-knexfile')

const db = knex(config)

async function runMigrations() {
  try {
    console.log('Rolling back migrations...')
    await db.migrate.down()
    console.log('Migrations down successfully!')

    console.log('Running migrations...')
    await db.migrate.latest()
    console.log('Migrations ran successfully!')
  } catch (error) {
    console.error('Error running migrations:', error)
  }
}

const runSeeds = async () => {
  try {
    console.log('Running seeds...')
    await db.seed.run()
    console.log('Seeds ran successfully!')
  } catch (error) {
    console.error('Error running seeds:', error)
  }
}

const runSetUp = async () => {
  await runMigrations()
  await runSeeds()

  await db.destroy()
}

runSetUp()
