var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var stylelint = require('stylelint');
var gulpStylelint = require('gulp-stylelint');
var gulpHtml = require('gulp-html');
var simpleExtend = require('postcss-extend');

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
});

gulp.task('gulpHtml', function() {
    var plugins = [
      gulpHtml(),
    ];
    return gulp.src('app/html/*.html')
    .pipe(gulp.dest('dist/'));
});


gulp.task('build',  function () {
    var plugins = [
      autoprefixer(),
    ];
    return gulp.src('app/css/*.css')
        .pipe(gulpStylelint({
            failAfterError: false,
            reporters: [
            {formatter: 'string', console: true}
            ]
        }))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('watch', function() {

    gulp.watch('./app/css/*.css', ['build', browserSync.reload]);

    gulp.watch("./app/html/*.html", ['gulpHtml', browserSync.reload]);

});


gulp.task('default', ['gulpHtml', 'build', 'browser-sync', 'watch']);