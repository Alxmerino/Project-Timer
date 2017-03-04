'use strict';

let configFile  = __dirname + '/configs/client_config.json';
let gulp        = require('gulp');
let gulpTasks   = require('gulp-generic-build')(gulp, configFile);
let paths       = require(configFile);
let sourcemaps  = require("gulp-sourcemaps");
let connect     = require('gulp-connect');

// New ES6 project with Babel, Browserify & Gulp
// https://gist.github.com/danharper/3ca2273125f500429945
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let browserify = require('browserify');
let uglify = require('gulp-uglify');
let watchify = require('watchify');
let babel = require('babelify');

function compile(watch) {
    let bundler = watchify(browserify(paths.source.js + '/app.js', { debug: true }).transform(babel));

    function rebundle() {
        bundler.bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dest.js));
    }

    if (watch) {
        bundler.on('update', function() {
            var date = new Date()
            console.log('-> bundling... ' + date.toJSON());
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
};

/**
 * @task Local web server
 */
gulp.task('connect', function() {
    connect.server();
});

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

/**
 * Local dev env
 */
gulp.task('dev', ['connect', 'watch']);

gulp.task('default', ['build'], function() {
    // @TODO: Look up why build process is not exiting
    process.exit(0);
});
