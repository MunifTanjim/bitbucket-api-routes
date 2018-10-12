const path = require('path')
const { get, set } = require('lodash')
const { writeFile } = require('fs-extra')
const deepsort = require('deep-sort-object')

const extractNamespaceFromURL = require('./extract-namespace-from-url.js')
const checkDuplicateApiNames = require('./check-duplicate-api-names.js')

const {
  apiNamesPath,
  specDir,
  specOverridesDir
} = require('../variables.js').paths
const { NON_METHODS } = require('../variables.js')

const CACHED_API_NAMES = require(apiNamesPath)
const PATHS_SPEC = require(path.join(specDir, 'paths.json'))
const PATHS_SPEC_OVERRIDES = require(path.join(specOverridesDir, 'paths.json'))

const update = async ({ dryRun }) => {
  try {
    console.log(`${dryRun ? 'Checking' : 'Updating'} API Names...`)

    let apiNames = {}

    Object.entries(PATHS_SPEC).forEach(([url, methodObjs]) => {
      let resourceNamespace = extractNamespaceFromURL(url)

      url = get(PATHS_SPEC_OVERRIDES, [url, 'path'], url)

      Object.entries(methodObjs).forEach(([method, methodObj]) => {
        if (NON_METHODS.includes(method)) return

        set(
          apiNames,
          [url, method, resourceNamespace],
          get(CACHED_API_NAMES, [url, method, resourceNamespace], '')
        )

        if (!methodObj.tags) return

        methodObj.tags.forEach(tagNamespace => {
          set(
            apiNames,
            [url, method, tagNamespace],
            get(CACHED_API_NAMES, [url, method, tagNamespace], '')
          )
        })
      })
    })

    checkDuplicateApiNames(apiNames)

    if (dryRun) {
      process.exit(0)
    }

    await writeFile(
      apiNamesPath,
      `${JSON.stringify(deepsort(apiNames), null, 2)}\n`
    )

    console.log('Updated API Names file!')
  } catch (err) {
    console.error(err)
  }
}

module.exports = update
