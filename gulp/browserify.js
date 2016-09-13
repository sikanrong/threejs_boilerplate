var path = require('path');
var extend = require("node.extend");
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var sassify = require('sassify');
var request = require('request');
var resolve = require('resolve-file');

//Detect production/development environment from system environment vars.
//Defaults to 'development'.
var environment = process.env.NODE_ENV || "development";

var npm_deps = Object.keys(require('../package.json').dependencies);

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

    var out_file = opts.out_file || path.basename(opts.bsfy_opts.entries);

    var bsfy_opts_common = {
        debug: (environment == "development"),
        paths: ["app"],
        cache: {},
        packageCache: {}
    };

    var bsfy_opts = extend(bsfy_opts_common, opts.bsfy_opts);

    var b = browserify(bsfy_opts);

    if(opts.require){
        for(key in opts.require){
            var npm_name = opts.require[key];
            var npm_path = resolve(npm_name);
            b.require(npm_path, {expose: npm_name});
        }
    }

    if(opts.external){
        for(key in opts.external){
            var npm_name = opts.external[key];
            b.external(npm_name);
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

    function rebundle () {
        console.log("Bundling "+out_file+"...");
        return b.bundle()
            .pipe(source(out_file))
            .pipe(gulp.dest('app/dist'))
            .on('error', function(err){
                console.error(err);
            });
    }

    return rebundle();

};

gulp.task("bsfy-bundle-vendor", ['clean'], function(){
    return make_bundle({
        out_file: "vendor.js",
        use_watchify: false,
        require: npm_deps
    });
});

gulp.task("bsfy-bundle-app", ['bsfy-bundle-vendor', 'jsonize-shaders'], function(){
    return make_bundle({
        external: npm_deps,
        bsfy_opts: {entries: "app/scripts/main.js"}
    });
});

gulp.task("bsfy", ["bsfy-bundle-app"]);