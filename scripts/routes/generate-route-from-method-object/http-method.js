const set = require('lodash/set')

const processHttpMethod = (methodObject, _methodObjectOverrides = {}) => {
  set(methodObject, 'method', methodObject.method.toUpperCase())
}

module.exports = processHttpMethod
