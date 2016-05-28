'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

gulp.task('webpack', () => {
  gulp.src('source/assets/javascripts/**/*.js')
    .pipe($.webpack(webpackConfig))
    .pipe(gulp.dest('dist/assets/javascripts/'));
});
