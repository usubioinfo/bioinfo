const fs = require('fs');
const path = require('path');

let importString = '';

function printFile(file) {
  if (file.split('.').pop() === 'scss') {
    console.log(file.split('/'));
    addToImportString(file);
  }
}

function addToImportString(file) {
  let writeString = '@import \'../../';
  const lastViewsIndex = file.split('/').lastIndexOf('views');
  const newPath = file.split('/').slice(lastViewsIndex).join('/');

  writeString += newPath + '\';';
  importString += `${writeString}\n`
}

function traverseDir(dir) {
   fs.readdirSync(dir).forEach(file => {
     let fullPath = path.join(dir, file);
     if (fs.lstatSync(fullPath).isDirectory()) {
        printFile(fullPath);
        traverseDir(fullPath);
      } else {
        printFile(fullPath);
      }
   });
 }

console.log(__dirname);

traverseDir(__dirname + '/views');
console.log(importString);

fs.writeFile(`${__dirname}/scss/pages/_importer.scss`, importString, (err) => {
  if (err) return console.log(err);
  console.log('importer.scss written!');
});
