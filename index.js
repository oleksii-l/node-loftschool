const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");

const directory = process.argv[2];
const targetDir = "parsedFolder";

if (!directory) {
  console.log("Specify source directory, please");
  process.exit(1);
}

const sourceDir = path.join(__dirname, directory);
const targetPath = path.join(__dirname, targetDir);

if (!fsSync.existsSync(targetPath)) {
  fsSync.mkdirSync(targetPath);
}

parseDir(sourceDir);

async function parseDir (directory) {
  const files = await fs.readdir(directory);

  files.forEach(async item => {
    const itemPath = path.join(directory, item);
    const stats = await fs.lstat(itemPath);

    if (stats.isDirectory()) {
      parseDir(itemPath);
    } else {
      processFile(directory, targetPath, item);
    }
  });
}

async function processFile (sourceDir, targetDir, file) {
  const firstChar = file[0];
  const targetSubDir = path.join(targetDir, firstChar);

  if (!fsSync.existsSync(targetSubDir)) {
    fsSync.mkdirSync(targetSubDir);
  }
  fs.copyFile(
    path.join(sourceDir, file),
    path.join(targetSubDir, file),
    err => {
      if (err) {
        return console.log(err);
      }
    }
  );
}
