var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var es6ify = require('es6ify');
var babelify = require('babelify');
var reactify = require('reactify');
var livereload = require('gulp-livereload');


function onChange(event) {
	gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	livereload();
}

function onError(err) {
	gutil.log(err);
}

gulp.task('browserify', function() {
	browserifyShare();
});

gulp.task('watch', [], function(){
	gulp.watch('./src/js/**/*.js*', ['browserify']).on('change', onChange);
	livereload.listen();

});


function bundleShare(bundler) {
	gutil.log('Compiling...');
	return bundler.bundle()
			.on('error', function(err) {
				gutil.log(err);
			})
			.on('finish', function() {
				gutil.log('finished');
			})
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('./dist/js'))
			.pipe(livereload());
}

function browserifyShare() {
	var bundler = browserify({
		debug: true,
		paths: ['./node_modules', './src/js/']
	});
	// bundler.transform(reactify, {harmony: true});
	bundler.transform(babelify);
	bundler.add('./src/js/main.jsx');
	bundleShare(bundler);
}

