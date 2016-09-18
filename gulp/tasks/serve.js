'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import pck from '../../package.json';

const reload = browserSync.reload;
const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

gulp.task('serve', ['webpack', 'sass', 'jade'], () => {
  browserSync({
    notify: true,
    logPrefix: pck.name,
    server: 'dist',
    port: 8000,
    reloadDelay: 800
  });

  gulp.watch(['source/jade/**/*.jade', 'source/jade/*.jade'], ['jade', reload]);
  gulp.watch([
    'source/assets/stylesheets/*.s*ss',
    'source/assets/stylesheets/**/*.s*ss'
  ], ['sass', reload]);
  gulp.watch(['source/assets/javascripts/*.js'], ['lint', 'webpack']);
  gulp.watch(['source/assets/images/*'], ['imageOptimize', reload]);
  gulp.watch(['source/assets/images/sprite/*'], ['createSprite']);
});