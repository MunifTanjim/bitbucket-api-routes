const path = require('path')
const { writeFile } = require('fs-extra')

const { routesDir } = require('../variables.js').paths

const saveRoutesByNamespace = async routesByNamespace => {
  Object.entries(routesByNamespace).forEach(async ([namespace, routes]) => {
    await writeFile(
      path.join(routesDir, `${namespace}.json`),
      `${JSON.stringify(routes, null, 2)}\n`
    )

    console.log(`Routes Namespace Updated: ${namespace}`)
  })
}

module.exports = saveRoutesByNamespace
