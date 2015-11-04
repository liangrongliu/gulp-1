'use strict';

var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var through = require('through2');
var _ = require('underscore');

var args = require('../util/arg-parse');
var config = require('../../package.json');




// Clean css,js min files
gulp.task('clean', function () {
    
    if(!args.md5) {
        return;
    }
    
    var unlinkArr = [];
    
    //查找js,css md5
    if(fs.existsSync(path.join(config.path.min,'asset-manifest.json'))) {
        var assetMap = require(path.resolve(path.join(config.path.min,'rev-manifest.json')));
        _.each(assetMap,function(value) {
            unlinkArr.push(value);
        });
    }

    //查找images md5
    if(fs.existsSync(path.join(config.path.imageMin,'image-manifest.json'))) {
        var imageMap = require(path.resolve(path.join(config.path.imageMin,'rev-manifest.json')));
        _.each(imageMap,function(value) {
            unlinkArr.push(path.join('images',value));
        });
    }

    //执行删除
    if(unlinkArr.length) {
        for(var i=0; i< unlinkArr.length;i++) {
            if(fs.existsSync(path.join(config.path.min,unlinkArr[i]))) {
                fs.unlinkSync(path.join(config.path.min,unlinkArr[i]));
            }
        }
    }
    
    return gulp;
    
});