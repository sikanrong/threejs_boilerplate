var gulp = require('gulp');
var path = require('path');
var extend = require("node.extend");
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var foreach = require("gulp-foreach");
var browserify = require('browserify');
var sassify = require('sassify');
var tsify = require('tsify');
var gutil = require("gulp-util");
var request = require('request');
var q = require('q');
var resolve = require('resolve-file');

//Detect production/development environment from system environment vars.
//Defaults to 'development'.
var environment = process.env.NODE_ENV || "development"; 

var away3d_entry = './app/scripts/away3d/main.ts';

var npm_deps = {
    "awayjs-full": "./node_modules/awayjs-full/dist/index.js"
}

var bower_deps = [
    "angular",
    "gl-matrix",
    "angular-ui-router",
    "ocLazyLoad",
    "lodash",
    "webgl-utils",
    "md5"
];

var make_bundle = function(opts){
    
    if(opts === undefined){
        opts = {};
    }
    
    if(opts.use_watchify === undefined){
        opts.use_watchify = (environment == "development");
    }
    
    if(opts.bsfy_opts === undefined){
        opts.bsfy_opts = {};
    }
    
    if(opts.bsfy_bower_opts === undefined){
        opts.bsfy_bower_opts = {};
    }
    
    var out_file = opts.out_file || path.basename(opts.bsfy_opts.entries);
        
    var bsfy_opts_common = {
        debug: (environment == "development"),
        paths: ["app/scripts"],
        cache: {},
        packageCache: {}
    };
    
    var bsfy_opts = extend(bsfy_opts_common, opts.bsfy_opts);

    var b = browserify(bsfy_opts);

    if(opts.require){
        for(key in opts.require){
            var npm_path = opts.require[key];
            b.require(resolve(npm_path), {expose: key});
        }
    }

    if(opts.external){
        for(key in opts.external){
            b.external(key);
        }
    }

    b.transform(sassify, {
        'auto-inject': true, // Inject css directly in the code
        base64Encode: false, // Use base64 to inject css
        sourceMap: (environment == 'development') // Add source map to the code
    });

    if(opts.use_watchify){
        b = watchify(b);
        b.on('update', rebundle);
    }
    
    b.plugin("browserify-bower", opts.bsfy_bower_opts);
    b.plugin(tsify, {
        target: 'es6',
        module: 'commonjs',
        noImplicitAny: true,
        typescript: require('typescript')
    });

    function rebundle () {
        console.log("Bundling "+out_file+"...");
        return b.bundle()
            .pipe(source(out_file))
            .pipe(gulp.dest('app/dist')); 
    }

    return rebundle();

};

gulp.task("bsfy-bundle-vendor", ['clean'], function(){
    return make_bundle({
        out_file: "vendor.js",
        use_watchify: false,
        require: npm_deps,
        bsfy_bower_opts: { require: bower_deps }
    });
});

gulp.task("bsfy-bundle-away3d", ["bsfy-bundle-vendor"], function(){
    return make_bundle({
        out_file: "away3d.js",
        external: npm_deps,
        require: {'away3d-runtime': away3d_entry}
    })
});

gulp.task("bsfy-bundle-app", ["bsfy-bundle-away3d"], function(){
    return make_bundle({
        external: extend({'away3d-runtime': away3d_entry}, npm_deps),
        bsfy_opts: {entries: "app/scripts/index.js"},
        bsfy_bower_opts: {external: bower_deps}
    })

});

gulp.task("bsfy", ["bsfy-bundle-app"]);