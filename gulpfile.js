var gulp = require('gulp'),
    concat = require('gulp-concat'),
    scss = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
    webserver = require('gulp-webserver');

gulp.task('js',function(){
  gulp.src([
      'builds/dev/app/**/*.js',
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('builds/dev'));
});

gulp.task('css', function(){
  gulp.src('builds/dev/app/**/*.scss')
    .pipe(scss())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('builds/dev'));
});

gulp.task('watch', function(){
  gulp.watch('builds/dev/app/**/*.js', ['js']);
  gulp.watch('builds/dev/app/**/*.scss', ['css']);
});

gulp.task('html', function(){
  gulp.src(['builds/dev/app/**/*.jade', '!builds/dev/app/**/_*.jade'])
    .pipe(jade({
      pretty: true,
    }))
    .pipe(gulp.dest('builds/dev'));
});

gulp.task('webserver', function(){
  gulp.src('builds/dev')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8031,
    }));
});

gulp.task('default', [
    'js',
    'css',
    'watch',
    'html',
    'webserver'
  ]);
