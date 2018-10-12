const { updateSpecification } = require('./specification/index.js')
const { updateApiNames } = require('./api-names/index.js')
const { updateRoutes } = require('./routes/index.js')

const checkOrUpdate = async options => {
  try {
    let { specification, apiNames, routes } = options

    if (specification) {
      await updateSpecification(options)
    }

    if (apiNames) {
      await updateApiNames(options)
    }

    if (routes) {
      await updateRoutes(options)
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = checkOrUpdate
