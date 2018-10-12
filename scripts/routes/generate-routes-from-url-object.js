const { get, set } = require('lodash')
const deepsort = require('deep-sort-object')

const generateRouteFromMethodObject = require('./generate-route-from-method-object/index.js')

const { NON_METHODS } = require('../variables.js')

const generateRoutesFromUrlObject = (urlObject, urlObjectOverrides = {}) => {
  return Object.entries(urlObject).reduce((routes, [method, methodObject]) => {
    if (NON_METHODS.includes(method)) {
      return routes
    }

    let methodObjectOverrides = urlObjectOverrides[method]

    set(
      methodObject,
      'parameters',
      get(methodObject, 'parameters', []).concat(
        get(urlObject, 'parameters', [])
      )
    )

    let route = generateRouteFromMethodObject(
      methodObject,
      methodObjectOverrides
    )

    return routes.concat(deepsort(route))
  }, [])
}

module.exports = generateRoutesFromUrlObject
