const get = require('lodash/get')

const objectUpdated = (key, cachedObj, obj) => {
  return JSON.stringify(get(obj, key)) !== JSON.stringify(get(cachedObj, key))
}

module.exports = objectUpdated
