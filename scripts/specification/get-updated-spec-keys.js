const path = require('path')
const { set } = require('lodash')
const deepsort = require('deep-sort-object')

const getUpdatedSpecPartialKeys = require('./get-updated-spec-partial-keys.js')

const { specDir } = require('../variables.js').paths

const getUpdatedSpecKeys = specPartials => {
  let updatedKeys = Object.entries(specPartials).reduce(
    (updatedKeys, [partialName, specPartial]) => {
      let cachedSpecPartial = require(path.join(specDir, `${partialName}.json`))

      set(
        updatedKeys,
        partialName,
        getUpdatedSpecPartialKeys(cachedSpecPartial, specPartial)
      )

      return updatedKeys
    },
    {}
  )

  return deepsort(updatedKeys)
}

module.exports = getUpdatedSpecKeys
