'use strict';

let configFile  = __dirname + '/configs/client_config.json';
let gulp        = require('gulp');
let gulpTasks   = require('gulp-generic-build')(gulp, configFile);
let paths       = require(configFile);
let connect     = require('gulp-connect');

/**
 * Local dev env
 */
gulp.task('dev', () => {
    connect.server({
        root: 'build',
        livereload: true
    });
    gulp.watch(paths.source.scss + '/**/*.scss', ['scss']);
});
