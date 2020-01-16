var gulp = require('gulp'),
    terser = require('gulp-terser'),
    replace = require('gulp-replace'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    rename = require('gulp-rename'),
    fs = require('fs');

function scripts() {
    return gulp
        .src('src/b.js')
        .pipe(replace('{{css}}', function(s) {
            var style = fs.readFileSync('b.min.css', 'utf8');
            return '<style>' + style + '</style>';
        }))
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./'));
}

function styles() {
    return gulp.src('src/b.css')
        .pipe(postcss([
            // autoprefixer(),
            cssnano()
        ]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./'));
}

function watchFiles() {
    gulp.watch(['./src/*'],
    gulp.series(styles, scripts));
}

gulp.task('default', gulp.series(styles, scripts));
gulp.task('watch', watchFiles);

exports.styles = styles
exports.scripts = scripts
