# gulp-bemlint-html
gulp plugin to bemlint html files using https://github.com/DesTincT/bemlint

```javascript
gulp.task('html', () => {
  const bemlintHtml = require('gulp-bemlint-html');
  return gulp.src('**/*.html')
    .pipe(bemlintHtml())
});
```
