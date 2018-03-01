var gulp = require('gulp'),
    uglify_js = require('gulp-uglify'),
    uglify_css = require('gulp-uglifycss'),
    compile_sass = require('gulp-sass'),
    include = require('gulp-file-include'),
    extension = require('gulp-ext');

/**********************************************
 * Generic tasks :
 **********************************************/

 gulp.task('watch', [
     'watch:js',
     'watch:css'
 ]);

gulp.task('compile', [
    'compile:js',
    'compile:css'
]);

gulp.task('dist', [
    'dist:js',
    'dist:css'
]);

gulp.task('minify', [
    'minify:js',
    'minify:css'
]);

/**********************************************
 * Subtasks :
 **********************************************/

gulp.task('watch:js', function() {
    gulp.watch([
        '_src/**/*.inc.js'
    ], ['compile:js'])
});

gulp.task('watch:css', function() {
    gulp.watch([
        '_src/**/*.scss'
    ], ['compile:css'])
});

gulp.task('compile:js', function() {
    return gulp.src('_src/semark.inc.js')
        .pipe(include()).on('error', function(error) {
            logError(error);
        })
        .pipe(extension.crop('inc.js'))
        .pipe(extension.append('js'))
        .pipe(gulp.dest('_src'));
});

gulp.task('compile:css', function() {
    return gulp.src('_src/semark.scss')
        .pipe(compile_sass()).on('error', function(error) {
            logError({
                filename: error.file,
                lineNumber: error.line,
                message: error.message
            });
        })
        .pipe(gulp.dest('_src'));
});

gulp.task('minify:js', function() {
    return gulp.src('_src/semark.js')
    .pipe(uglify_js())
    .pipe(extension.crop('js'))
    .pipe(extension.append('min.js'))
    .pipe(gulp.dest('_src'));
});

gulp.task('minify:css', function() {
    return gulp.src('_src/semark.css')
    .pipe(uglify_js())
    .pipe(extension.crop('css'))
    .pipe(extension.append('min.css'))
    .pipe(gulp.dest('_src'));
});

gulp.task('dist:js', function() {
    return gulp.src([
        '_src/*.js',
        '!_src/*.inc.js'
    ])
    .pipe(gulp.dest('_dist'));
});

gulp.task('dist:css', function() {
    return gulp.src('_src/*.css')
    .pipe(gulp.dest('_dist'));
});

/**********************************************
 * Utility functions :
 **********************************************/

/**
 * Logs errors in the console .
 * @param  {object} error A simple object with the following properties :
 * filename: [String] The pathname of the file that causesd the error.
 * lineNumber: [Integer] The line number of the code that chaused the error.
 * message: [String] The description of the error.
 */
function logError(error) {
    var line = new Array(80).join('X'),
        red_background = "\x1b[41m",
        normal_background = "\x1b[0m";

    console.error(red_background);
    console.error(line);
    if (error.filename) {
        console.error('Error in: [ ' + error.filename + ' ]');
    } else {
        console.error('Error');
    }

    console.error(line + '\n');
    if (error.lineNumber) {
        console.error('Line: ' + error.lineNumber);
    }

    if (error.message) {
        console.error('Message:\n[ ' + error.message + ' ]\n');
    } else {
        console.error('No information provided .');
    }

    console.error(line);
    console.error(normal_background);
}
