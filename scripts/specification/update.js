const fetch = require('node-fetch')
const deepsort = require('deep-sort-object')

const getUpdatedSpecKeys = require('./get-updated-spec-keys.js')
const getOverrideRecheckKeys = require('./get-overide-recheck-keys.js')
const sortSpecOverrides = require('./sort-spec-overrides.js')
const writeSpecPartials = require('./write-spec-partials.js')

const update = async ({ apiSpecUrl, dryRun }) => {
  try {
    console.log(`${dryRun ? 'Checking' : 'Updating'} OpenAPI Specification...`)

    console.log(`Fetching OpenAPI Specification file (${apiSpecUrl})...`)

    let response = await fetch(apiSpecUrl)

    let {
      definitions,
      info,
      paths,
      securityDefinitions,
      tags,
      'x-radar-pages': _xRadarPages,
      ...misc
    } = await response.json()

    let specPartials = {
      definitions: deepsort(definitions),
      info: deepsort(info),
      misc: deepsort(misc),
      paths: deepsort(paths),
      securityDefinitions: deepsort(securityDefinitions),
      tags: deepsort(tags)
    }

    let updatedSpecKeys = getUpdatedSpecKeys(specPartials)
    let overrideRecheckKeys = await getOverrideRecheckKeys(updatedSpecKeys)

    console.log(`Spec Key Updates: ${JSON.stringify(updatedSpecKeys, null, 2)}`)

    console.log(
      `Recheck Spec Override Keys: ${JSON.stringify(
        overrideRecheckKeys,
        null,
        2
      )}`
    )

    if (dryRun) {
      process.exit(0)
    }

    sortSpecOverrides()
    writeSpecPartials(specPartials)
  } catch (err) {
    console.error(err)
  }
}

module.exports = update
