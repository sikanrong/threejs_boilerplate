var path = require('path');
var fs = require('fs');
var q = require('q');
var mkdirp = require('mkdirp');

module.exports = function(p, obj){
    var dn = path.dirname(p);
    var dest = './' + ((dn == '.')? 'app/temp' : dn);
    var deferred = q.defer();

    var write_stream = function(){
        var out = path.basename(p);

        var stream = fs.createWriteStream(dest + '/' + out);

        stream.on('finish', function(){
            deferred.resolve(stream);
        });

        stream.once('open', function(fd) {
            stream.write(JSON.stringify(obj));
            stream.end();
        });

    }

    fs.exists(dest, function(exists){
        if(!exists)
            mkdirp(dest, write_stream);
        else
            write_stream();
    });

    return deferred.promise;

};