const extractNamespacesFromApiNames = apiNames => {
  let namespaces = new Set()

  Object.entries(apiNames).forEach(([_url, methodObjs]) => {
    Object.entries(methodObjs).forEach(([_method, methodObj]) => {
      Object.entries(methodObj).forEach(([namespace, _apiName]) => {
        namespaces.add(namespace)
      })
    })
  })

  return Array.from(namespaces)
}

module.exports = extractNamespacesFromApiNames
