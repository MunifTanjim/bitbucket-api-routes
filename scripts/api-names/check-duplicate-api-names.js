const getApiNamesByNamespace = require('./get-api-names-by-namespace.js')

const checkDuplicateApiNames = apiNames => {
  console.log('Checking for duplicate API Names...')

  let apiNamesByNamespace = getApiNamesByNamespace(apiNames)

  let duplicateApiNamesByNamespace = Object.entries(apiNamesByNamespace).reduce(
    (duplicateApiNamesByNamespace, [namespace, apiNames]) => {
      duplicateApiNamesByNamespace[namespace] = apiNames.filter((val, i, arr) =>
        arr.includes(val, i + 1)
      )
      return duplicateApiNamesByNamespace
    },
    {}
  )

  Object.keys(duplicateApiNamesByNamespace).forEach(namespace => {
    if (!duplicateApiNamesByNamespace[namespace].length) {
      delete duplicateApiNamesByNamespace[namespace]
    }
  })

  if (Object.keys(duplicateApiNamesByNamespace).length) {
    throw new Error(
      `Duplicate API Names found: ${JSON.stringify(
        duplicateApiNamesByNamespace,
        null,
        2
      )}`
    ).toString()
  }
}

module.exports = checkDuplicateApiNames
