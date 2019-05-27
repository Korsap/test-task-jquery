var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var del = require('del');

var sourceDir = './src';
var destinationDir = './build';

gulp.task('bundle-styles', function () {
  var base = [
    sourceDir + '/css/*.css',
    sourceDir + '/css/style.scss',
  ];
  gulp.src(base)
    .pipe(sass({outputStyle: 'expanded', linefeed: 'crlf'}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(destinationDir + '/css'));
});
gulp.task('bundle-scripts', function () {
    var base = [
      sourceDir + '/js/*.js',
    ];
    gulp.src(base)
        .pipe(gulp.dest(destinationDir + '/js'));
});
gulp.task('copy-images', function () {
    var base = [
      sourceDir + '/images/*.png',
    ];
    gulp.src(base)
        .pipe(gulp.dest(destinationDir + '/images'));
});
gulp.task('copy-fonts', function () {
    var base = [
      sourceDir + '/css/fonts/*',
    ];
    gulp.src(base)
        .pipe(gulp.dest(destinationDir + '/css/fonts'));
});
gulp.task('build-page', function () {
  gulp.src(sourceDir + '/index.pug')
      .pipe(pug({
        // Your options in here.
      }))
      .pipe(gulp.dest(destinationDir));
});
gulp.task('clean', function () {
    return del(destinationDir)
});

gulp.task('default', ['bundle-styles', 'build-page', 'bundle-scripts', 'copy-images', 'copy-fonts']);

gulp.task('watch', ['bundle-styles', 'build-page', 'bundle-scripts', 'copy-images', 'copy-fonts'], function () {
	var jsSource = sourceDir + '/js/*.js';
	var cssSource = sourceDir + '/css/style.scss'
    gulp.watch(jsSource, ['bundle-scripts']);
	gulp.watch(cssSource, ['bundle-styles'])
	gulp.watch(sourceDir + '/index.pug', ['build-page'])
});