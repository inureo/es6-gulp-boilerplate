'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

gulp.task('copy', () =>
    gulp.src([
      'source/assets/fonts/*'
    ], {
      base: 'source/',
      dot: true
    }).pipe(gulp.dest('dist'))
      .pipe($.size({title: 'copy'}))
);