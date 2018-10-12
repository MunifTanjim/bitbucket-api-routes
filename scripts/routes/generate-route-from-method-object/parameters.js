const set = require('lodash/set')

const processParameterDescription = parameterObject => {
  let description = parameterObject.description
    ? parameterObject.description.split(`\n\n`)[0]
    : ''

  set(parameterObject, 'description', description.replace(/\n/g, ' '))
}

const processParameters = (methodObject, methodObjectOverrides = {}) => {
  if (methodObjectOverrides.parameters) {
    let overrideParameterNames = methodObjectOverrides.parameters.map(
      parameter => parameter.name
    )

    set(
      methodObject,
      'parameters',
      methodObject.parameters
        .filter(parameter => !overrideParameterNames.includes(parameter.name))
        .concat(methodObjectOverrides.parameters)
    )
  }

  set(
    methodObject,
    'parameters',
    methodObject.parameters.map(parameterObject => {
      processParameterDescription(parameterObject)
      return parameterObject
    })
  )
}

module.exports = processParameters
