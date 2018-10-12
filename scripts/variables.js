const path = require('path')

const specDir = path.resolve('specification')
const specOverridesDir = path.join(specDir, 'overrides')
const routesDir = path.resolve('routes')

const apiNamesPath = path.resolve('scripts', 'api-names.json')

const NON_METHODS = ['parameters']

module.exports.paths = {
  apiNamesPath,
  specDir,
  specOverridesDir,
  routesDir
}

module.exports.NON_METHODS = NON_METHODS
