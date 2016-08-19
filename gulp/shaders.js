'use strict';

var tap = require("gulp-tap");
var obj2file = require('./utils/obj2file.js');
var path = require('path');

gulp.task("jsonize-shaders", function(){
    var shaders = {};
    return gulp.src('app/assets/shaders/*.glsl')
        .pipe(tap(function(file){
            shaders[path.basename(file.path)] = file.contents.toString('utf8');
        })).on('end', function(){
            return obj2file('shaders.json', shaders);
        });
});