var gulp = require('gulp');
var server = require('gulp-server-livereload');
var jade = require('gulp-jade');
var watch = require('gulp-watch');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var merge = require("merge-stream");
var clean = require('gulp-clean');
var bundleconfig = require("./bundleconfig.json");
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');

gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('watch', ['clean'], function () {
    gulp.watch(['dev/**/*.jade'], ['build']);
    gulp.watch(['dev/**/*.js'], ['build']);
    gulp.watch(['dev/**/*.scss'], ['build']);
});

gulp.task('jade', ['clean'], function() {
  return gulp.src('dev/src/**/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('build'));
});

gulp.task("js", ['clean'], function () {
    var tasks = getBundles(".js").map(function (bundle) {
        return gulp.src(bundle.inputFiles, { base: "." })
            .pipe(concat(bundle.outputFileName))
            //.pipe(uglify())
            .pipe(gulp.dest("."));
    });
    return merge(tasks);
});

gulp.task('sass', ['clean'], function () {
  return gulp.src('./dev/src/sass/main.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('./build/'));
});

var filesToMove = [
        './dev/assets/**/*.*'
];
gulp.task('move', ['clean'], function() {
  return gulp.src(filesToMove, { base: './dev' })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
    return gulp.src('build/', {read: false})
        .pipe(clean());
});

gulp.task('build', ['clean', 'jade', 'js', 'sass', 'move', 'watch']);

function getBundles(extension) {
    return bundleconfig.filter(function (bundle) {
        return new RegExp(`${extension}$`).test(bundle.outputFileName);
    });
}
