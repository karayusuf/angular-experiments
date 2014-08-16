var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('default', function() {
  return gulp.src('lib/*.js')
    .pipe(watch())
    .pipe(gulp.dest('public'));
});
