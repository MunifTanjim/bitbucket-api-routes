const update = require('./update.js')

const API_SPECIFICATION_URL = 'https://api.bitbucket.org/swagger.json'

module.exports.updateSpecification = async ({
  apiSpecUrl = API_SPECIFICATION_URL,
  ...options
}) => update({ apiSpecUrl, ...options })
