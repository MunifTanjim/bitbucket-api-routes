const definitions = require('./definitions.json')
const info = require('./info.json')
const misc = require('./misc.json')
const paths = require('./paths.json')
const securityDefinitions = require('./securityDefinitions.json')
const tags = require('./tags.json')

const specification = {
  ...misc,
  definitions,
  info,
  paths,
  securityDefinitions,
  tags
}

module.exports = specification
