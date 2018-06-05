const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const plumber = require('gulp-plumber');

const paths = {
  scripts: ['src/**/*.js'],
};

gulp.task('clean', () => gulp.src('build/**/*.js', { force: true }).pipe(clean()));

gulp.task('build', () => gulp.src(paths.scripts)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['babel-preset-env'],
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('build')));

gulp.task('test', () => {});

gulp.task('watch', () => gulp.watch(paths.scripts, ['build']));
gulp.task('prepublish', ['clean', 'build', 'test']);
