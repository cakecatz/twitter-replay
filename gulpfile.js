require('babel/polyfill');
const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const sass = require('gulp-sass');

const b = browserify(Object.assign({}, watchify.args, {
  entries: ['./src/app.jsx'],
  transform: ['babelify', 'reactify'],
  debug: true,
}));
const w = watchify(b);

function bundle() {
  return w.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./'));
}

w.on('update', bundle);
w.on('log', gutil.log);

gulp.task('sass', () => {
  gulp.src('./style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./style/**/*.scss', ['sass']);
});

gulp.task('js', bundle);

gulp.task('default', ['js', 'sass:watch']);


