var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('html', function () {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('css', function () {
    gulp.src('src/css/**/*.css')
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('jslib', function () {
    var libs = [
        'node_modules/d3/build/d3.min.js'
    ];
    gulp.src(libs).pipe(gulp.dest('dist/js/'));
});

gulp.task('js-project', function () {
    gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js/'))
        .pipe(livereload());
});

gulp.task('default', ['jslib', 'js-project', 'html', 'css'], function () {
    livereload.listen();
    gulp.watch('**/*.html', {cwd: './src'}, ['html']);
    gulp.watch('css/**/*.css', {cwd: './src'}, ['css']);
    gulp.watch('js/**/*.js', {cwd: './src'}, ['js-project']);
});