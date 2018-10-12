const path = require('path')
const set = require('lodash/set')

const { specDir } = require('../../variables.js').paths

const processConsumes = (methodObject, methodObjectOverrides = {}) => {
  let defaultConsumes = require(path.join(specDir, 'misc.json')).consumes

  let consumes = methodObjectOverrides.consumes || methodObject.consumes

  set(methodObject, 'consumes', consumes || defaultConsumes)
}

module.exports = processConsumes
