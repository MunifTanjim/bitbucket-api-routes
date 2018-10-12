const path = require('path')
const cloneDeep = require('lodash/cloneDeep')

const extractNamespacesFromApiNames = require('../helpers/extract-namespaces-from-api-names.js')

const injectUrlInfoToPathsSpec = require('./inject-url-info-to-paths-spec.js')
const generateRoutesFromUrlObject = require('./generate-routes-from-url-object.js')
const setApiNamesForRoutesByNamespace = require('./set-api-names-for-routes-by-namespace.js')
const sortRoutesByNamespace = require('./sort-routes-by-namespace.js')

const saveRouteSingles = require('./save-route-singles.js')
const saveRoutesByNamespace = require('./save-routes-by-namespace.js')
const saveAllRoutes = require('./save-all-routes.js')

const {
  apiNamesPath,
  specDir,
  specOverridesDir
} = require('../variables.js').paths

const API_NAMES = require(apiNamesPath)
const PATHS_SPEC = require(path.join(specDir, 'paths.json'))
const PATHS_SPEC_OVERRIDES = require(path.join(specOverridesDir, 'paths.json'))

const update = async ({ dryRun }) => {
  try {
    console.log(`${dryRun ? 'Checking' : 'Updating'} Routes...`)

    let pathsSpec = cloneDeep(PATHS_SPEC)
    let pathsSpecOverrides = cloneDeep(PATHS_SPEC_OVERRIDES)

    let urls = Object.keys(pathsSpec)
    let namespaces = extractNamespacesFromApiNames(API_NAMES)

    injectUrlInfoToPathsSpec(pathsSpec, pathsSpecOverrides)

    let routesByNamespace = namespaces.reduce(
      (routesByNamespace, namespace) => {
        routesByNamespace[namespace] = []
        return routesByNamespace
      },
      {}
    )

    urls.forEach(url => {
      let urlObject = pathsSpec[url]

      let urlObjectOverrides = pathsSpecOverrides[url]

      let routes = generateRoutesFromUrlObject(urlObject, urlObjectOverrides)

      routes.forEach(route => {
        Object.entries(route.apiName).forEach(([namespace, apiName]) => {
          if (apiName) {
            routesByNamespace[namespace].push(cloneDeep(route))
          }
        })
      })
    })

    setApiNamesForRoutesByNamespace(routesByNamespace)

    sortRoutesByNamespace(routesByNamespace)

    if (dryRun) {
      process.exit(0)
    }

    saveRouteSingles(routesByNamespace)
    saveRoutesByNamespace(routesByNamespace)
    saveAllRoutes(routesByNamespace)
  } catch (err) {
    console.error(err)
  }
}

module.exports = update
