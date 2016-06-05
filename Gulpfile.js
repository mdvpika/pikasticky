var gulp = require('gulp');
var karma = require('karma');

gulp.task('test:unit', function(done){
    gKarma(done);
});

function gKarma(done){
    var configFile = __dirname + '/karma.conf.js';
    (new karma.Server({configFile: configFile}, done)).start();
}

function rescue(stream){
    stream = stream.on('error', function(e){
        console.log(e);
        stream.end();
    });
    return stream;
}