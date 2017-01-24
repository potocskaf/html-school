var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass');

gulp.task('html', function () {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('asset', function () {
    gulp.src('src/asset/**/*.*')
        .pipe(gulp.dest('dist/asset'))
        .pipe(livereload());
});

gulp.task('sass', function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

gulp.task('js-dependencies', function () {
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

gulp.task('default', ['js-dependencies', 'js-project', 'html', 'asset', 'sass'], function () {
    livereload.listen();
    gulp.watch('**/*.html', {cwd: './src'}, ['html']);
    gulp.watch('sass/**/*.scss', {cwd: './src'}, ['sass']);
    gulp.watch('js/**/*.js', {cwd: './src'}, ['js-project']);
});