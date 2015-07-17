var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	jsdoc = require('gulp-jsdoc'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	PATHS = {
		JS:{
			SRC:'./src/*.js',
			DIST:'./dist',
			TEST:'./test'
		}
	}; 


gulp.task('compile', function() {
    gulp.src(PATHS.JS.SRC)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(concat('eventmanager.js'))
      .pipe(jsdoc('./doc'))
      .pipe(gulp.dest('./dist'))
      .pipe(concat('eventmanager.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist')); 
});


gulp.task('watch',['compile'],function(){
	gulp.watch(PATHS.JS.SRC, ['compile']);
});

gulp.task('default',['watch'],function(){

});