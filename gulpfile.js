var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');

gulp.task('default', function() {
  return gulp.src('lib/**/*.js').pipe(watch(compile));
});

function compile(files) {
  return files.pipe(concat('index.js')).pipe(gulp.dest('.'));
}


