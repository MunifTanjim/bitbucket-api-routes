const { assign, get, set } = require('lodash')

const processConsumes = (methodObject, methodObjectOverrides = {}) => {
  let responses = assign(
    get(methodObject, 'responses', {}),
    get(methodObjectOverrides, 'responses', {})
  )

  set(methodObject, 'responses', responses)
}

module.exports = processConsumes
