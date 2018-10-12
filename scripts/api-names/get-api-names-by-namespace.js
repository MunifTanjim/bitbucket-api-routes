const extractNamespacesFromApiNames = require('../helpers/extract-namespaces-from-api-names.js')

const getApiNamesByNamespace = apiNames => {
  let namespaces = extractNamespacesFromApiNames(apiNames)

  let apiNamesByNamespace = namespaces.reduce(
    (apiNamesByNamespace, namespace) => {
      apiNamesByNamespace[namespace] = []
      return apiNamesByNamespace
    },
    {}
  )

  Object.entries(apiNames).forEach(([_url, methodObjs]) => {
    Object.entries(methodObjs).forEach(([_method, methodObj]) => {
      Object.entries(methodObj).forEach(([namespace, apiName]) => {
        if (apiName) apiNamesByNamespace[namespace].push(apiName)
      })
    })
  })

  return apiNamesByNamespace
}

module.exports = getApiNamesByNamespace
