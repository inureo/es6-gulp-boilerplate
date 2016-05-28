'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

const AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'last 3 version',
  'ios >= 7',
  'android >= 4.2'
];

gulp.task('sass', () => {
  return gulp.src([
    './source/assets/stylesheets/*.{sass, scss}'
  ])
    .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('dist/assets/stylesheets/'));
});
