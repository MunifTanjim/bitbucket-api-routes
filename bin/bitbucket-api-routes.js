#!/usr/bin/env node

const yargs = require('yargs')

const update = require('../scripts/index.js')

const getOptionsFor = action => ({
  specification: {
    alias: ['spec', 's'],
    default: false,
    describe: `${action} OpenAPI Specification files`,
    type: 'boolean'
  },
  'api-names': {
    alias: ['names', 'n'],
    default: false,
    describe: `${action} API Names file`,
    type: 'boolean'
  },
  routes: {
    alias: ['r'],
    default: false,
    describe: `${action} Routes files`,
    type: 'boolean'
  }
})

let {
  specification,
  [`api-names`]: apiNames,
  routes,
  _: [command]
} = yargs
  .command('update', 'Update files', yargs => {
    yargs.options(getOptionsFor('Update'))
  })
  .command('check', 'Check files', yargs => {
    yargs.options(getOptionsFor('Check'))
  })
  .scriptName('bitbucket-api-routes')
  .help('help')
  .alias('help', ['h'])
  .demandCommand(1, 'Error: Must provide a valid command!')
  .strict(true)
  .usage('bitbucket-api-routes <command> --help').argv

if ([specification, apiNames, routes].every(bool => !bool)) {
  yargs.showHelp()
  console.log('\nError: Must provide a valid option!')
  process.exit(1)
}

update({ dryRun: command === 'check', specification, apiNames, routes }).catch(
  err => console.error(err)
)
