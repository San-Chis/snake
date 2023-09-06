const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

// для компіляції та мінімізації SCSS
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss').pipe(sass()).pipe(gulp.dest('dist/css'))
})

// для конкатенації та мінімізації JS
gulp.task('js', function () {
  return gulp
    .src('src/js/**/*.js')
    .pipe(concat('index.js')) 
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

// Завдання за замовчуванням
gulp.task('default', gulp.series('sass', 'js'))
