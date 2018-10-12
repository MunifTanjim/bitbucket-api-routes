const { get, set } = require('lodash')

const setApiNamesForRoutesByNamespace = routesByNamespace => {
  Object.entries(routesByNamespace).forEach(([namespace, routes]) => {
    routes.forEach(route => {
      set(route, 'apiName', get(route, ['apiName', namespace]))
    })
  })
}

module.exports = setApiNamesForRoutesByNamespace
