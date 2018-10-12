const set = require('lodash/set')

const processDescription = (methodObject, methodObjectOverrides = {}) => {
  let description =
    methodObjectOverrides.description || methodObject.description || ''

  set(methodObject, 'description', description.split(`\n\n`)[0])
}

module.exports = processDescription
