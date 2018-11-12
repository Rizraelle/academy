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
    gulp.watch('./app/css/*.css', gulp.series('build'));

    gulp.watch("./app/html/*.html", gulp.series('gulpHtml'));
});

gulp.task('gulpHtml', function() {
    var plugins = [
      gulpHtml(),
    ];
    return gulp.src('app/html/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream:true }));
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
        .pipe(browserSync.reload({ stream:true }));
});

gulp.task('default', gulp.parallel('gulpHtml', 'build', 'browser-sync'));
