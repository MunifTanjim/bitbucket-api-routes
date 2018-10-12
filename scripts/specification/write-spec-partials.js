const path = require('path')
const { writeFile } = require('fs-extra')

const { specDir } = require('../variables.js').paths

const writeSpecPartials = async specPartials => {
  try {
    console.log('Updating Spec Partials...')

    Object.entries(specPartials).forEach(async ([partialName, specPartial]) => {
      let filename = `${partialName}.json`

      await writeFile(
        path.join(specDir, filename),
        `${JSON.stringify(specPartial, null, 2)}\n`
      )

      console.log(`Updated Spec Partial: ${partialName}`)
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = writeSpecPartials
