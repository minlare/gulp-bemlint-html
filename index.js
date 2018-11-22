const path = require('path');
const through = require('through2');
const bemlint = require('bemlint');
const PluginError = require('plugin-error');

let hasErrors = false;

const bemlintHtml = () => {

  const lintFile = (file, _, cb) => {

    if (file.isNull()) {
      cb(null, file);

    } else if (file.isStream()) {
      this.emit('error', new PluginError('gulp-bemlint-html', 'Streams not supported!'));
      cb(null, file);

    } else if (file.isBuffer()) {
      const bemlintResult = bemlint.verify(String(file.contents));

      if (bemlintResult.length) {
        if (!hasErrors) {
          console.log('\n');
          hasErrors = true;
        }

        console.log(path.resolve(__dirname, file.relative));
        bemlintResult.forEach(error => {
          console.log(`    ${error.line}:${error.column}  warning  ${error.message}  ${error.ruleId}`);
        });
        console.log('\n');
      }

      cb(null, file);
    }
  }

  return through.obj(lintFile);
}

module.exports = bemlintHtml;