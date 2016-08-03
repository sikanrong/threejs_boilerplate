var gulp = require('gulp');
var lrserver = require('tiny-lr');
var livereload = require('gulp-livereload');
var connect = require('connect');
var serveStatic = require('serve-static');

// Edit this values to best suit your app
var WEB_PORT = 9191;
var APP_DIR = 'app';

var lrs = lrserver();

// start livereload server
gulp.task('lr-server', function() {
    lrs.listen(35729, function(err) {
        if (err) return console.log(err);
    });
});

// start local http server for development
gulp.task('http-server', function() {
    connect()
        .use(require('connect-livereload')())
        .use(serveStatic(APP_DIR))
        .listen(WEB_PORT);

    console.log('Server listening on http://localhost:' + WEB_PORT);
});

// start local http server with watch and livereload set up
gulp.task('server', ['bsfy'], function() {
    gulp.run('lr-server');

    var watchFiles = ['app/**/*.html', 'app/scripts/**/*.js'];
    gulp.watch(watchFiles, function(e) {
        console.log('Files changed. Reloading...');
        gulp.src(watchFiles)
        .pipe(livereload(lrs));
    });

    gulp.run('http-server');
});
