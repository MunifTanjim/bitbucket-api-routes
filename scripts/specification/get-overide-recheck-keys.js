const path = require('path')
const { readdir } = require('fs-extra')
const { has, set } = require('lodash')
const deepsort = require('deep-sort-object')

const { specOverridesDir } = require('../variables.js').paths

const getOverrideRecheckKeys = async updatedSpecKeys => {
  try {
    let overrideFilenames = await readdir(specOverridesDir)

    let recheckKeys = overrideFilenames.reduce((recheckKeys, filename) => {
      let partialName = filename.replace('.json', '')

      let partialOverrides = require(path.join(specOverridesDir, filename))

      set(
        recheckKeys,
        partialName,
        updatedSpecKeys[partialName].filter(key => has(partialOverrides, key))
      )

      return recheckKeys
    }, {})

    return deepsort(recheckKeys)
  } catch (err) {
    console.error(err)
  }
}

module.exports = getOverrideRecheckKeys
