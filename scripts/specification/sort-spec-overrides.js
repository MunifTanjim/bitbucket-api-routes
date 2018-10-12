const path = require('path')
const { writeFile, readdir } = require('fs-extra')
const deepsort = require('deep-sort-object')

const { specOverridesDir } = require('../variables.js').paths

const sortSpecOverrides = async () => {
  try {
    console.log(`Sorting Spec Overrides...`)

    let overrideFilenames = await readdir(specOverridesDir)

    overrideFilenames.forEach(async overrideFilename => {
      let overrideFile = require(path.join(specOverridesDir, overrideFilename))

      await writeFile(
        path.join(specOverridesDir, overrideFilename),
        `${JSON.stringify(deepsort(overrideFile), null, 2)}\n`
      )

      console.log(`Spec Overrides Sorted: ${overrideFilename}`)
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = sortSpecOverrides
