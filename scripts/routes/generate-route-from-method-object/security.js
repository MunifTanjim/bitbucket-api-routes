const processSecurity = (methodObject, _methodObjectOverrides = {}) => {
  delete methodObject.security
}

module.exports = processSecurity
