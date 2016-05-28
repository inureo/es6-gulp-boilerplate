'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

gulp.task('imageOptimize', () =>
    gulp.src([
      'source/assets/images/**/*',
      '!source/assets/images/sprite/*'
    ])
      .pipe($.cache($.imagemin({
        progressive: true,
        interlaced: true
      })))
      .pipe(gulp.dest('dist/assets/images/'))
      .pipe($.size({title: 'images'}))
);