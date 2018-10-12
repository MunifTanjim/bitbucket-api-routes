const path = require('path')
const { writeFile } = require('fs-extra')

const { routesDir } = require('../variables.js').paths

const saveAllRoutes = async routesByNamespace => {
  await writeFile(
    path.join(routesDir, `index.json`),
    `${JSON.stringify(routesByNamespace, null, 2)}\n`
  )

  console.log(`All Routes Updated!`)
}

module.exports = saveAllRoutes
