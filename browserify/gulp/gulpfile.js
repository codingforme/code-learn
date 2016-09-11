var gulp = require("gulp");
var browserify = require("browserify");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
 
gulp.task("browserify", function () {
 var b = browserify({
  entries: "./entry.js",
  debug: true
 });
 
 return b.bundle()
  .pipe(source("bundle.js"))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest("./dist"));
});