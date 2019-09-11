const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  // NOTE: Have changed angular.json file, 'outputPath' to 'dist' rather than 'dist/<application-name>'. If you are using default angular.json then for file paths below, add <application-name> in file path. Example - './dist/my-medium/runtime.js', do the same for all.
  const files = [
    './dist/webchat-angular/runtime-es5.js',
    //'./dist/webchat-angular/runtime-es2015.js',
    './dist/webchat-angular/polyfills-es5.js',
    //'./dist/webchat-angular/polyfills-es2015.js',
    //'./dist/webchat-angular/scripts-es5.js',
    './dist/webchat-angular/main-es5.js',
    './dist/webchat-angular/styles-es5.js',
    //'./dist/webchat-angular/main-es2015.js'
    // './dist/webchat-angular/3-es5.js'
  ];
  await fs.ensureDir('elements');
  await concat(files, 'dist/webchat-angular/aks-my-medium.js');
})();
