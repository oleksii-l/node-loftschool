const fs = require('fs')
const path = require('path')

const directory = process.argv[2]
const targetDir = 'parsedFolder'

if (!directory) {
  console.log('Specify source directory, please')
  process.exit(1)
}

const sourceDir = path.join(__dirname, directory)
const targetPath = path.join(__dirname, targetDir)

if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath)
}

parseDir(sourceDir)

function parseDir (directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log(err)
      return
    }

    files.forEach(item => {
      const itemPath = path.join(directory, item)
      fs.lstat(itemPath, (err, stats) => {
        if (err) {
          return console.log(err)
        }
        if (stats.isDirectory()) {
          parseDir(itemPath)
        } else {
          processFile(directory, targetPath, item)
        }
      })
    })
  })
}

function processFile (sourceDir, targetDir, file) {
  const firstChar = file[0]
  const targetSubDir = path.join(targetDir, firstChar)

  if (!fs.existsSync(targetSubDir)) {
    fs.mkdirSync(targetSubDir)
  }
  fs.copyFile(path.join(sourceDir, file), path.join(targetSubDir, file), err => {
    if (err) {
      return console.log(err)
    }
  })
}
