const get = require('lodash/get')
const set = require('lodash/set')

const { NON_METHODS } = require('../variables.js')

const injectUrlInfoToPathsSpec = (pathsSpec, pathsSpecOverrides) => {
  Object.keys(pathsSpec).forEach(url => {
    Object.keys(pathsSpec[url]).forEach(method => {
      if (NON_METHODS.includes(method)) return

      set(
        pathsSpec,
        [url, method, 'path'],
        get(pathsSpecOverrides, [url, 'path'], url)
      )
      set(pathsSpec, [url, method, 'method'], method.toLowerCase())
      set(
        pathsSpec,
        [url, method, 'documentationUrl'],
        `https://developer.atlassian.com/bitbucket/api/2/reference/resource${encodeURI(
          url
        )}#${method.toLowerCase()}`
      )
    })
  })
}

module.exports = injectUrlInfoToPathsSpec
