const processors = {
  apiNames: require('./api-names.js'),
  consumes: require('./consumes.js'),
  description: require('./description.js'),
  httpMethod: require('./http-method.js'),
  parameters: require('./parameters.js'),
  responses: require('./responses.js'),
  security: require('./security.js'),
  tags: require('./tags.js')
}

const generateRouteFromMethodObject = (
  methodObject,
  methodObjectOverrides = {}
) => {
  processors.apiNames(methodObject, methodObjectOverrides)
  processors.consumes(methodObject, methodObjectOverrides)
  processors.description(methodObject, methodObjectOverrides)
  processors.httpMethod(methodObject, methodObjectOverrides)
  processors.parameters(methodObject, methodObjectOverrides)
  processors.responses(methodObject, methodObjectOverrides)
  processors.security(methodObject, methodObjectOverrides)
  processors.tags(methodObject, methodObjectOverrides)

  return methodObject
}

module.exports = generateRouteFromMethodObject
