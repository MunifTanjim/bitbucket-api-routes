const isPlainObject = require('lodash/isPlainObject')

const objectUpdated = require('./object-updated.js')

const getUpdatedSpecPartialKeys = (cachedSpecPartial, specPartial) => {
  return Object.keys(specPartial).reduce((updatedKeys, level1Key) => {
    let keys = isPlainObject(specPartial[level1Key])
      ? Object.keys(specPartial[level1Key]).map(
          level2Key => `${level1Key}.${level2Key}`
        )
      : [level1Key]

    return updatedKeys.concat(
      keys.filter(key => objectUpdated(key, cachedSpecPartial, specPartial))
    )
  }, [])
}

module.exports = getUpdatedSpecPartialKeys
