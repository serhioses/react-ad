const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename'),
  sass = require('gulp-ruby-sass'),
  watch = require('gulp-watch');

const path = require('path');

const devDir = path.resolve(__dirname, 'app/dev'),
  distDir = path.resolve(__dirname, 'app/dist'),
  paths = {
      sass: path.resolve(devDir, 'sass'),
      cssDev: path.resolve(devDir, 'css'),
      cssDist: path.resolve(distDir, 'css'),
      imgDev: path.resolve(devDir, 'images'),
      imgDist: path.resolve(distDir, 'sass')
  },
  browsers = ['> 3%'],
  isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('styles', function () {
  return sass(paths.sass + '/style.scss', {
    style: 'expanded',
    loadPath: [paths.sass]
  })
    .pipe(autoprefixer({
      browsers
    }))
    .pipe(gulp.dest(paths.cssDist));
});

gulp.task('watch', function () {
  gulp.watch(paths.sass + '/**/*.scss', gulp.series('styles'));
});

gulp.task('default', gulp.parallel('watch', gulp.series('styles')));
