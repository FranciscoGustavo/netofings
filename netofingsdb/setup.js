'use strict'

const debug = require('debug')('netofings:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./index')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt({
    type: 'confirm',
    name: 'setup',
    message: 'This will destroy your database, are you sure?'
  })

  if (!answer.setup) {
    return console.log('Nothing happened :)')
  }

  const config = {
    database: process.env.DB_NAME || 'netofings',
    username: process.env.DB_USER || 'gusi',
    password: process.env.DB_PASS || '123456',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (error) {
  console.error(`${chalk.red('[fatal error]')} ${error.message}`)
  console.error(error.stack)
  process.exit(1)
}

setup()
