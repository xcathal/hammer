const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('pug', () => {
    return gulp.src('./templates/**/[!_]*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true,
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('sass', () => {
    return gulp.src('./styles/**/[!_]*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'));
})

gulp.task('watch', function () {
    gulp.watch('./styles/**/*.scss', ['sass']);
    gulp.watch('./templates/**/*.pug', ['pug']);
});

gulp.task('build', ['sass', 'pug'])
