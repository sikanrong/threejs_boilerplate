var gulp = GLOBAL.gulp = require('gulp');
var del = require('del');

//require browserify tasks.
require("./gulp/shaders");
require("./gulp/browserify");
require("./gulp/server");

gulp.task('clean', function(){
    console.log("Cleaning temp and dist directories...");

    del([
        "app/dist/*",
        "app/temp/*"
    ]);
});

gulp.task('default', ["server"]);