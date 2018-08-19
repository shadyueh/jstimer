var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    useref = require('gulp-useref'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();

var sassSources = ['src/styles/**/*.scss'],
    jsSources = ['src/js/**/*.js'],
    htmlSources = ['src/**/*.html'],
    imgSources = ['src/images'],
    sndSources = ['src/sound/*'],
    appStylesDir = 'src/styles',
    outputDir = 'dist';


gulp.task('sass', function () {
    return gulp.src(sassSources)
        .pipe(sass({style: 'expanded'}))
        .on('error', sass.logError)
        .pipe(gulp.dest(appStylesDir))
});


gulp.task('useref', function () {
    return gulp.src(htmlSources)
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest(outputDir))
});


gulp.task('images', function () {
    return gulp.src(imgSources + '/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest(outputDir + '/images'))
});


gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest(outputDir + '/fonts'))
});


gulp.task('sounds', function () {
    return gulp.src(sndSources)
        .pipe(gulp.dest(outputDir + '/sound'))
});


gulp.task('clean:dist', function () {
    return del.sync(outputDir)
});


gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: outputDir,
        },
        port: 8080,
    })
});


gulp.task('watch', function (){
    gulp.watch(sassSources, ['sass','useref',browserSync.reload]);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch(htmlSources, ['useref', browserSync.reload]);
    gulp.watch(jsSources, browserSync.reload);
});


gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['sass', 'useref', 'images', 'sounds'],
        callback
    )
});

gulp.task('default', function (callback) {
    runSequence('build', 'browserSync', 'watch',
        callback
    )
});
