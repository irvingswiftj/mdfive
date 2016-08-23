var gulp          = require('gulp'),
    sourcemaps    = require('gulp-sourcemaps'),
    babel         = require('gulp-babel'),
    del           = require('del'),
    plumber       = require('gulp-plumber');

var paths = {
    scripts: ['src/**/*.js']
};

gulp.task('clean', () => {
    return del(['build']);
});

gulp.task('build', () => {
    gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['babel-preset-es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build'));
});

gulp.task('test', () => {

});

gulp.task('watch', () => {
    gulp.watch(paths.scripts, ['build']);
});

gulp.task('prepublish', ['clean', 'build', 'test']);