'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

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