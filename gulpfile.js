var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');

gulp.task('default', function() {
  return gulp.src('lib/**/*.js')
    .pipe(concat('application.js'))
    .pipe(gulp.dest('public'));
});
