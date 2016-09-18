'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

gulp.task('jade', () => {
  const options = {
    basedir: 'source/jade/'
  };
  return gulp.src([
    './source/jade/*.jade',
    './source/jade/**/*.jade',
    '!./source/jade/**/_*.jade'
  ])
    .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
    .pipe($.jade(options))
    .pipe(gulp.dest('./dist/'));
});
