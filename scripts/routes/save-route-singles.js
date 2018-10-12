const path = require('path')
const { ensureDir, writeFile } = require('fs-extra')

const { routesDir } = require('../variables.js').paths

const saveRouteSingles = async routesByNamespace => {
  Object.entries(routesByNamespace).forEach(async ([namespace, routes]) => {
    let routesNamespacePath = path.join(routesDir, namespace)

    await ensureDir(routesNamespacePath)

    routes.forEach(async route => {
      let routeSlug = route.apiName.toLowerCase().replace(/ /g, '-')

      await writeFile(
        path.join(routesNamespacePath, `${routeSlug}.json`),
        `${JSON.stringify(route, null, 2)}\n`
      )

      console.log(`Route Updated: ${namespace}/${routeSlug}`)
    })
  })
}

module.exports = saveRouteSingles
