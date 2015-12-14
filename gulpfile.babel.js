'use strict';

import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import webpack from 'webpack';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpackConfig from './webpack.config.js';
import pck from './package.json';

const reload = browserSync.reload;
const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

gulp.task('jade', () => {
  return gulp.src([
    './source/jade/*.jade',
    './source/jade/**/*.jade',
    '!./source/jade/**/_*.jade'
  ])
    .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
    .pipe($.jade({pretty: true}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 9',
    'last 3 version',
    'ios >= 7',
    'android >= 4.2'
  ];
  return gulp.src([
    './source/assets/stylesheets/*.{sass, scss}'
  ])
    .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('dist/assets/stylesheets/'));
});

gulp.task('webpack', () => {
  gulp.src('source/assets/javascripts/**/*.js')
    .pipe($.webpack(webpackConfig))
    .pipe(gulp.dest('dist/assets/javascripts/'));
});

gulp.task('lint', () =>
    gulp.src('source/assets/javascripts/**/*.js')
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failOnError()))
);

gulp.task('createSprite', () => {
  const spriteData = gulp.src('source/assets/images/sprite/*.png')
    .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
    .pipe($.spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.sass',
      cssFormat: 'sass',
      imgPath: '../images/sprite.png',
      retinaSrcFilter: 'source/assets/images/sprite/*-2x.png',
      retinaImgName: 'sprite-2x.png',
      retinaImgPath: '../../images/sprite-2x.png'
    }));

  spriteData.img.pipe(gulp.dest('./source/assets/images/'));
  spriteData.css.pipe(gulp.dest('./source/assets/stylesheets/foundations/'));

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

gulp.task('serve', ['webpack', 'sass'], () => {
  browserSync({
    notify: true,
    logPrefix: pck.name,
    server: 'dist',
    port: 8000,
    reloadDelay: 800
  });

  gulp.watch(['source/jade/**/*.jade', 'source/jade/*.jade'], ['jade', reload]);
  gulp.watch([
    'source/assets/stylesheets/*.{sass, scss}',
    'source/assets/stylesheets/**/*.{sass, scss}'
  ], ['sass', reload]);
  gulp.watch(['source/assets/javascripts/*.js'], ['lint', 'webpack']);
  gulp.watch(['source/assets/images/*'], ['imageOptimize', reload]);
  gulp.watch(['source/assets/images/sprite/*'], ['createSprite']);
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

gulp.task('clearCache', (done) => {
  $.cache.clearAll(done);
});

gulp.task('clean', () => del(['dist/*', '!dist/.git'], {dot: true}));

gulp.task('build', () => {
  runSequence(
    'clearCache',
    'clean',
    'createSprite',
    ['jade', 'sass', 'webpack', 'imageOptimize', 'copy']
  );
});

gulp.task('default', ['serve']);
