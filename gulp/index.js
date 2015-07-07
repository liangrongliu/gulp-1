'use strict';

var gulp = require('gulp');
var fs = require('fs');

var onlyScripts = require('./util/script-filter');
var args = require('./util/arg-parse');

var tasks = fs.readdirSync('gulp/task').filter(onlyScripts);


tasks.forEach(function(task) {
    require('./task/' + task);
});


if(args.env === 'dev') {
    //dev task
    gulp.task('default', ['image','sprite','css','browserify','watch']);
} else if(args.env === 'prod') {
    //build task
    gulp.task('default', ['image:prod','sprite:prod','css:prod','browserify:prod','rev']);
}