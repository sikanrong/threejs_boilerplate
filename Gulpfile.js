var gulp = require('gulp');
var del = require('del');

//require browserify tasks.
require("./gulp/browserify");
require("./gulp/server");

gulp.task('clean', function(){
    console.log("Cleaning temp and dist directories...");

    del([
        "app/dist/*",
    ]);
});

gulp.task('default', ["server"]);