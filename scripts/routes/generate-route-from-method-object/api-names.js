const set = require('lodash/set')

const { apiNamesPath } = require('../../variables.js').paths

const API_NAMES = require(apiNamesPath)

const processApiNames = (methodObject, _methodObjectOverrides = {}) => {
  set(
    methodObject,
    'apiName',
    API_NAMES[methodObject.path][methodObject.method]
  )
}

module.exports = processApiNames
