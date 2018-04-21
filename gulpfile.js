var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect');

var jsSources = ['src/js/*.js'],
    sassSources = ['src/styles/*.scss'],
    htmlSources = ['src/**/*.html'],
    outputDir = 'dist';

gulp.task('log', function () {
    gutil.log('== App Log ==')
});

gulp.task('sass', function () {
    gulp.src(sassSources)
        .pipe(sass({style: 'expanded'}))
        .on('error', gutil.log)
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

gulp.task('html', function () {
    gulp.src(htmlSources)
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

gulp.task('watch', function () {
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['sass']);
    gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function () {
    connect.server({
        root: '.',
        livereload: true
    })
});

gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);