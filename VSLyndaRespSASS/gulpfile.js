/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

//var gulp = require('gulp');
//gutil = require('gulp-util'),
//compass = require('gulp-compass');
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var importer = require('node-sass-globbing');
//var rimraf = require("rimraf");
var concat = require("gulp-concat");
//var cssmin = require("gulp-cssmin");
var uglify = require("gulp-uglify");
var gutil = require('gulp-util');
var gulpif = require('gulp-if');

var paths = {};

paths.js = "Scripts/**/*.js";
paths.minJs = "Scripts/**/*.min.js";
paths.css = "Content/**/*.css";
paths.minCss = "Content/**/*.min.css";
paths.concatJsDest = "Scripts/scripts.js";
paths.concatJsDestMin = "Scripts/scripts.min.js";
paths.concatCssDest = "Content/style.min.css";
paths.sassSources = "Components/sass/style.scss";
paths.sassOutput = "Content/";
paths.sassWatch = "Components/sass/**/*.scss";
path.jsSources = [
  //'Scripts/jqloader.js',
  'Scripts/jquery.js',
  'Scripts/TweenMax.min.js',
  'Scripts/jquery.scrollmagic.min.js',
  'Scripts/script1.js'
];
paths.jsOutput = "Scripts/";

var env,
    //jsSources,
    //sassSources,
    //htmlSources,
    //outputDir,
    sassStyle;

env = 'development';

if (env === 'development') {
    //outputDir = 'Content/';
    sassStyle = 'expanded';
} else {
    //outputDir = 'builds/production/';
    sassStyle = 'compressed';
}


var sass_config = {
    importer: importer,
    includePaths: [
      'node_modules/breakpoint-sass/stylesheets/',
      'node_modules/compass-mixins/lib/',
      'node_modules/susy/sass'
    ]
};

gulp.task('js', function () {
    gulp.src(path.jsSources)
      .pipe(concat(paths.concatJsDest))
      //.pipe(browserify())
      .on('error', gutil.log)
      .pipe(gulpif(env === 'production', uglify()))
      .pipe(gulp.dest(paths.jsOutput))
      //.pipe(connect.reload())
});

// Compile sass.
gulp.task('sass', function () {
    gulp.src(paths.sassSources)
      .pipe(sass(sass_config).on('error', sass.logError))
      .pipe(gulp.dest(paths.sassOutput));
});

gulp.task('watch', function () {
    gulp.watch(path.jsSources, ['js']);
    gulp.watch(paths.sassWatch, ['sass']);
});