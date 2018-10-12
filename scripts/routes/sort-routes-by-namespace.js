const set = require('lodash/set')

const sortRoutesArray = require('./sort-routes-array.js')

const sortRoutesByNamespace = routesByNamespace => {
  Object.entries(routesByNamespace).forEach(([namespace, routes]) => {
    set(routesByNamespace, namespace, sortRoutesArray(routes))
  })
}

module.exports = sortRoutesByNamespace
