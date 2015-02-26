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
	// livereload();
}

function onError(err) {
	gutil.log(err);
}

gulp.task('build', ['vendor', 'lib'], function(){

});

gulp.task('vendor', function () {
	var bundler = browserify({
		debug: true
	});

	bundler.require('react');

	bundle(bundler, 'vendor.js');
});

gulp.task('lib', function() {
	var bundler = newBundle();
	bundler.external('react');
	bundler.add('./src/js/main.jsx');
	return bundle(bundler, 'lib.js');
});



gulp.task('watch', [], function(){
	livereload.listen();
	return gulp.watch('./src/js/**/*.js*', ['lib']).on('change', onChange);

});


function bundle(bundler, name) {
	gutil.log('Compiling...');
	return bundler.bundle()
			.on('error', function(err) {
				gutil.log(err);
			})
			.on('finish', function() {
				gutil.log('finished');
			})
			.pipe(source(name))
			.pipe(gulp.dest('./dist/js'))
			.pipe(livereload());
}

function newBundle() {
	var bundler = browserify({
		debug: true,
		paths: ['./node_modules', './src/js/']
	});
	bundler.transform(babelify);
	// bundler.transform(reactify, {harmony: true});
	// bundler.transform(es6ify.configure(/.+\.(js|jsx)/));
	bundler.add(es6ify.runtime);

	return bundler;
}

