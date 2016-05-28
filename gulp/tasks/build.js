'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

gulp.task('build', () => {
  runSequence(
    ['clearCache', 'clean'],
    'imageOptimize',
    'createSprite',
    ['jade', 'sass', 'webpack', 'copy']
  );
});