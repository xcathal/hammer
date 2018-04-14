const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');

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
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(),
            csso()
        ]))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
})

gulp.task('watch', function () {

    browserSync.init({
        server: "."
    });

    gulp.watch('./styles/**/*.scss', ['sass']);
    gulp.watch('./templates/**/*.pug', ['pug']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('build', ['sass', 'pug'])
